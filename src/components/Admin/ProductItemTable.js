'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { doc, deleteDoc, getDoc, collection, query, onSnapshot } from 'firebase/firestore';
import styles from './NewsTable.module.css'; 
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

function CategoryName({ categoryId }) {
    const [categoryName, setCategoryName] = useState('Загрузка...');

    useEffect(() => {
        if (!categoryId) {
            setCategoryName('Нет категории');
            return;
        }


        const fetchCategory = async () => {
            try {
                const docRef = doc(db, 'productCategories', categoryId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCategoryName(docSnap.data().name);
                } else {
                    setCategoryName('Категория удалена');
                }
            } catch (error) {
                console.error("Ошибка при получении категории:", error);
                setCategoryName('Ошибка загрузки');
            }
        };

        fetchCategory();
        

    }, [categoryId]);

    return <span>{categoryName}</span>;
}

export default function ProductItemTable({ products, onEdit, onCategoryChanged }) {
    const [deleting, setDeleting] = useState(null); // ID удаляемого элемента
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const handleDelete = async (id, name) => {
        if (!window.confirm(`Вы уверены, что хотите удалить товар "${name}"? Это действие необратимо.`)) {
            return;
        }

        setDeleting(id);
        setMessage('');
        setIsError(false);

        try {
            const itemRef = doc(db, 'productItems', id);
            await deleteDoc(itemRef);
            setMessage(`Товар "${name}" успешно удален.`);
            setIsError(false);
            if (onCategoryChanged) onCategoryChanged(); 
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
            setMessage(`Ошибка при удалении товара: ${error.message}`);
            setIsError(true);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className={styles.tableContainer}>
            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        {/* Изменены заголовки для отображения основных полей */}
                        <th>Товар (Бренд / Название / Вкус)</th>
                        <th>Категория</th>
                        <th>Объем</th> 
                        <th>Обновлено</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id} className={deleting === item.id ? styles.deletingRow : ''}>
                            {/* Отображение комбинированных данных о товаре */}
                            <td data-label="Товар">
                                <strong>{item.brandName || 'N/A'}</strong><br />
                                <span style={{ fontSize: '0.9em' }}>{item.baseProductName || ''}</span>
                                {item.assortmentName && <span style={{ fontSize: '0.9em', color: '#666' }}> ({item.assortmentName})</span>}
                            </td>
                            {/* Категория */}
                            <td data-label="Категория">
                                <CategoryName categoryId={item.categoryId} />
                            </td>
                            {/* Объем/Размер */}
                            <td data-label="Объем">
                                {item.packSize || 'Не указан'}
                            </td>
                            {/* Обновлено */}
                            <td data-label="Обновлено">
                                {item.updatedAt?.toDate ? format(item.updatedAt.toDate(), 'dd.MM.yyyy HH:mm', { locale: ru }) : 'N/A'}
                            </td>
                            {/* Действия */}
                            <td data-label="Действия" className={styles.actions}>
                                <button 
                                    className={`${styles.actionButton} ${styles.editButton}`}
                                    onClick={() => onEdit(item)}
                                    disabled={deleting === item.id}
                                >
                                    Редактировать
                                </button>
                                <button 
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(item.id, item.name)}
                                    disabled={deleting === item.id}
                                >
                                    {deleting === item.id ? 'Удаление...' : 'Удалить'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
