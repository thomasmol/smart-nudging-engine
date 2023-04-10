/*
  Warnings:

  - The primary key for the `metric_type_weights` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `metric_type_weights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "metric_type_weights" DROP CONSTRAINT "metric_type_weights_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "metric_type_weights_pkey" PRIMARY KEY ("configuration_id", "metric_type_id");
