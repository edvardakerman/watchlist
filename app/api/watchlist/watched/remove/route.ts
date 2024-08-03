import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

export async function DELETE(req: NextRequest) {
    const { watchedId } = await req.json();

    if (!watchedId) {
        return NextResponse.json({ error: 'Missing watchedId' }, { status: 400 });
    }

    try {
        await prisma.watched.delete({
            where: { id: watchedId },
        });

        return NextResponse.json({ message: 'Movie removed from watched list' });
    } catch (error) {
        console.error('Error removing from watched list:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
