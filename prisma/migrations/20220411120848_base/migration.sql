/*
  Warnings:

  - The `suite` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bookingPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Deluxe', 'Premium', 'Luxury', 'Elite', 'VIP');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "bookingPrice" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "suite",
ADD COLUMN     "suite" "RoomType" NOT NULL DEFAULT E'Deluxe';

-- CreateTable
CREATE TABLE "BasePrice" (
    "suite" "RoomType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "base_price" BIGINT NOT NULL,

    CONSTRAINT "BasePrice_pkey" PRIMARY KEY ("suite","capacity")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_suite_capacity_fkey" FOREIGN KEY ("suite", "capacity") REFERENCES "BasePrice"("suite", "capacity") ON DELETE RESTRICT ON UPDATE CASCADE;
