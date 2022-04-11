-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT true;
