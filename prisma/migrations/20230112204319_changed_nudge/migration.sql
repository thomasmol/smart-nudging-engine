/*
  Warnings:

  - You are about to drop the column `category_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `channel_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_category_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_channel_id_fkey";

-- AlterTable
ALTER TABLE "nudges" DROP COLUMN "category_id",
DROP COLUMN "channel_id",
ADD COLUMN     "text" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "channels";
