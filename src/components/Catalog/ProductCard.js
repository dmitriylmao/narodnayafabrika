'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, categorySlug }) {
  if (!product) return null;

  const { brand, title, volume, image, slug } = product;

  return (
    <Link
      href={`/catalog/${categorySlug}/${slug}`}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
        
        {/* Бейджик "Новинка" или "Хит" можно добавить сюда */}
        {/* <span className={styles.badge}>HIT</span> */}
      </div>

      <div className={styles.content}>
        {brand && <span className={styles.brand}>{brand}</span>}
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.bottomRow}>
          {volume && <span className={styles.volume}>{volume}</span>}
          <span className={styles.arrowIcon}>→</span>
        </div>
      </div>
    </Link>
  );
}