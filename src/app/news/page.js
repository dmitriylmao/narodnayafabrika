// src/app/news/page.js

import NewsCard from '@/components/News/NewsCard';
import styles from './NewsPage.module.css'; 
import { getAllNewsSlugs } from '@/utils/news'; 


export default async function NewsPage() {
    const news = getAllNewsSlugs(); 

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Новости</h1>

            {news.length === 0 ? (
                <p className={styles.noNews}>
                    На данный момент нет опубликованных новостей. Скоро появятся!
                </p>
            ) : (
                <div className={styles.cardGrid}>
                    {news.map(item => (
                        <NewsCard key={item.slug} newsItem={item} /> 
                    ))}
                </div>
            )}
        </div>
    );
}