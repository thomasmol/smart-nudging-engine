/*
  Warnings:

  - You are about to drop the `activitie_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activity_goal_contributions" DROP CONSTRAINT "activity_goal_contributions_activity_type_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_activity_type_id_fkey";

-- DropTable
DROP TABLE "activitie_types";

-- CreateTable
CREATE TABLE "activity_types" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "activity_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nudges" ADD CONSTRAINT "nudges_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "activity_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_goal_contributions" ADD CONSTRAINT "activity_goal_contributions_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "activity_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
