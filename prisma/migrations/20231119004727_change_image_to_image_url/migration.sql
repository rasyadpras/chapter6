/*
  Warnings:

  - You are about to drop the column `image` on the `gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gallery" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
