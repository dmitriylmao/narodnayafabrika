// src/app/news/[slug]/page.js

import { getAllNewsSlugs, getNewsData } from '@/utils/news';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './NewsDetailPage.module.css'; 

export async function generateStaticParams() {
  const newsItems = getAllNewsSlugs();
  
  return newsItems.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsDetailPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const slug = params.slug;

  const postData = await getNewsData(slug);

  if (!postData) {
      notFound();
      return null;
  }

  const fallbackSrc = '/logo.png'; 
  const imgSrc = postData.imageUrl || fallbackSrc;
  const isLocalFallback = !postData.imageUrl;

  return (
      <div className={styles.container}>
          <header className={styles.header}>
              <h1 className={styles.title}>{postData.title}</h1>
              <p className={styles.date}>Опубликовано: {postData.createdAt}</p>
          </header>

          <div className={styles.imageWrapper}>
              <Image
                  src={imgSrc} 
                  alt={postData.title}
                  fill 
                  sizes="100vw"
                  className={styles.image}
                  unoptimized={isLocalFallback} 
              />
          </div>
          
          <main className={styles.content}>
              <div 
                  className={styles.text} 
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
              />
          </main>

          <Link href="/news" className={styles.backLink}>
              ← Все новости
          </Link>
      </div>
  );
}
