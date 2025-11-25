'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeNewsCard.module.css';

export default function HomeNewsCard({ newsItem }) {
  const fallbackSrc = '/logo.png'; 
  const [imgSrc, setImgSrc] = useState(newsItem.imageUrl || fallbackSrc);

  return (
    <Link href={`/news/${newsItem.slug}`} className={styles.card}>
      
      <div className={styles.imageWrapper}>
        <Image
          src={imgSrc}
          alt={newsItem.title || 'Изображение новости'}
          fill
          className={styles.image}
          onError={() => setImgSrc(fallbackSrc)}
          // unoptimized 
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{newsItem.title}</h3>
        
        <p className={styles.text}>{newsItem.teaser}</p>
        
        <div className={styles.buttonWrapper}>
          <span className={styles.readMoreButton}>
            Читать полностью
          </span>
        </div>
      </div>
    </Link>
  );
}