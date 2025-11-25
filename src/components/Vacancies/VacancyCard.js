import Link from 'next/link';
import React from 'react';
import styles from './VacancyCard.module.css';

export default function VacancyCard({ vacancy }) {
    const { title, salary, location, slug, createdAt } = vacancy;

    return (
        <div className={styles.card}>
            <Link href={`/vacancies/${slug}`} className={styles.link}>
                <div className={styles.UpperCard}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.salary}>{salary}</p>
                </div>

                 <div className={styles.DownCard}>
                    <p className={styles.location}>{location}</p>
                
                    <div className={styles.footerRow}>
                        <div className={styles.detailsButton}>
                            Подробнее
                        </div>
                        <p className={styles.date}>{createdAt}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}