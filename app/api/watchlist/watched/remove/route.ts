import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';

export async function DELETE(req: NextRequest) {
    const { movieId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    if (!movieId) {
        return NextResponse.json({ error: 'Missing movieId' }, { status: 400 });
    }

    try {
        // Delete the watchlist entry based on movieId and userId (email)
        const deletedEntry = await prisma.watched.deleteMany({
            where: {
                userId: session.user.email,
                movieId: movieId,
            },
        });

        if (deletedEntry.count === 0) {
            return NextResponse.json({ error: 'Movie not found in watchlist' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

