// src/components/News/NewsHomeSection.jsx (Теперь Server Component)

import NewsCard from './NewsCard';
import Link from 'next/link';
import styles from './NewsHomeSection.module.css';
import { getAllNewsSlugs } from '@/utils/news';

const generateMarqueeContent = (word, count) => {
  const words = Array(count).fill(word + ' ');
  return words.map((w, index) => (
    <span
      key={index}
      className={index % 2 !== 0 ? styles.marqueeStroke : styles.marqueeNormal}
    >
      {w}
    </span>
  ));
};

export default async function NewsHomeSection() {
  const allNews = getAllNewsSlugs();
  const news = allNews.slice(0, 3);

  if (news.length === 0) {
    return <section className={styles.section} style={{ minHeight: '400px' }}></section>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {generateMarqueeContent('НОВОСТИ', 40)}
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {news.map(item => (
          <NewsCard key={item.slug} newsItem={item} />
        ))}

        <Link href="/news" className={styles.moreLinkBlock}>
          <p className={styles.moreLinkText}>К разделу новостей</p>
        </Link>
      </div>
    </section>
  );
}