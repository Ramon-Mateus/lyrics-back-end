-- CreateTable
CREATE TABLE "Lyrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "line" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,
    CONSTRAINT "Lyrics_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chords" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "lyric_id" TEXT NOT NULL,
    CONSTRAINT "chords_lyric_id_fkey" FOREIGN KEY ("lyric_id") REFERENCES "Lyrics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
