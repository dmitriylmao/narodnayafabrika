// src/components/News/NewsCard.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NewsCard.module.css';

export default function NewsCard({ newsItem }) {
  const fallbackSrc = '/logo.png';
  const [imgSrc, setImgSrc] = useState(newsItem.imageUrl || fallbackSrc);

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
        <p className={styles.date}>{newsItem.createdAt}</p>

        <h3 className={styles.title}>{newsItem.title}</h3>

        <p className={styles.text}>{newsItem.teaser}</p>

        <span className={styles.readMore}>
          Читать полностью →
        </span>
      </div>
    </Link>
  );
}