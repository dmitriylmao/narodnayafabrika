'use client';

import React, { useState } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './NewsForm.module.css'; 
import VacancyTable from './VacancyTable';

const createSlug = (title) => {
    const cyrillicMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z',
        'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
        'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', '_': '-',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z',
        'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
        'Ъ': '', 'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
    };

    let slug = title.toLowerCase().trim();

    slug = slug.split('').map(char => cyrillicMap[char] || char).join('');
    
    return slug
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
};

export default function VacancyForm() {
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [requirements, setRequirements] = useState('');
    const [duties, setDuties] = useState('');
    const [conditions, setConditions] = useState('');
    
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

        if (!slug) {
            setMessage('Ошибка: Невозможно создать уникальный URL. Проверьте заголовок.');
            setIsError(true);
            setLoading(false);
            return;
        }

        try {
            const vacancyData = {
                title,
                slug,
                salary,
                location,
                requirements,
                duties,
                conditions,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'vacancies'), vacancyData);

            setMessage('Вакансия успешно добавлена!');
            setIsError(false);
            
            setTitle('');
            setSalary('');
            setLocation('');
            setRequirements('');
            setDuties('');
            setConditions('');
            
            setTableRefreshKey(prevKey => prevKey + 1);

        } catch (error) {
            console.error("Ошибка при добавлении вакансии:", error);
            setMessage('Ошибка при добавлении вакансии. Проверьте консоль.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Добавить Новую Вакансию</h2>

            {message && (
                <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </div>
            )}

            <label className={styles.label}>Название Вакансии (Title)</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Например: Менеджер по продажам"
                required
            />
            
            <label className={styles.label}>Зарплата</label>
            <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={styles.input}
                placeholder="Например: от 60 000 руб. (или 'по результатам собеседования')"
                required
            />

            <label className={styles.label}>Местоположение</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                placeholder="Например: г. Москва, офис / Удаленно"
                required
            />
            
            <label className={styles.label}>Требования (Requirements)</label>
            <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Опыт работы от 1 года, знание Excel..."
                rows="5"
                required
            />

            {/* Duties */}
            <label className={styles.label}>Обязанности (Duties)</label>
            <textarea
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Создание отчетов, ведение переговоров..."
                rows="5"
                required
            />

            <label className={styles.label}>Условия (Conditions)</label>
            <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="График 5/2, ДМС, оплачиваемый отпуск..."
                rows="5"
                required
            />

            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Добавляем...' : 'Опубликовать Вакансию'}
            </button>
            
            <VacancyTable key={tableRefreshKey} /> 
            
        </form>
    );
}