/*
  Warnings:

  - You are about to drop the column `date_event` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `speakersnp` table. All the data in the column will be lost.
  - Added the required column `tanggal` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "date_event",
DROP COLUMN "location",
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."speakersnp" DROP COLUMN "image";
