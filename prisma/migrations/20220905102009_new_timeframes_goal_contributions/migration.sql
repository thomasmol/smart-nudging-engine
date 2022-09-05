/*
  Warnings:

  - You are about to drop the column `activity_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `datetime` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `activity_goal_contribution` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `activity_type_id` to the `nudges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present_datetime` to the `nudges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reaction_wait_datetime` to the `nudges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeframe_id` to the `nudges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_activity_id_fkey";

-- AlterTable
ALTER TABLE "nudges" DROP COLUMN "activity_id",
DROP COLUMN "datetime",
ADD COLUMN     "activity_type_id" UUID NOT NULL,
ADD COLUMN     "present_datetime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "reaction_wait_datetime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "timeframe_id" UUID NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activity_goal_contribution";

-- DropTable
DROP TABLE "activities";

-- CreateTable
CREATE TABLE "activitie_types" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "activitie_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeframes" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "timeframes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_goal_contributions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "activity_type_id" UUID NOT NULL,

    CONSTRAINT "activity_goal_contributions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nudges" ADD CONSTRAINT "nudges_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "activitie_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudges" ADD CONSTRAINT "nudges_timeframe_id_fkey" FOREIGN KEY ("timeframe_id") REFERENCES "timeframes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_goal_contributions" ADD CONSTRAINT "activity_goal_contributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_goal_contributions" ADD CONSTRAINT "activity_goal_contributions_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "activitie_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
