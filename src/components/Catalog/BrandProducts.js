'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import ProductCard from './ProductCard';
import styles from './BrandProducts.module.css';

export default function BrandProductsSlider({ brandName, categoryId, currentProductId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const CARD_WIDTH = 200;
    const CARD_GAP = 16;
    const VISIBLE_COUNT = 4;
    const MAX_PRODUCTS = 10;

    useEffect(() => {
        if (!brandName || !categoryId) return;

        const brandStr = String(brandName).trim();
        const categoryStr = String(categoryId).trim();

        const fetchProducts = async () => {
            const q = query(
                collection(db, 'productItems'),
                where('brandName', '==', brandStr),
                where('categoryId', '==', categoryStr)
            );

            const unsubscribe = onSnapshot(q, async (snapshot) => {
                const fetched = await Promise.all(
                    snapshot.docs
                        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
                        .filter(p => p.id !== currentProductId)
                        .slice(0, MAX_PRODUCTS)
                        .map(async (product) => {
                            // Получаем slug категории для корректной ссылки
                            const catDoc = await getDoc(doc(db, 'productCategories', product.categoryId));
                            const categorySlug = catDoc.exists() ? catDoc.data().slug : '';
                            return { ...product, categorySlug };
                        })
                );

                setProducts(fetched);
                setLoading(false);
                setCurrentIndex(0);
            });

            return () => unsubscribe();
        };

        fetchProducts();
    }, [brandName, categoryId, currentProductId]);

    if (loading || products.length === 0) return null;

    const handlePrev = () => setCurrentIndex(prev => Math.max(prev - VISIBLE_COUNT, 0));
    const handleNext = () => setCurrentIndex(prev => Math.min(prev + VISIBLE_COUNT, Math.max(products.length - VISIBLE_COUNT, 0)));

    const transformValue = -(currentIndex * (CARD_WIDTH + CARD_GAP));
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex >= products.length - VISIBLE_COUNT;

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>🔥 Похожие товары бренда {brandName}</h3>
            <div className={styles.sliderWrapper}>
                <button className={`${styles.arrow} ${styles.left}`} onClick={handlePrev} disabled={isPrevDisabled} aria-label="Предыдущий товар">
                    &lsaquo;
                </button>
                <div className={styles.sliderClip}>
                    <div className={styles.slider} style={{ transform: `translateX(${transformValue}px)` }}>
                        {products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                categorySlug={product.categorySlug} 
                            />
                        ))}
                    </div>
                </div>
                <button className={`${styles.arrow} ${styles.right}`} onClick={handleNext} disabled={isNextDisabled} aria-label="Следующий товар">
    &rsaquo;
</button>

            </div>
        </div>
    );
}
