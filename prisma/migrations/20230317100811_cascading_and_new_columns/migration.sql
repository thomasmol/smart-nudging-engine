/*
  Warnings:

  - Added the required column `generate_model` to the `configurations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "component_values" DROP CONSTRAINT "component_values_component_type_id_fkey";

-- DropForeignKey
ALTER TABLE "nudge_metrics" DROP CONSTRAINT "nudge_metrics_metric_type_id_fkey";

-- DropForeignKey
ALTER TABLE "nudge_metrics" DROP CONSTRAINT "nudge_metrics_nudge_id_fkey";

-- DropForeignKey
ALTER TABLE "nudge_recipients" DROP CONSTRAINT "nudge_recipients_nudge_id_fkey";

-- DropForeignKey
ALTER TABLE "nudge_recipients" DROP CONSTRAINT "nudge_recipients_nudgee_id_fkey";

-- DropForeignKey
ALTER TABLE "nudgee_groups" DROP CONSTRAINT "nudgee_groups_group_id_fkey";

-- DropForeignKey
ALTER TABLE "nudgee_groups" DROP CONSTRAINT "nudgee_groups_nudgee_id_fkey";

-- DropForeignKey
ALTER TABLE "used_components" DROP CONSTRAINT "used_components_component_value_id_fkey";

-- DropForeignKey
ALTER TABLE "used_components" DROP CONSTRAINT "used_components_nudge_id_fkey";

-- AlterTable
ALTER TABLE "configurations" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "generate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "generate_model" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "nudgees" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "nudges" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "nudge_recipients" ADD CONSTRAINT "nudge_recipients_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_recipients" ADD CONSTRAINT "nudge_recipients_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component_values" ADD CONSTRAINT "component_values_component_type_id_fkey" FOREIGN KEY ("component_type_id") REFERENCES "component_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_components" ADD CONSTRAINT "used_components_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_components" ADD CONSTRAINT "used_components_component_value_id_fkey" FOREIGN KEY ("component_value_id") REFERENCES "component_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_metrics" ADD CONSTRAINT "nudge_metrics_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudge_metrics" ADD CONSTRAINT "nudge_metrics_metric_type_id_fkey" FOREIGN KEY ("metric_type_id") REFERENCES "metric_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudgee_groups" ADD CONSTRAINT "nudgee_groups_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudgee_groups" ADD CONSTRAINT "nudgee_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
