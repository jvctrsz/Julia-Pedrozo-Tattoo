-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('REALIZADO', 'DISPONIVEL');

-- AlterTable
ALTER TABLE "Image"
ADD COLUMN "type" "WorkType" NOT NULL DEFAULT 'REALIZADO';

-- CreateIndex
CREATE INDEX "Image_type_createdAt_idx" ON "Image"("type", "createdAt" DESC);
