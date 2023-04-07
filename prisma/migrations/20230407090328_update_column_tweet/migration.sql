/*
  Warnings:

  - Added the required column `description` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tweet` ADD COLUMN `description` TEXT NOT NULL;
