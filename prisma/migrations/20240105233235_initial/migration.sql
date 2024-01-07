-- CreateTable
CREATE TABLE "User" (
   "id" TEXT NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weeklyHits" INTEGER NOT NULL,
    "monthlyHits" INTEGER NOT NULL,
    "yearlyHits" INTEGER NOT NULL,
    "allTimeHits" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL
);
