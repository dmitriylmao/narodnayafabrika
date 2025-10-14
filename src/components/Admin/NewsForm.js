
'use client';

import React, { useState } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './NewsForm.module.css';
import NewsTable from './NewsTable'; 

const createSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
};

export default function NewsForm() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    
    const [tableRefreshKey, setTableRefreshKey] = useState(0); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        const slug = createSlug(title);

        try {
            const newsData = {
                title,
                slug,
                imageUrl,
                content,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'news'), newsData);

            setMessage('Новость успешно добавлена!');
            setIsError(false);
            
            setTitle('');
            setImageUrl('');
            setContent('');
            
            setTableRefreshKey(prevKey => prevKey + 1);

        } catch (error) {
            console.error("Ошибка при добавлении новости:", error);
            setMessage('Ошибка при добавлении новости. Проверьте консоль.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Добавить Новую Новость</h2>

            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}

            <label className={styles.label}>Заголовок (Title)</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Например: Крупный заказ от зарубежных инвесторов"
                required
            />

            <label className={styles.label}>URL изображения (Прямая ссылка)</label>
            <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={styles.input}
                placeholder="Например: https://i.imgur.com/image.jpg"
                required
            />
            
            <div className={styles.instructionBox}>
                <p className={styles.instructionTitle}>
                    💡 Как получить URL картинки:
                </p>
                <ol className={styles.instructionList}>
                    <li>Загрузите ваше изображение на бесплатный хостинг (например, **PostImage** или **Imgur**).</li>
                    <li>**Обязательно: Откройте загруженную картинку в новой вкладке браузера.**</li>
                    <li>Скопируйте URL из адресной строки. **Ссылка должна заканчиваться на расширение файла: .jpg, .png и т.д.**</li>
                </ol>
                <p className={styles.instructionTip}>
                    *Ссылки на Google Drive или страницы предпросмотра не работают, используйте только прямые URL.*
                </p>
            </div>

            <label className={styles.label}>Содержимое (Content)</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Полный текст новости . . ."
                rows="10"
                required
            />

            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Добавляем...' : 'Опубликовать Новость'}
            </button>
            
            <NewsTable key={tableRefreshKey} /> 
            
        </form>
    );
}