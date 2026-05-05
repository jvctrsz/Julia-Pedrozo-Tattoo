import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const image = await prisma.image.findUnique({ where: { id } });

  if (!image) {
    return NextResponse.json(
      { error: "Imagem não encontrada" },
      { status: 404 },
    );
  }

  await cloudinary.uploader.destroy(image.publicId);
  await prisma.image.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
