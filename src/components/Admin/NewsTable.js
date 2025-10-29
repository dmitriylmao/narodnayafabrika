'use client';

import React, { useEffect, useState } from 'react';
import styles from './NewsTable.module.css';

export default function NewsTable({ refreshKey }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            if (res.ok || Array.isArray(data)) {
                setNews(data);
                setMessage('');
                setIsError(false);
            } else {
                setMessage(data.error || 'Ошибка при загрузке новостей');
                setIsError(true);
            }
        } catch (err) {
            console.error(err);
            setMessage('Ошибка при загрузке новостей');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [refreshKey]);

    const handleDelete = async (id) => {
        if (!confirm('Удалить новость?')) return;

        try {
            const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setNews(prev => prev.filter(item => item.id !== id));
            } else {
                const data = await res.json();
                setMessage(data.error || 'Ошибка при удалении новости');
                setIsError(true);
            }
        } catch (err) {
            console.error(err);
            setMessage('Ошибка при удалении новости');
            setIsError(true);
        }
    };

    if (loading) return <p>Загрузка новостей...</p>;

    return (
        <div className={styles.tableContainer}>
            {message && <div className={isError ? styles.error : styles.success}>{message}</div>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Заголовок</th>
                        <th>Slug</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
                            <td>{item.title}</td>
                            <td>{item.slug}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
