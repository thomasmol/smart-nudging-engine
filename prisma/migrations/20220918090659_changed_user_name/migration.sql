/*
  Warnings:

  - You are about to drop the column `user_id` on the `activity_goal_contributions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nudgee_id` to the `activity_goal_contributions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nudgee_id` to the `nudges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activity_goal_contributions" DROP CONSTRAINT "activity_goal_contributions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_user_id_fkey";

-- AlterTable
ALTER TABLE "activity_goal_contributions" DROP COLUMN "user_id",
ADD COLUMN     "nudgee_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "nudges" DROP COLUMN "user_id",
ADD COLUMN     "nudgee_id" UUID NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "nudgees" (
    "id" UUID NOT NULL,
    "nudge_category_model" JSONB,
    "nudge_channel_model" JSONB,
    "activity_model" JSONB,

    CONSTRAINT "nudgees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nudges" ADD CONSTRAINT "nudges_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_goal_contributions" ADD CONSTRAINT "activity_goal_contributions_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
