import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const firstPlaylistId = '0730ffac-d039-4194-9571-01aa2aa0efbd'

const secondPlaylistId = 'e15f7400-8602-457d-a0b9-c20b38556433'

const thirdPlaylistId = '9a0a7c90-d33c-41a3-8aea-28b8c21b4b9f'

async function run(){   

    await prisma.song.deleteMany()
    await prisma.playlist.deleteMany()

    await Promise.all([

        prisma.playlist.create({
            data: {
                id: firstPlaylistId,
                name: 'Chill Vibes Lounge',
                description: 'Relaxamento e introspecção com músicas acústicas e downtempo.'
            }
        }),

        prisma.playlist.create({
            data: {
                id: secondPlaylistId,
                name: 'Retro Rewind Party',
                description: 'Energia e nostalgia com hits clássicos das décadas passadas.'
            }
        }),

        prisma.playlist.create({
            data: {
                id: thirdPlaylistId,
                name: 'Motivation Boost',
                description: 'Estímulo positivo com pop, rock e hip-hop para momentos de atividade.'
            }
        }),

        prisma.song.create({
            data: {
                name: 'Whispers in the Wind',
                playlist_id: firstPlaylistId
            }
        }),

        prisma.song.create({
            data: {
                name: 'Midnight Serenade',
                playlist_id: firstPlaylistId
            }
        }),

        prisma.song.create({
            data: {
                name: 'Lost in the Echoes',
                playlist_id: firstPlaylistId
            }
        }),

        prisma.song.create({
            data: {
                name: 'Dancing in the Rain',
                playlist_id: firstPlaylistId
            }
        }),

        prisma.song.create({
            data: {
                name: 'Fires of Tomorrow',
                playlist_id: firstPlaylistId
            }
        }),
    ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})