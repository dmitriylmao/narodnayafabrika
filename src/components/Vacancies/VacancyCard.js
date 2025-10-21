import Link from 'next/link';
import React from 'react';
import styles from './VacancyCard.module.css';

export default function VacancyCard({ vacancy }) {
    const { title, salary, location, slug } = vacancy;

    return (
        <div className={styles.card}>
            <Link href={`/vacancies/${slug}`} className={styles.link}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.infoRow}>
                    <p className={styles.salary}>💰 {salary}</p>
                    <p className={styles.location}>📍 {location}</p>
                </div>
                <div className={styles.detailsButton}>
                    Подробнее →
                </div>
            </Link>
        </div>
    );
}