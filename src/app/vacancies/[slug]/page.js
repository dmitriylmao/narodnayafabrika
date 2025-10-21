import React from 'react';
import { notFound } from 'next/navigation';
import { getDocumentBySlug } from '@/utils/firebaseFetch';
import styles from './VacancyDetailPage.module.css';

const WHATSAPP_NUMBER = "79001234567"; 
const COMPANY_NAME = "Your Company Name"; 

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const vacancy = await getDocumentBySlug('vacancies', slug);

    if (!vacancy) {
        return {
            title: 'Вакансия не найдена',
        };
    }

    return {
        title: `${vacancy.title} – Вакансии ${COMPANY_NAME}`,
        description: `Актуальная вакансия: ${vacancy.title}. Зарплата: ${vacancy.salary}. Местоположение: ${vacancy.location}. Требования и обязанности.`,
    };
}


export default async function VacancyDetailPage({ params }) {
    const slug = params.slug;
    const vacancy = await getDocumentBySlug('vacancies', slug);

    if (!vacancy) {
        notFound();
    }
    
    const whatsappMessage = `Здравствуйте! Я хотел(а) бы узнать подробнее о вакансии "${vacancy.title}" (slug: ${vacancy.slug}), которую нашел(ла) на вашем сайте.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;


    const formatText = (text) => {
        if (!text) return <p>Информация отсутствует.</p>;
        
        const lines = text.split('\n').filter(line => line.trim() !== '');

        if (lines.length > 1 && lines.every(line => line.startsWith('-') || line.startsWith('*'))) {
            return (
                <ul className={styles.list}>
                    {lines.map((line, index) => (
                        <li key={index}>{line.replace(/^[-*]\s*/, '').trim()}</li>
                    ))}
                </ul>
            );
        }

        return lines.map((line, index) => (
            <p key={index} className={styles.paragraph}>{line}</p>
        ));
    };


    return (
        <div className={styles.container}>
            <article className={styles.vacancy}>
                <h1 className={styles.title}>{vacancy.title}</h1>
                
                <div className={styles.headerInfo}>
                    <span className={styles.salary}>💰 {vacancy.salary}</span>
                    <span className={styles.location}>📍 {vacancy.location}</span>
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Основные Обязанности</h2>
                    <div className={styles.content}>
                        {formatText(vacancy.duties)}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Требования к Кандидату</h2>
                    <div className={styles.content}>
                        {formatText(vacancy.requirements)}
                    </div>
                </section>
                
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Условия Работы</h2>
                    <div className={styles.content}>
                        {formatText(vacancy.conditions)}
                    </div>
                </section>

                <div className={styles.contactFooter}>
                    <h3 className={styles.contactTitle}>Заинтересованы?</h3>
                    <p className={styles.contactText}>
                        Нажмите кнопку ниже, чтобы связаться с нашим HR-отделом
                        через WhatsApp и задать вопросы по вакансии.
                    </p>
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.whatsappButton}
                    >
                        Связаться через WhatsApp
                    </a>
                </div>
                
                <p className={styles.dateInfo}>
                    Опубликовано: {new Date(vacancy.createdAt).toLocaleDateString('ru-RU')}
                </p>
            </article>
        </div>
    );
}
