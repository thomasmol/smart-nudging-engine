-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL,
    "nudgee_id" UUID NOT NULL,
    "activity_type_id" UUID NOT NULL,
    "metadata" JSONB,
    "datetime" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_activity_type_id_fkey" FOREIGN KEY ("activity_type_id") REFERENCES "activity_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
