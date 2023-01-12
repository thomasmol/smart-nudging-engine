/*
  Warnings:

  - You are about to drop the column `name` on the `component_types` table. All the data in the column will be lost.
  - Added the required column `data_type` to the `component_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `component_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "component_types" DROP COLUMN "name",
ADD COLUMN     "data_type" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL;
