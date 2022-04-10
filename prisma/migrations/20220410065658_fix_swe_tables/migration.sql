/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Manager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Manager` table. All the data in the column will be lost.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_customer_id_fkey";

-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "Customer_id_key";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "email",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zip_code" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "phone" DROP NOT NULL,
ADD CONSTRAINT "Manager_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Manager_id_seq";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "check_in" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "check_out" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("customer_id", "room_id");

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "suite" SET DEFAULT E'Deluxe',
ALTER COLUMN "capacity" SET DEFAULT 2;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
