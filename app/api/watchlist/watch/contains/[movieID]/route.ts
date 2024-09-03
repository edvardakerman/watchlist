// import { authOptions } from '@/app/utils/auth';
// import prisma from '@/app/utils/db';
// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest, { params }: { params: { movieID: string } }) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
//   }

//   const { movieID } = params;

//   if (!movieID) {
//     return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
//   }

//   try {
//     const watchlistEntry = await prisma.watchList.findUnique({
//       where: {
//         userId_movieId: {
//           userId: session.user.email,
//           movieId: parseInt(movieID, 10),
//         },
//       },
//     });

//     if (!watchlistEntry) {
//       return NextResponse.json({ watchlist: false });
//     }

//     return NextResponse.json({ watchlist: true, watchlistId: watchlistEntry.id });
//   } catch (error) {
//     console.error('Error fetching movie:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
