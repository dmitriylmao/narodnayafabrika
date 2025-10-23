'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, categorySlug }) {
    if (!product) return null;

    const { brandName, baseProductName, assortmentName, packSize, imageUrl, slug } = product;

    return (
        <Link
            href={`/catalog/${categorySlug}/${slug}`}
            className={styles.card}
        >
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={baseProductName}
                        className={styles.image}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x160/f3f4f6/a3a3a3?text=Нет+Фото'; }}
                    />
                ) : (
                    <div className={styles.noImage}>Нет Фото</div>
                )}
            </div>

            <div className={styles.info}>
                <p className={styles.brand}>{brandName}</p>
                <p className={styles.name}>{baseProductName} {assortmentName ? `- ${assortmentName}` : ''}</p>
                {packSize && <p className={styles.packSize}>{packSize}</p>}
                <button className={styles.detailsButton}>Подробнее</button>
            </div>
        </Link>
    );
}
