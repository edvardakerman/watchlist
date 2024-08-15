import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { movieId, title, poster_path, genreNames, pathname } = await req.json();

    if (!movieId || !title || !poster_path) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const movie = await prisma.movie.upsert({
            where: { id: Number(movieId) },
            update: { poster_path, title, genres: genreNames },
            create: { id: Number(movieId), poster_path, title, genres: genreNames },
        });

        const watchedEntry = await prisma.watched.create({
            data: { userId: session.user.email, movieId: movie.id },
        });

        revalidatePath('/watchlist')

        return NextResponse.json({ watchedId: watchedEntry.id });
    } catch (error) {
        console.error('Error adding to watched list:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}