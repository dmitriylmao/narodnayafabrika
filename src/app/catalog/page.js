'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

import CategoryCard from '@/components/Catalog/CategoryCard';
import styles from './page.module.css';

export default function CatalogPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, 'productCategories'),
            orderBy('order', 'asc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                setCategories(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
                setLoading(false);
            },
            (err) => {
                console.error("Ошибка загрузки категорий:", err);
                setError("Не удалось загрузить категории");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.page}>
            
            <Breadcrumbs />

            <h1 className={styles.title}>Каталог</h1>

            {loading && <p className={styles.status}>Загрузка...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.grid}>
                {categories.map(category => (
                    <Link key={category.id} href={`/catalog/${category.slug}`}>
                        <CategoryCard category={category} />
                    </Link>
                ))}
            </div>

            {!loading && categories.length === 0 && (
                <p className={styles.status}>Категорий пока нет</p>
            )}
        </div>
    );
}
