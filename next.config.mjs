/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Домен для PostImage.cc (который не работал)
        hostname: 'postimg.cc', 
      },
      {
        protocol: 'https',
        // !!! НОВЫЙ ДОМЕН ДЛЯ ПРЯМЫХ ССЫЛОК !!!
        hostname: 'i.postimg.cc', 
      },
      {
        protocol: 'https',
        // Домен для Imgur (прямые ссылки)
        hostname: 'i.imgur.com', 
      },
      // Добавляем wildcard для Firebase Storage на будущее (если решишь перейти)
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
