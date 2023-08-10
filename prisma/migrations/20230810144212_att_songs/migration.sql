-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_songs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lyric" TEXT,
    "created_at" DATETIME NOT NULL,
    "playlist_id" TEXT NOT NULL,
    CONSTRAINT "songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_songs" ("created_at", "id", "lyric", "name", "playlist_id") SELECT "created_at", "id", "lyric", "name", "playlist_id" FROM "songs";
DROP TABLE "songs";
ALTER TABLE "new_songs" RENAME TO "songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
