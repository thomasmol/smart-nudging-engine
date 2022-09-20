-- CreateTable
CREATE TABLE "configurations" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "reaction_wait_time" INTEGER NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);
