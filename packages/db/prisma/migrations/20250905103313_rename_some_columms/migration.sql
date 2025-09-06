/*
  Warnings:

  - You are about to drop the column `company_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `confirm_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_company_name_key";

-- DropIndex
DROP INDEX "public"."User_phone_number_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "company_name",
DROP COLUMN "confirm_password",
DROP COLUMN "phone_number",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "confirmPassword" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_companyName_key" ON "public"."User"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "public"."User"("phoneNumber");
