/*
  Warnings:

  - Added the required column `configuration_id` to the `nudges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nudges" ADD COLUMN     "configuration_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "nudges" ADD CONSTRAINT "nudges_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
