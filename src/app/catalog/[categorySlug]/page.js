'use client'; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/config';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import ProductCard from '@/components/Catalog/ProductCard';
import CategorySidebar from '@/components/Catalog/CategorySidebar'; 
import styles from './page.module.css';

export default function CategoryPage() {
    const params = useParams();
    const { categorySlug } = params;

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categorySlug) return;
        
        const fetchCategory = async () => {
            try {
                const q = query(collection(db, 'productCategories'));
                const snapshot = await getDocs(q);
                const matched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    .find(cat => cat.slug === categorySlug);

                if (!matched) {
                    setError('Категория не найдена');
                    setLoading(false);
                    return;
                }
                setCategory(matched);
                
                const qItems = query(
                    collection(db, 'productItems'), 
                    where('categoryId', '==', matched.id)
                );

                const unsubscribe = onSnapshot(qItems, (snap) => {
                    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setProducts(items);
                    setLoading(false);
                }, (err) => {
                    console.error('Ошибка загрузки товаров:', err);
                    setError('Не удалось загрузить товары');
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (err) {
                console.error('Ошибка:', err);
                setError('Ошибка при загрузке категории и товаров');
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categorySlug]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.heading}>{category ? category.name : 'Загрузка...'}</h1>
                <p>Загрузка товаров...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.heading}>Каталог</h1>
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Breadcrumbs categoryName={category?.name} categorySlug={category?.slug} />

            <div className={styles.mainContentWrapper}>
                
                <CategorySidebar activeCategorySlug={categorySlug} />

                <main className={styles.contentArea}>
                    <header className={styles.header}>
                        <h1 className={styles.heading}>{category.name}</h1>
                        {category.description && <p className={styles.description}>{category.description}</p>}
                    </header>

                    {products.length === 0 ? (
                        <p className={styles.emptyText}>В этой категории пока нет товаров.</p>
                    ) : (
                        <div className={styles.gridContainer}>
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} categorySlug={category.slug} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}