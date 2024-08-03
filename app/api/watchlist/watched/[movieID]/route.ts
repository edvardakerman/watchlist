import { authOptions } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log("########MOVIE ID: " +  req.query)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const movieID = 799583;

  if (!movieID) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  try {
    const movie = await prisma.watched.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.email,
          movieId: Number(movieID),
        },
      },
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
    });

    if (!movie) {
      return res.json({ watched: false });
    }

    return NextResponse.json({ watched: true, movie: movie.Movie });
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
