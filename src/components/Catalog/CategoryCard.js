// src/components/Catalog/CategoryCard.js
'use client';

import React from 'react';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
  const imageSource = category.image || category.imageUrl || 'https://placehold.co/300x300?text=Нет+Фото';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={imageSource}
          alt={category.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x300?text=Нет+Фото';
          }}
        />
      </div>
      <div className={styles.contName}>
        <h3 className={styles.name}>{category.name}</h3>
      </div>   
    </div>
  );
}