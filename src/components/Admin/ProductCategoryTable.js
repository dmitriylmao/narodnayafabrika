'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import styles from './NewsForm.module.css'; 

export default function ProductCategoryTable({ onEdit }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const categoriesRef = collection(db, 'productCategories');
        
        
        const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
            const fetchedCategories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            fetchedCategories.sort((a, b) => (a.order || 0) - (b.order || 0));

            setCategories(fetchedCategories);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Ошибка получения категорий:", err);
            setError("Не удалось загрузить категории.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Вы уверены, что хотите удалить категорию "${name}"? Все связанные товары могут потерять свою категорию!`)) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'productCategories', id));
            alert(`Категория "${name}" успешно удалена.`);
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
            alert("Произошла ошибка при удалении категории.");
        }
    };

    if (loading) {
        return <div className={styles.loading}>Загрузка категорий...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Существующие Категории ({categories.length})</h3>
            
            {categories.length === 0 ? (
                <p className={styles.empty}>Пока нет добавленных категорий.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Slug (URL)</th>
                            <th>Порядок</th>
                            <th className={styles.actionsHeader}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td>{cat.slug}</td>
                                <td>{cat.order}</td>
                                <td className={styles.actionsCell}>
                                    <button 
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                        onClick={() => onEdit(cat)}
                                    >
                                        Редактировать
                                    </button>
                                    <button 
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(cat.id, cat.name)}
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
