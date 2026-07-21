import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import {
  DEFAULT_WORK_TYPE,
  isPublicIdForWorkType,
  isWorkType,
  WORK_TYPE_CONFIG,
} from "@/src/types/work";

export async function GET(req: NextRequest) {
  const requestedType = req.nextUrl.searchParams.get("type");

  if (requestedType !== null && !isWorkType(requestedType)) {
    return NextResponse.json(
      { error: "Tipo inválido. Use realizado ou disponivel." },
      { status: 400 },
    );
  }

  const type = requestedType ?? DEFAULT_WORK_TYPE;
  const images = await prisma.image.findMany({
    where: { type: WORK_TYPE_CONFIG[type].databaseValue },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { url, publicId, title, category } = body;
  const type = body.type ?? DEFAULT_WORK_TYPE;

  if (
    typeof url !== "string" ||
    !url.trim() ||
    typeof publicId !== "string" ||
    !publicId.trim() ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return NextResponse.json(
      { error: "Campos obrigatórios: url, publicId, title, category" },
      { status: 400 },
    );
  }

  if (!isWorkType(type)) {
    return NextResponse.json(
      { error: "Tipo inválido. Use realizado ou disponivel." },
      { status: 400 },
    );
  }

  if (!isPublicIdForWorkType(publicId, type)) {
    return NextResponse.json(
      { error: "O arquivo não pertence à pasta esperada para este tipo." },
      { status: 400 },
    );
  }

  const image = await prisma.image.create({
    data: {
      url,
      publicId,
      title,
      category,
      type: WORK_TYPE_CONFIG[type].databaseValue,
    },
  });

  return NextResponse.json(image, { status: 201 });
}
