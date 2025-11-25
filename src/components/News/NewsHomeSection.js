import Link from 'next/link';
import styles from './NewsHomeSection.module.css';
import { getAllNewsSlugs } from '@/utils/news';
import HomeNewsCard from './HomeNewsCard'; 

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
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {generateMarqueeContent('НОВОСТИ', 40)}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {news.map(item => (
            <HomeNewsCard key={item.slug} newsItem={item} />
          ))}

          <Link href="/news" className={styles.linkBlock}>
             <span className={styles.linkText}>
               К разделу<br />новостей
             </span>
             <span className={styles.arrow}>→</span>
          </Link>

        </div>
      </div>
    </section>
  );
}