/*
  Warnings:

  - You are about to drop the column `is_nudged` on the `group_configurations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "group_configurations" DROP COLUMN "is_nudged";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "control" BOOLEAN NOT NULL DEFAULT false;
