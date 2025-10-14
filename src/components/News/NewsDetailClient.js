'use client'; 

import { useParams, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDocumentBySlug } from '@/utils/firebaseFetch'; 
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/news/[slug]/NewsDetailPage.module.css';

const formatDate = (timestamp) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
        if (typeof timestamp === 'string') {
             try {
                const date = new Date(timestamp);
                if (isNaN(date)) return '';
                return date.toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
             } catch (e) {
                return '';
             }
        }
        return '';
    }
    
    const date = timestamp.toDate();
    
    return date.toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function NewsDetailClient() {
    const params = useParams();
    const slug = params.slug ? decodeURIComponent(params.slug) : null; 
    
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) {
             setLoading(false);
             return;
        }

        const fetchData = async () => {
            try {
                const item = await getDocumentBySlug('news', slug);
                setNewsItem(item);
            } catch (error) {
                console.error("Ошибка загрузки новости:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return <div className={styles.container} style={{textAlign: 'center', marginTop: '50px'}}>Загрузка новости...</div>;
    }

    if (!newsItem) {
        notFound(); 
        return null;
    }

    const formattedDate = formatDate(newsItem.createdAt);
    const fallbackSrc = '/logo.png'; 
    const imgSrc = newsItem.imageUrl || fallbackSrc;
    const isLocalFallback = !newsItem.imageUrl;

    return (
        <div className={styles.container}>
            
            <header className={styles.header}>
                <h1 className={styles.title}>{newsItem.title}</h1>
                <p className={styles.date}>Опубликовано: {formattedDate}</p>
            </header>

            <div className={styles.imageWrapper}>
                <Image
                    src={imgSrc} 
                    alt={newsItem.title}
                    fill 
                    sizes="100vw"
                    className={styles.image}
                    unoptimized={isLocalFallback} 
                />
            </div>
            
            <main className={styles.content}>
                <p className={styles.text}>{newsItem.content}</p>
            </main>

            <Link href="/news" className={styles.backLink}>
                ← Все новости
            </Link>
        </div>
    );
}