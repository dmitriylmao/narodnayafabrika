'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import styles from './NewsForm.module.css'; 
import { createSlug } from '@/utils/slugUtils';

export default function ProductCategoryForm({ initialCategory, onCategorySaved }) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [order, setOrder] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const isEditing = !!initialCategory;

    useEffect(() => {
        if (initialCategory) {
            setName(initialCategory.name);
            setOrder(initialCategory.order || 0);
            setDescription(initialCategory.description || '');
            setImageUrl(initialCategory.imageUrl || '');
        } else {
            setName('');
            setOrder(0);
            setDescription('');
            setImageUrl('');
        }
        setMessage('');
        setIsError(false);
    }, [initialCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        if (!name.trim()) {
            setMessage('Ошибка: Название категории не может быть пустым.');
            setIsError(true);
            setLoading(false);
            return;
        }

        if (!imageUrl.trim()) {
            setMessage('Ошибка: Добавьте изображение категории.');
            setIsError(true);
            setLoading(false);
            return;
        }

        const slug = createSlug(name);

        try {
            const categoryData = {
                name: name.trim(),
                slug,
                order: Number(order),
                imageUrl: imageUrl.trim(),
                description: description.trim(),
                updatedAt: serverTimestamp(),
            };

            if (isEditing) {
                const categoryRef = doc(db, 'productCategories', initialCategory.id);
                await updateDoc(categoryRef, categoryData);
                setMessage(`Категория "${name}" успешно обновлена!`);
            } else {
                categoryData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'productCategories'), categoryData);
                setMessage(`Категория "${name}" успешно добавлена!`);
                setName('');
                setOrder(0);
                setDescription('');
                setImageUrl('');
            }

            if (onCategorySaved) onCategorySaved();

        } catch (error) {
            console.error("Ошибка при сохранении категории:", error);
            setMessage(`Ошибка при сохранении категории: ${error.message}`);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.formTitle}>
                {isEditing ? `Редактирование: ${initialCategory.name}` : 'Добавить Новую Категорию'}
            </h2>

            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>

                <label className={styles.label}>Название категории</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    placeholder="Освежители воздуха"
                    required
                />

                <label className={styles.label}>URL изображения (Прямая ссылка)</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={styles.input}
                    placeholder="https://i.imgur.com/example.png"
                    required
                />

                <div className={styles.instructionBox}>
                    <p className={styles.instructionTitle}>💡 Как получить URL картинки:</p>
                    <ol className={styles.instructionList}>
                        <li>Загрузите изображение на Imgur / PostImage.</li>
                        <li>Откройте картинку в новой вкладке.</li>
                        <li>Скопируйте ссылку, которая заканчивается на .jpg / .png и т.д.</li>
                    </ol>
                </div>

                <label className={styles.label}>Порядок отображения</label>
                <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className={styles.input}
                    placeholder="0"
                />

                <label className={styles.label}>Описание (SEO)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Краткое SEO-описание..."
                    rows="4"
                />

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Сохраняем...' : (isEditing ? 'Обновить' : 'Добавить') }
                </button>
            </form>
        </div>
    );
}
