
import React from 'react';
import { getAllDocuments } from '@/utils/firebaseFetch'; 
import NewsCard from '@/components/News/NewsCard';
import styles from './NewsPage.module.css'; 

export const revalidate = 60; 

export default async function NewsPage() {
    
    const news = await getAllDocuments('news');
    
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Актуальные Новости</h1>

            {news.length === 0 ? (
                <p className={styles.noNews}>
                    На данный момент нет опубликованных новостей. Скоро появятся!
                </p>
            ) : (
                <div className={styles.cardGrid}>
                    {news.map(item => (
                        <NewsCard key={item.id} newsItem={item} />
                    ))}
                </div>
            )}
            
        </div>
    );
}