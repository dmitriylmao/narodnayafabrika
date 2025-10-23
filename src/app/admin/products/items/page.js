'use client';

import React, { useState, useEffect } from 'react';
import ProductItemForm from '@/components/Admin/ProductItemForm';
import ProductItemTable from '@/components/Admin/ProductItemTable'; 
import { db } from '@/firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import styles from '@/app/admin/admin.module.css'; 

export default function AdminProductItemsPage() {
    const [products, setProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'productItems'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(fetchedProducts);
            setLoading(false);
        }, (error) => {
            console.error("Ошибка при получении товаров:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleItemSaved = () => {
        setSelectedItem(null);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className={styles.adminPageContainer}>
            <h1 className={styles.adminTitle}>Управление Товарами Продукции</h1>
            <p className={styles.adminSubtitle}>
                Здесь вы можете добавлять, редактировать и удалять конкретные товары, привязывая их к созданным Категориям.
            </p>

            <div className={styles.formSection}>
                <ProductItemForm 
                    initialItem={selectedItem} 
                    onItemSaved={handleItemSaved} 
                />
            </div>
            
            <h2 className={styles.sectionTitle}>Существующие Товары ({products.length})</h2>
            <p className={styles.sectionTip}>
                Нажмите `&quot;`Редактировать`&quot;`, чтобы изменить данные товара в форме выше.
            </p>

            {loading ? (
                <div className={styles.loadingMessage}>Загрузка товаров...</div>
            ) : products.length > 0 ? (
                <ProductItemTable 
                    products={products} 
                    onEdit={handleEdit} 
                    onCategoryChanged={handleItemSaved} 
                />
            ) : (
                <div className={styles.emptyMessage}>Пока не добавлено ни одного товара.</div>
            )}
        </div>
    );
}
