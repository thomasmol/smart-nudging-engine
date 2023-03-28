-- AlterTable
ALTER TABLE "configurations" ALTER COLUMN "decision_time_weight" SET DEFAULT 0.5,
ALTER COLUMN "decision_time_weight" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "metric_type_weights" ALTER COLUMN "weight" SET DEFAULT 0.5,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;
