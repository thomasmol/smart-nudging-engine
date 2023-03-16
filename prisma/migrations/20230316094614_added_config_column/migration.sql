/*
  Warnings:

  - You are about to drop the column `reaction_wait_time` on the `configurations` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `configurations` table. All the data in the column will be lost.
  - Added the required column `end_datetime` to the `configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `configurations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "reaction_wait_time",
DROP COLUMN "start_time",
ADD COLUMN     "end_datetime" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "start_datetime" TIMESTAMPTZ(6) NOT NULL;
