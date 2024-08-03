import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

export async function DELETE(req: NextRequest) {
    const { watchlistId } = await req.json();

    if (!watchlistId) {
        return NextResponse.json({ error: 'Missing watchListId' }, { status: 400 });
    }

    try {
        await prisma.watchList.delete({
            where: { id: watchlistId },
        });

        return NextResponse.json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
