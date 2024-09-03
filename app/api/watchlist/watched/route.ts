import { authOptions } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get('skip') || '0', 10);
  const take = parseInt(searchParams.get('take') || '20', 10);
  const genre = searchParams.get('genre');
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const whereClause = genre && genre !== 'all'
      ? { userId: session?.user?.email, Movie: { genres: { has: genre } } }
      : { userId: session?.user?.email };
    
      let takeValue;
      if (take === 0) {
        takeValue = undefined;
      } else {
        takeValue = take;
      }

    const watchlist = await prisma.watched.findMany({
      where: whereClause,
      select: {
        Movie: {
          select: {
            title: true,
            poster_path: true,
            id: true,
            genres: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: takeValue,
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error('Error fetching watched movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
