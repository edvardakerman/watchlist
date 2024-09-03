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

    let takeValue;
    if (take === 0) {
      takeValue = undefined;
    } else {
      takeValue = take;
    }

    const whereClause = genre && genre !== 'all'
      ? { userId: session?.user?.email, Movie: { genres: { has: genre } } }
      : { userId: session?.user?.email };

    const watchlist = await prisma.watchList.findMany({
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
      const deletedEntry = await prisma.watchList.deleteMany({
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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { movieId, title, poster_path, genreNames } = await req.json();

  if (!movieId || !title || !poster_path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
      const movie = await prisma.movie.upsert({
          where: { id: Number(movieId) },
          update: { poster_path, title, genres: genreNames },
          create: { id: Number(movieId), poster_path, title, genres: genreNames },
      });

      const watchlistEntry = await prisma.watchList.create({
          data: { userId: session.user.email, movieId: movie.id },
      });

      return NextResponse.json({ watchlistId: watchlistEntry.id });
  } catch (error) {
      console.error('Error adding to watchlist:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
