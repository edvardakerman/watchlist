import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: NextRequest) {
    const { watchedId, pathname } = await req.json();

    if (!watchedId) {
        return NextResponse.json({ error: 'Missing watchedId' }, { status: 400 });
    }

    try {
        await prisma.watched.delete({
            where: { id: watchedId },
        });

        revalidatePath('/watchlist')

        return NextResponse.json({ message: 'Movie removed from watched list' });
    } catch (error) {
        console.error('Error removing from watched list:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
