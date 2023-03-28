-- AlterTable
ALTER TABLE "configurations" ADD COLUMN     "decision_time_weights" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "metric_type_weights" (
    "id" UUID NOT NULL,
    "configuration_id" UUID NOT NULL,
    "metric_type_id" UUID NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "metric_type_weights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nudgee_weights" (
    "nudgee_id" UUID NOT NULL,
    "configuration_id" UUID NOT NULL,
    "weights" JSONB NOT NULL,

    CONSTRAINT "nudgee_weights_pkey" PRIMARY KEY ("nudgee_id","configuration_id")
);

-- AddForeignKey
ALTER TABLE "metric_type_weights" ADD CONSTRAINT "metric_type_weights_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "configurations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric_type_weights" ADD CONSTRAINT "metric_type_weights_metric_type_id_fkey" FOREIGN KEY ("metric_type_id") REFERENCES "metric_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudgee_weights" ADD CONSTRAINT "nudgee_weights_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudgee_weights" ADD CONSTRAINT "nudgee_weights_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "configurations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
