import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import { prisma } from './lib/prisma'
import dayjs from 'dayjs';

export async function appRoutes(app: FastifyInstance) {

    app.get('/playlists', async () => {
        const playlists = await prisma.playlist.findMany()
        return playlists
    })

    app.get('/songs', async () => {
        const songs = await prisma.song.findMany()
        return songs
    })

    app.get('/playlists/:id', async (request) => {

        const playlistParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = playlistParams.parse(request.params)

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: id,
            }
        })

        const Songs = await prisma.song.findMany({
            where: {
                playlist_id: id
            }
        })

        return {
            playlist,
            Songs
        }
    })

    app.get('/songs/:id', async (request) => {

        const songParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = songParams.parse(request.params)

        const song = await prisma.song.findUnique({
            where: {
                id: id,
            }
        })
        return song
    })

    app.post('/playlists', async (request) => {
        const postPlaylistBody = z.object({
            name: z.string(),
            description: z.string()
        })

        const { name, description } = postPlaylistBody.parse(request.body)

        await prisma.playlist.create({
            data: {
                name,
                description
            }
        })
    })

    app.post('/songs', async (request) => {
        const postSongBody = z.object({
            name: z.string(),
            playlist_id: z.string().uuid().optional()
        })

        const { name, playlist_id } = postSongBody.parse(request.body)

        const created_at = dayjs().startOf('day').toDate()  // retorna o dia com a hora zerada

        if (playlist_id) {
            await prisma.song.create({
                data: {
                    name,
                    created_at,
                    playlist_id
                }
            })
        } else {
            await prisma.song.create({
                data: {
                    name,
                    created_at
                }
            })
        }
    })

    app.delete('/songs/:id', async (request) => {
        const songParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = songParams.parse(request.params)

        await prisma.song.delete({
            where: {
                id: id
            }
        })
    })

    app.delete('/playlists/:id', async (request) => {
        const playlistParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = playlistParams.parse(request.params)

        await prisma.playlist.delete({
            where: {
                id: id
            }
        })
    })

    app.put('/playlists/:id', async (request) => {
        const playlistParams = z.object({
            id: z.string().uuid(),
        })
        
        const putPlaylistBody = z.object({
            name: z.string(),
            description: z.string()
        })

        const { id } = playlistParams.parse(request.params)
        const { name, description } = putPlaylistBody.parse(request.body)

        await prisma.playlist.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description
            }
        })
    })

    app.put('/songs/:id', async (request) => {
        const songParams = z.object({
            id: z.string().uuid(),
        })

        const putSongBody = z.object({
            name: z.string().optional(),
            playlist_id: z.string().uuid().optional()
        })

        const { id } = songParams.parse(request.params)
        const { name, playlist_id } = putSongBody.parse(request.body)

        if(name === '') {
            await prisma.song.update({
                where: {
                    id: id
                },
                data: {
                    playlist_id: playlist_id
                }
            })
        } else {
            await prisma.song.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    playlist_id: playlist_id
                }
            })
        }
    })

    app.put('/lyric/:id', async (request) => {
        const lyricParams = z.object({
            id: z.string().uuid(),
        })

        const putLyricBody = z.object({
            lyric: z.string().optional()
        })

        const { id } = lyricParams.parse(request.params)
        const { lyric } = putLyricBody.parse(request.body)

        if (lyric) {
            await prisma.song.update({
                where: {
                    id: id
                },
                data: {
                    lyric: lyric
                }
            })
        } else {
            await prisma.song.update({
                where: {
                    id: id
                },
                data: {
                    lyric: null
                }
            })
        }
    })
}