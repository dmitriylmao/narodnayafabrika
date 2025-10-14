
'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { getAllDocuments } from '@/utils/firebaseFetch'; 
import { doc, deleteDoc } from 'firebase/firestore'; 
import styles from './NewsTable.module.css';

const formatDate = (dateString) => {
    if (!dateString) return 'Дата не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
    });
};

export default function NewsTable({ refreshKey }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await getAllDocuments('news');
            setNews(data);
            setMessage('');
        } catch (error) {
            console.error("Ошибка загрузки новостей:", error);
            setMessage('Ошибка при загрузке новостей.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [refreshKey]); 

    const handleDelete = async (id) => {
        if (!confirm('Вы уверены, что хотите удалить эту новость? Это действие необратимо.')) {
            return;
        }

        try {
            const docRef = doc(db, 'news', id);
            
            await deleteDoc(docRef);

            setNews(prevNews => prevNews.filter(item => item.id !== id));
            setMessage(`Новость (ID: ${id}) успешно удалена!`);
            setIsError(false);
            
        } catch (error) {
            console.error("Ошибка удаления новости:", error);
            setMessage('Ошибка при удалении новости. Проверьте консоль.');
            setIsError(true);
        }
    };
    
    if (loading) {
        return <div className={styles.tableContainer}>Загрузка списка новостей...</div>;
    }

    if (isError) {
        return <div className={styles.tableContainer} style={{color: 'red'}}>{message}</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Существующие Новости ({news.length})</h3>

            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}

            {news.length === 0 ? (
                <p>Нет опубликованных новостей.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Дата</th>
                            <th className={styles.th}>Заголовок</th>
                            <th className={styles.th}>Slug (URL)</th>
                            <th className={styles.th}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item) => (
                            <tr key={item.id} className={styles.tr}>
                                <td className={styles.tdId}>{item.id.substring(0, 6)}...</td>
                                <td className={styles.td}>{formatDate(item.createdAt)}</td>
                                <td className={styles.td}>{item.title}</td>
                                <td className={styles.tdSlug}>/{item.slug}</td>
                                <td className={styles.tdActions}>
                                    <button 
                                        className={`${styles.button} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(item.id)}
                                        title="Удалить новость"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}