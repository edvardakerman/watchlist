/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'image.tmdb.org',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
