// "use server";

// import { revalidatePath } from "next/cache";
// import prisma from "./utils/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./utils/auth";

// //  Add Movie To Watchlist
// export async function addToWatchlist(formData: FormData) {
//     "use server";

//     const movieId = formData.get("movieId");
//     const title = formData.get("title") as string;
//     const poster_path = formData.get("poster_path") as string;
//     const pathname = formData.get("pathname") as string;
//     const genres = formData.get("genres") as string;
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//         throw new Error('User not authenticated');
//     }

//     const genreArray = genres ? genres.split(',').map(genre => genre.trim()) : [];

//         const movie = await prisma.movie.upsert({
//           where: { id: Number(movieId) },
//           update: {
//               poster_path: poster_path,
//               title: title,
//               genres: genreArray
//           },
//           create: {
//               id: Number(movieId),
//               poster_path: poster_path,
//               title: title,
//               genres: genreArray
//           },
//       });
  
//       // Create a new entry in the WatchList table
//       const watchListEntry = await prisma.watchList.create({
//         data: {
//           userId: session.user.email,
//           movieId: movie.id,
//         },
//       });

//     revalidatePath(pathname);
// }


// // Delete Movie From Watchlist
// export async function deleteFromWatchlist(formData: FormData) {
//     "use server";

//     const watchlistId = formData.get("watchlistId") as string;
//     const pathname = formData.get("pathname") as string;

//     const data = await prisma.watchList.delete({
//         where: {
//             id: watchlistId,
//         },
//     });

//     revalidatePath(pathname);   
// }


// // Add Movie To Watched
// export async function addToWatched(formData: FormData) {
//     "use server";

//     const movieId = formData.get("movieId");
//     const title = formData.get("title") as string;
//     const poster_path = formData.get("poster_path") as string;
//     const pathname = formData.get("pathname") as string;
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//         throw new Error('User not authenticated');
//     }

//     // Create movie if it doesn't exist
//     const movie = await prisma.movie.upsert({
//         where: { id: Number(movieId) },
//         update: {},
//         create: {
//           id: Number(movieId),
//           poster_path: poster_path,
//           title: title,
//         },
//       });
  
//       // Create a new entry in the WatchList table
//       const watchedEntry = await prisma.watched.create({
//         data: {
//           userId: session.user.email,
//           movieId: movie.id,
//         },
//       });

//     revalidatePath(pathname);
// }


// // Delete Movie From Watched
// export async function deleteFromWatched(formData: FormData) {
//     "use server";

//     const watchedId = formData.get("watchedId") as string;
//     const pathname = formData.get("pathname") as string;

//     const data = await prisma.watched.delete({
//         where: {
//             id: watchedId,
//         },
//     });

//     revalidatePath(pathname);   
// }