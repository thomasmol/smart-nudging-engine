-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nudgee_groups" (
    "nudgee_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,

    CONSTRAINT "nudgee_groups_pkey" PRIMARY KEY ("nudgee_id","group_id")
);

-- CreateTable
CREATE TABLE "component_types" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "component_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component_values" (
    "id" UUID NOT NULL,
    "component_type_id" UUID NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "component_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "used_components" (
    "nudge_id" UUID NOT NULL,
    "component_value_id" UUID NOT NULL,

    CONSTRAINT "used_components_pkey" PRIMARY KEY ("nudge_id","component_value_id")
);

-- AddForeignKey
ALTER TABLE "nudgee_groups" ADD CONSTRAINT "nudgee_groups_nudgee_id_fkey" FOREIGN KEY ("nudgee_id") REFERENCES "nudgees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nudgee_groups" ADD CONSTRAINT "nudgee_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component_values" ADD CONSTRAINT "component_values_component_type_id_fkey" FOREIGN KEY ("component_type_id") REFERENCES "component_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_components" ADD CONSTRAINT "used_components_nudge_id_fkey" FOREIGN KEY ("nudge_id") REFERENCES "nudges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_components" ADD CONSTRAINT "used_components_component_value_id_fkey" FOREIGN KEY ("component_value_id") REFERENCES "component_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
