/*
  Warnings:

  - You are about to drop the column `decision_time_weights` on the `configurations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "decision_time_weights",
ADD COLUMN     "decision_time_weight" INTEGER NOT NULL DEFAULT 1;
