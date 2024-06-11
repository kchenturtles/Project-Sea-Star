-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slackId" TEXT,
    "username" TEXT NOT NULL,
    "credits" BIGINT NOT NULL,
    "roleId" INTEGER,
    "isSystem" BOOLEAN NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("credits", "id", "isSystem", "roleId", "slackId", "username") SELECT "credits", "id", "isSystem", "roleId", "slackId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_slackId_key" ON "User"("slackId");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
