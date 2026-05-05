import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const images = await prisma.image.findMany({
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

  if (!url || !publicId || !title || !category) {
    return NextResponse.json(
      { error: "Campos obrigatórios: url, publicId, title, category" },
      { status: 400 },
    );
  }

  const image = await prisma.image.create({
    data: { url, publicId, title, category },
  });

  return NextResponse.json(image, { status: 201 });
}
