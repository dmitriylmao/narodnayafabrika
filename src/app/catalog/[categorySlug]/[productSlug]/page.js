'use client';

import React, { useState, useEffect } from 'react';
import BrandProducts from '@/components/Catalog/BrandProducts';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import styles from './page.module.css';

export default function ProductPage() {
    const { categorySlug, productSlug } = useParams();

    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categorySlug || !productSlug) return;

        const fetchData = async () => {
            try {
                const qCat = query(collection(db, 'productCategories'));
                const catSnapshot = await getDocs(qCat);
                const matchedCategory = catSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .find(cat => cat.slug === categorySlug);

                if (!matchedCategory) {
                    setError('Категория не найдена');
                    setLoading(false);
                    return;
                }

                setCategory(matchedCategory);

                const qProd = query(
                    collection(db, 'productItems'),
                    where('categoryId', '==', matchedCategory.id)
                );

                const unsubscribe = onSnapshot(qProd, (snap) => {
                    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    const matchedProduct = items.find(p => p.slug === productSlug);

                    if (!matchedProduct) {
                        setError('Товар не найден');
                        setLoading(false);
                        return;
                    }

                    setProduct(matchedProduct);
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке данных');
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug, productSlug]);

    if (loading) return <div className={styles.pageContainer}><p>Загрузка...</p></div>;
    if (error) return <div className={styles.pageContainer}><p className={styles.error}>{error}</p></div>;

    const whatsappNumber = '79991234567';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <div className={styles.pageContainer}>

            <Breadcrumbs 
    categoryName={category?.name} 
    categorySlug={category?.slug} 
    productName={product?.baseProductName} 
    productSlug={product?.slug} 
/>


            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={product.imageUrl || 'https://placehold.co/400x400/f3f4f6/a3a3a3?text=Нет+Фото'}
                        alt={product.name}
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.infoContainer}>
                    <h2 className={styles.brand}>{product.brandName}</h2>
                    <h1 className={styles.title}>
                        {product.baseProductName} {product.assortmentName && `- ${product.assortmentName}`}
                    </h1>
                    {product.packSize && <p className={styles.packSize}>{product.packSize}</p>}

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                        Связаться
                    </a>
                </div>
            </div>

            {product.description && (
                <div className={styles.descriptionContainer}>
                    <h3>Описание</h3>
                    <p>{product.description}</p>
                </div>
            )}

            <BrandProducts 
                brandName={product.brandName} 
                categoryId={product.categoryId}
                currentProductId={product.id} 
            />

        </div>
    );
}
