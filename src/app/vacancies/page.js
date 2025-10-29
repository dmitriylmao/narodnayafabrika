import { getAllVacanciesSlugs } from '@/utils/vacancies';
import VacancyCard from '@/components/Vacancies/VacancyCard';
import styles from './VacanciesPage.module.css';

export default async function VacanciesPage() {
  const vacancies = getAllVacanciesSlugs();
  const error = null;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Актуальные Вакансии</h1>
      <p className={styles.subtitle}>
        Присоединяйтесь к нашей команде! Мы ищем талантливых специалистов.
      </p>

      {error && <div className={styles.error}>{error}</div>}

      {!error && vacancies.length === 0 ? (
        <div className={styles.emptyState}>
          <p>На данный момент активных вакансий нет.</p>
          <p>Проверьте позже или свяжитесь с нами напрямую.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.slug} vacancy={vacancy} />
          ))}
        </div>
      )}

      <section className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Не нашли подходящей?</h2>
        <p className={styles.contactText}>
          Вы всегда можете отправить свое резюме нам на почту, и мы рассмотрим вашу кандидатуру.
        </p>
        <a
          href="mailto:hr@yourcompany.com"
          className={styles.contactButton}
        >
          Отправить резюме
        </a>
      </section>
    </div>
  );
}
