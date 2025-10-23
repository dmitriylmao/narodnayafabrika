'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp, doc, updateDoc, query, onSnapshot } from 'firebase/firestore';
import styles from './NewsForm.module.css'; 
import { createSlug } from '@/utils/slugUtils'; 

export default function ProductItemForm({ initialItem, onItemSaved }) {
    const [name, setName] = useState(initialItem?.name || ''); 
    const [brandName, setBrandName] = useState(initialItem?.brandName || '');
    const [baseProductName, setBaseProductName] = useState(initialItem?.baseProductName || '');
    const [assortmentName, setAssortmentName] = useState(initialItem?.assortmentName || '');
    const [packSize, setPackSize] = useState(initialItem?.packSize || '');
    
    // Существующие поля
    const [imageUrl, setImageUrl] = useState(initialItem?.imageUrl || '');
    const [description, setDescription] = useState(initialItem?.description || '');
    const [categoryId, setCategoryId] = useState(initialItem?.categoryId || ''); 
    
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const isEditing = !!initialItem;

    useEffect(() => {
        const q = query(collection(db, 'productCategories'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedCategories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            fetchedCategories.sort((a, b) => (a.order || 0) - (b.order || 0)); 
            setCategories(fetchedCategories);
            
            if (!isEditing && fetchedCategories.length > 0) {
                if (!categoryId) { 
                    setCategoryId(fetchedCategories[0].id);
                }
            }
        }, (error) => {
            console.error("Ошибка загрузки категорий:", error);
            setMessage("Не удалось загрузить список категорий.");
            setIsError(true);
        });

        return () => unsubscribe();
    }, [isEditing, categoryId]);
    
    useEffect(() => {
        if (initialItem) {
            // Загрузка новых полей
            setName(initialItem.name || '');
            setBrandName(initialItem.brandName || '');
            setBaseProductName(initialItem.baseProductName || '');
            setAssortmentName(initialItem.assortmentName || '');
            setPackSize(initialItem.packSize || '');

            setImageUrl(initialItem.imageUrl || '');
            setDescription(initialItem.description || '');
            setCategoryId(initialItem.categoryId || '');
        } else {
            setName('');
            setBrandName('');
            setBaseProductName('');
            setAssortmentName('');
            setPackSize('');

            setImageUrl('');
            setDescription('');
            
        }
        setMessage('');
        setIsError(false);
    }, [initialItem]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        if (!name.trim() || !categoryId || !brandName.trim() || !baseProductName.trim()) {
            setMessage('Ошибка: Название (обязательно), Бренд, Основное Название и Категория обязательны.');
            setIsError(true);
            setLoading(false);
            return;
        }


        const fullProductName = `${brandName.trim()} ${baseProductName.trim()} ${assortmentName.trim()}`.trim();
        const slug = createSlug(fullProductName);
        
        

        try {
            const itemData = {
                name: name.trim(), 
                brandName: brandName.trim(), 
                baseProductName: baseProductName.trim(), 
                assortmentName: assortmentName.trim(), 
                packSize: packSize.trim(), 
                
                slug: slug,
                imageUrl: imageUrl.trim(),
                description: description.trim(),
                categoryId: categoryId, 
                updatedAt: serverTimestamp(),
            };

            if (isEditing) {
                const itemRef = doc(db, 'productItems', initialItem.id);
                await updateDoc(itemRef, itemData);
                setMessage(`Товар "${name}" успешно обновлен!`);
            } else {
                itemData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'productItems'), itemData);
                setMessage(`Товар "${name}" успешно добавлен!`);
                
                
                setName('');
                setBrandName('');
                setBaseProductName('');
                setAssortmentName('');
                setPackSize('');
                setImageUrl('');
                setDescription('');
                
            }
            
            setIsError(false);
            if (onItemSaved) onItemSaved(); 

        } catch (error) {
            console.error("Ошибка при сохранении товара:", error);
            setMessage(`Ошибка при сохранении товара: ${error.message}`);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.formTitle}>
                {isEditing ? `Редактирование: ${initialItem.name}` : 'Добавить Новый Товар'}
            </h2>

            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Название Товара (Общее)</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        placeholder="Например: Освежитель воздуха 'Лимон' (Обязательно)"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Название Бренда (brandName)</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className={styles.input}
                        placeholder="Например: Fly или KLIK (Обязательно)"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Основное Название Продукта (baseProductName)</label>
                    <input
                        type="text"
                        value={baseProductName}
                        onChange={(e) => setBaseProductName(e.target.value)}
                        className={styles.input}
                        placeholder="Например: Освежитель воздуха (Обязательно)"
                        required
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Конкретный Вкус/Тип (assortmentName)</label>
                    <input
                        type="text"
                        value={assortmentName}
                        onChange={(e) => setAssortmentName(e.target.value)}
                        className={styles.input}
                        placeholder="Например: Морская фантазия или Антитабак"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Объем/Размер (packSize)</label>
                    <input
                        type="text"
                        value={packSize}
                        onChange={(e) => setPackSize(e.target.value)}
                        className={styles.input}
                        placeholder="Например: 300 мл, 500г, 6 шт."
                    />
                    <div className={styles.instructionBox}>
                        <p className={styles.instructionTip}>
                            Это поле будет использоваться для отображения размера упаковки.
                        </p>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Изображения</label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className={styles.input}
                        placeholder="https://example.com/image.jpg"
                    />
                    <div className={styles.instructionBox}>
                        <p className={styles.instructionTip}>
                            Используйте **прямую ссылку** на изображение (с окончанием .jpg, .png и т.п.).
                        </p>
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Категория Товара (categoryId)</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className={styles.select}
                        required
                        disabled={categories.length === 0 && !loading}
                    >
                        {categories.length === 0 ? (
                            <option value="">Загрузка категорий...</option>
                        ) : (
                            categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    [{cat.order}] {cat.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Описание Товара</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder="Общее описание для этой линейки/бренда..."
                        rows="6"
                    />
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Сохраняем...' : (isEditing ? 'Обновить Товар' : 'Добавить Товар')}
                </button>
            </form>
        </div>
    );
}
