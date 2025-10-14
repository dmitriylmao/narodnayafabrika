'use client'; 

import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '@/utils/firebaseFetch'; 
import NewsCard from './NewsCard'; 
import Link from 'next/link';
import styles from './NewsHomeSection.module.css';

const generateMarqueeContent = (word, count) => {
    const words = Array(count).fill(word + ' ');
    
    return words.map((w, index) => {
        const isStroke = index % 2 !== 0; 
        
        return (
            <span 
                key={index} 
                className={isStroke ? styles.marqueeStroke : styles.marqueeNormal}
            >
                {w}
            </span>
        );
    });
};


export default function NewsHomeSection() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchNews = async () => {
             try {
                 const allNews = await getAllDocuments('news');
                 const sortedNews = allNews.sort((a, b) => 
                     (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
                 );
                 setNews(sortedNews.slice(0, 3)); 
             } catch (error) {
                 console.error("Ошибка загрузки новостей для главной страницы:", error);
             } finally {
                 setLoading(false);
             }
         };

         fetchNews();
    }, []);

    if (loading) {
        return <section className={styles.section} style={{minHeight: '400px'}}></section>;
    }
    
    return (
        <section className={styles.section}>
            
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeContent}>
                    {generateMarqueeContent('НОВОСТИ', 40)} 
                </div>
            </div>

            <div className={styles.cardsContainer}>
                {news.map((item) => (
                    <NewsCard key={item.id} newsItem={item} />
                ))}

                <Link href="/news" className={styles.moreLinkBlock}>
                    <p className={styles.moreLinkText}>К разделу новостей</p>
                </Link>
                
            </div>
            
        </section>
    );
}