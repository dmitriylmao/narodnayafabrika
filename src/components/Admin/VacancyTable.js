'use client';

import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '@/utils/firebaseFetch';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import styles from './NewsTable.module.css'; 

const formatDate = (dateString) => {
    if (!dateString) return 'Нет даты';
    try {
        return new Date(dateString).toLocaleDateString('ru-RU', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    } catch {
        return 'Неверный формат';
    }
};

export default function VacancyTable() {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVacancies = async () => {
        setLoading(true);
        const data = await getAllDocuments('vacancies');
        setVacancies(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Вы уверены, что хотите удалить эту вакансию?')) {
            return;
        }
        try {
            await deleteDoc(doc(db, 'vacancies', id));
            alert('Вакансия успешно удалена!');
            fetchVacancies(); // Обновляем список после удаления
        } catch (error) {
            console.error("Ошибка при удалении вакансии:", error);
            alert('Ошибка при удалении. Проверьте консоль.');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Загрузка списка вакансий...</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Существующие Вакансии ({vacancies.length})</h3>
            
            {vacancies.length === 0 ? (
                <p>Пока нет опубликованных вакансий.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Название</th>
                            <th>Зарплата</th>
                            <th>SLUG (URL)</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacancies.map((vacancy) => (
                            <tr key={vacancy.id}>
                                <td className={styles.idCell}>{vacancy.id.substring(0, 7)}...</td>
                                <td>{formatDate(vacancy.createdAt)}</td>
                                <td>{vacancy.title}</td>
                                <td>{vacancy.salary}</td>
                                <td>/{vacancy.slug}</td>
                                <td className={styles.actionsCell}>
                                    <button 
                                        className={styles.deleteButton} 
                                        onClick={() => handleDelete(vacancy.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <p className={styles.instructionText}>
                *Чтобы вакансия появилась в списке, нужно ее добавить через форму выше. Обновление страницы также обновит список.
            </p>
        </div>
    );
}