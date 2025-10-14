
'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NewsCard.module.css';

export default function NewsCard({ newsItem }) {
    
    const fallbackSrc = '/logo.png'; 
    const [imgSrc, setImgSrc] = useState(newsItem.imageUrl || fallbackSrc);
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getTeaser = (text) => {
        const maxLength = 100; 
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const formattedDate = formatDate(newsItem.createdAt);

    return (
        <Link href={`/news/${newsItem.slug}`} className={styles.card}>
            
            <div className={styles.imageWrapper}>
                <Image
                    src={imgSrc} 
                    alt={newsItem.title || 'Изображение новости'}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw" 
                    className={styles.image}
                    onError={() => setImgSrc(fallbackSrc)} 
                    unoptimized={imgSrc === fallbackSrc} 
                />
            </div>
            
            <div className={styles.content}>
                <p className={styles.date}>{formattedDate}</p>

                <h3 className={styles.title}>{newsItem.title}</h3>
                
                <p className={styles.text}>{getTeaser(newsItem.content)}</p>
                
                <span className={styles.readMore}>
                    Читать полностью →
                </span>
            </div>
        </Link>
    );
}