/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vvs-shop.com', 
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net', 
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com', 
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', 
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', 
      },
      {
        protocol: 'https',
        hostname: 'postimg.cc', 
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', 
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', 
      },
      {
        protocol: 'https',
        hostname: '*.firebaseapp.com', 
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.googleapis.com', 
      },
    ],
  },
};

export default nextConfig;
