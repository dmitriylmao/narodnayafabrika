// src/app/news/[slug]/page.js

import { getAllNewsSlugs, getNewsData } from '@/utils/news';
import Image3D from '@/components/News/Image3D';
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
        <Link href="/news" className={styles.backLink}>
            <span className={styles.backArrow}>←</span> Все новости
        </Link>
          
        <div className={styles.contentContainer}>
            <div className={styles.leftContainer}>

                {/* 🔥 Вот здесь вставили анимацию */}
                <Image3D
                  src={imgSrc}
                  alt={postData.title}
                  isLocalFallback={isLocalFallback}
                />

                <p className={styles.date}>Опубликовано: {postData.createdAt}</p>
            </div>

            <div className={styles.rightContainer}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{postData.title}</h1>
                </header>
                <div 
                    className={styles.text} 
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
                />
            </div>
        </div>
    </div>
  );
}
