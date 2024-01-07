/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weeklyHits" INTEGER NOT NULL,
    "monthlyHits" INTEGER NOT NULL,
    "yearlyHits" INTEGER NOT NULL,
    "allTimeHits" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL
);
INSERT INTO "new_User" ("allTimeHits", "name", "credits", "id", "slackId", "monthlyHits", "weeklyHits", "yearlyHits") SELECT "allTimeHits", "name", "slackId", "credits", "id", "monthlyHits", "weeklyHits", "yearlyHits" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
