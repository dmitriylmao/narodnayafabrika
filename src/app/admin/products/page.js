'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../admin.module.css'; 

export default function AdminProductsDashboard() {
    return (
        <div className={styles.dashboardContainer} style={{ minHeight: '80vh', maxWidth: '800px' }}>
            
            <h1 className={styles.title} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                Управление Продукцией
            </h1>
            <p className={styles.subtitle}>
                Выберите, какой раздел каталога вы хотите редактировать.
            </p>

            <div className={styles.cardGrid}>
                
                <Link href="/admin/products/categories" className={styles.cardButton} style={{ backgroundColor: '#28a745' }}> 
                    Управление Категориями
                    <span className={styles.cardDescription}>
                        (Освежители воздуха, Смазки, и т.д.)
                    </span>
                </Link>
                
                <Link href="/admin/products/items" className={styles.cardButton} style={{ backgroundColor: '#007bff' }}>
                    Управление Товарами
                    <span className={styles.cardDescription}>
                        (Конкретные вкусы, объемы, описания)
                    </span>
                </Link>

            </div>

        </div>
    );
}
