'use client';

import React, { useState } from 'react';
import styles from './NewsForm.module.css';
import NewsTable from './NewsTable'; 

const createSlug = (title) => {
    return title.toLowerCase()
        .trim()
        .replace(/[а-яё]/g, (c) => {
            const map = {
                'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z',
                'и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
                'с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch',
                'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
            };
            return map[c] || c;
        })
        .replace(/[\s_-]+/g, '-')
        .replace(/[^\w-]/g, '');
};

export default function NewsForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
        if (!title || !content || !slug) {
            setMessage('Заполните заголовок и текст новости');
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, imageUrl, slug })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Новость успешно добавлена!');
                setTitle('');
                setContent('');
                setImageUrl('');
                setTableRefreshKey(prev => prev + 1);
            } else {
                setMessage(data.error || 'Ошибка при добавлении новости');
                setIsError(true);
            }
        } catch (err) {
            console.error(err);
            setMessage('Ошибка при добавлении новости');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Добавить Новую Новость</h2>

                {message && (
                    <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                        {message}
                    </div>
                )}

                <label className={styles.label}>Заголовок</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />

                <label className={styles.label}>URL изображения</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={styles.input}
                />

                <label className={styles.label}>Содержание</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`${styles.input} ${styles.textarea}`}
                    rows={6}
                    required
                />

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Добавляем...' : 'Опубликовать Новость'}
                </button>
            </form>

            <NewsTable key={tableRefreshKey} refreshKey={tableRefreshKey} />
        </div>
    );
}
