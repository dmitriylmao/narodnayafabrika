// src/app/vacancies/[slug]/page.js (Исправлено)

import { notFound } from 'next/navigation';
import { getAllVacanciesSlugs, getVacancyData } from '@/utils/vacancies';
import styles from './VacancyDetailPage.module.css';
import Link from 'next/link';

const WHATSAPP_NUMBER = "79001234567";
const COMPANY_NAME = "Your Company Name";

export async function generateStaticParams() {
  const vacancyItems = getAllVacanciesSlugs();

  return vacancyItems.map((vacancy) => ({
    slug: vacancy.slug,
  }));
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const vacancy = await getVacancyData(slug);

  if (!vacancy) {
    return { title: 'Вакансия не найдена' };
  }

  return {
    title: `${vacancy.title} – Вакансии ${COMPANY_NAME}`,
    description: `Актуальная вакансия: ${vacancy.title}. Зарплата: ${vacancy.salary}. Местоположение: ${vacancy.location}. Требования и обязанности.`,
  };
}


export default async function VacancyDetailPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const slug = params.slug;

  const vacancy = await getVacancyData(slug);

  if (!vacancy) {
    notFound();
  }

  const whatsappMessage = `Здравствуйте! Я хотел(а) бы узнать подробнее о вакансии "${vacancy.title}" (slug: ${vacancy.slug}), которую нашел(ла) на вашем сайте.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={styles.wrapper}>
        <div className={styles.topSection}>
            <div className={styles.contentContainer}>
                
                <Link href="/vacancies" className={styles.backLink}>
                    <span className={styles.backArrow}>←</span> Все вакансии
                </Link>

                <div className={styles.mainGrid}>
                    
                    <div className={styles.headerColumn}>
                        <h1 className={styles.title}>
                            {vacancy.title}
                        </h1>
                        <p className={styles.salary}>
                            {vacancy.salary}
                        </p>
                        <p className={styles.location}>
                            {vacancy.location}
                        </p>
                    </div>

                    <article className={styles.articleColumn}>
                        
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Основные Обязанности</h2>
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{ __html: vacancy.dutiesHtml }}
                            />
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Требования к Кандидату</h2>
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{ __html: vacancy.requirementsHtml }}
                            />
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Условия Работы</h2>
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{ __html: vacancy.conditionsHtml }}
                            />
                        </section>

                        {/* Кнопка WhatsApp */}
                        <div className={styles.contactFooter}>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.whatsappButton}
                            >
                                Связаться через WhatsApp
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        
        {/* <div className={styles.footerInfo}>
            <div className={styles.contentContainer}>
                <p className={styles.dateInfo}>
                    Опубликовано: {vacancy.createdAt}
                </p>
            </div>
        </div> */}
    </div>
  );
}