import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { isAuthenticated } from "@/lib/auth";
import {
  DEFAULT_WORK_TYPE,
  isWorkType,
  WORK_TYPE_CONFIG,
} from "@/src/types/work";

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;

  if (searchParams.has("folder")) {
    return NextResponse.json(
      { error: "A pasta de upload não pode ser definida pelo cliente." },
      { status: 400 },
    );
  }

  const requestedType = searchParams.get("type");
  if (requestedType !== null && !isWorkType(requestedType)) {
    return NextResponse.json(
      { error: "Tipo inválido. Use realizado ou disponivel." },
      { status: 400 },
    );
  }

  const type = requestedType ?? DEFAULT_WORK_TYPE;
  const timestamp = Math.round(Date.now() / 1000);
  const folder = WORK_TYPE_CONFIG[type].folder;

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    type,
  });
}
