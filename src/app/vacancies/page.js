import { getAllVacanciesSlugs } from '@/utils/vacancies';
import VacancyCard from '@/components/Vacancies/VacancyCard';
import styles from './VacanciesPage.module.css';

export default async function VacanciesPage() {
  const vacancies = getAllVacanciesSlugs();
  const error = null;

  return (
    <div className={styles.wrapper}>
      
        <div className={styles.contentContainer}>
          <h1 className={styles.pageTitle}>Вакансии</h1>

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

        </div>
    </div>
  );
}