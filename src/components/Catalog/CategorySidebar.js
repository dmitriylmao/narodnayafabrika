'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { db } from '@/firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import styles from './CategorySidebar.module.css';

export default function CategorySidebar({ activeCategorySlug }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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
                console.error("Ошибка загрузки категорий для сайдбара:", err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <aside className={styles.sidebar}><p>Загрузка...</p></aside>;
    }

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.list}>
                {categories.map(category => {
                    const isActive = category.slug === activeCategorySlug;
                    
                    const linkClassName = `${styles.link} ${isActive ? styles.active : ''}`;

                    return (
                        <li key={category.id}>
                            <Link href={`/catalog/${category.slug}`} className={linkClassName}>
                                {category.imageUrl ? (
                                    <Image
                                        src={category.imageUrl} 
                                        alt={category.name}
                                        width={30}
                                        height={30}
                                        className={styles.icon}
                                    />
                                ) : (
                                    <div className={styles.iconPlaceholder}></div> 
                                )}
                                <span>{category.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}