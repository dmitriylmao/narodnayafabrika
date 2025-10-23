import React from 'react';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrap}>
                <img
                    src={category.imageUrl || 'https://placehold.co/300x300?text=Нет+Фото'}
                    alt={category.name}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300?text=Нет+Фото';
                    }}
                />
            </div>

            <h3 className={styles.name}>{category.name}</h3>
        </div>
    );
}
