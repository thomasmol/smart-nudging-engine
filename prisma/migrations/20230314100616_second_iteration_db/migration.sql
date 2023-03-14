/*
  Warnings:

  - You are about to drop the column `activity_model` on the `nudgees` table. All the data in the column will be lost.
  - You are about to drop the column `nudge_category_model` on the `nudgees` table. All the data in the column will be lost.
  - You are about to drop the column `nudge_channel_model` on the `nudgees` table. All the data in the column will be lost.
  - You are about to drop the column `activity_type_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `configuration_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveness` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `nudgee_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `present_datetime` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `reaction_wait_datetime` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `timeframe_id` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `nudges` table. All the data in the column will be lost.
  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity_goal_contributions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timeframes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profile` to the `nudgees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `nudges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_type` to the `nudges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_activity_type_id_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_nudgee_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_goal_contributions" DROP CONSTRAINT "activity_goal_contributions_activity_type_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_goal_contributions" DROP CONSTRAINT "activity_goal_contributions_nudgee_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_activity_type_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_configuration_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_nudgee_id_fkey";

-- DropForeignKey
ALTER TABLE "nudges" DROP CONSTRAINT "nudges_timeframe_id_fkey";

-- AlterTable
ALTER TABLE "nudgees" DROP COLUMN "activity_model",
DROP COLUMN "nudge_category_model",
DROP COLUMN "nudge_channel_model",
ADD COLUMN     "profile" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "nudges" DROP COLUMN "activity_type_id",
DROP COLUMN "configuration_id",
DROP COLUMN "created_at",
DROP COLUMN "effectiveness",
DROP COLUMN "nudgee_id",
DROP COLUMN "present_datetime",
DROP COLUMN "reaction_wait_datetime",
DROP COLUMN "text",
DROP COLUMN "timeframe_id",
DROP COLUMN "updated_at",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "content_type" TEXT NOT NULL,
ADD COLUMN     "generated" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "activities";

-- DropTable
DROP TABLE "activity_goal_contributions";

-- DropTable
DROP TABLE "activity_types";

-- DropTable
DROP TABLE "timeframes";

-- CreateTable
CREATE TABLE "nudge_recipients" (
    "nudge_id" UUID NOT NULL,
    "nudgee_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nudge_recipients_pkey" PRIMARY KEY ("nudge_id","nudgee_id")
);

-- CreateTable
CREATE TABLE "metric_types" (
    "id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "metric_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" UUID NOT NULL,
    "nudgee_id" UUID NOT NULL,
    "metric_type_id" UUID NOT NULL,
    "metric_value" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nudge_metrics" (
    "nudge_id" UUID NOT NULL,
    "metric_type_id" UUID NOT NULL,

    CONSTRAINT "nudge_metrics_pkey" PRIMARY KEY ("nudge_id","metric_type_id")
);

-- AddForeignKey
ALTER TABLE "nudge_recipients" ADD CONSTRAINT "nudge_recipients_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_recipients" ADD CONSTRAINT "nudge_recipients_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_metric_type_id_fkey" FOREIGN KEY ("metric_type_id") REFERENCES "metric_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_metrics" ADD CONSTRAINT "nudge_metrics_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_metrics" ADD CONSTRAINT "nudge_metrics_metric_type_id_fkey" FOREIGN KEY ("metric_type_id") REFERENCES "metric_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
