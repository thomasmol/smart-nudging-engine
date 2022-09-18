/*
  Warnings:

  - Added the required column `contribution` to the `activity_goal_contributions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_goal_contributions" ADD COLUMN     "contribution" INTEGER NOT NULL;
