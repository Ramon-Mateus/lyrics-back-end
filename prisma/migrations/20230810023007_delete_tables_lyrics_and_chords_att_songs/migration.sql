/*
  Warnings:

  - You are about to drop the `Lyrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chords` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lyric` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lyrics";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "chords";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_songs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lyric" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "playlist_id" TEXT NOT NULL,
    CONSTRAINT "songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_songs" ("id", "name", "playlist_id") SELECT "id", "name", "playlist_id" FROM "songs";
DROP TABLE "songs";
ALTER TABLE "new_songs" RENAME TO "songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
