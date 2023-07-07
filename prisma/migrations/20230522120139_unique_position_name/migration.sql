/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Team_longName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");
