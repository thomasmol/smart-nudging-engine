-- AlterTable
ALTER TABLE "configurations" ADD COLUMN     "deconstructed_prompt" JSONB,
ALTER COLUMN "generate_model" DROP NOT NULL;

-- CreateTable
CREATE TABLE "group_configurations" (
    "group_id" UUID NOT NULL,
    "configuration_id" UUID NOT NULL,
    "is_nudged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "group_configurations_pkey" PRIMARY KEY ("group_id","configuration_id")
);

-- AddForeignKey
ALTER TABLE "group_configurations" ADD CONSTRAINT "group_configurations_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_configurations" ADD CONSTRAINT "group_configurations_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "configurations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
