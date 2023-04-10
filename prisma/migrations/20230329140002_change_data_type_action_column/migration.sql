/*
  Warnings:

  - Changed the type of `metric_value` on the `actions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "actions" DROP COLUMN "metric_value",
ADD COLUMN     "metric_value" INTEGER NOT NULL;
