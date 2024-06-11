-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slackId" TEXT,
    "username" TEXT NOT NULL,
    "credits" BIGINT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "isSystem" BOOLEAN NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "causedById" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_causedById_fkey" FOREIGN KEY ("causedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "editTransactions" BOOLEAN NOT NULL,
    "addTransactions" BOOLEAN NOT NULL,
    "editProfiles" BOOLEAN NOT NULL,
    "deleteUsers" BOOLEAN NOT NULL,
    "resetPasswords" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_slackId_key" ON "User"("slackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
