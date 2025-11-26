
import Link from 'next/link';
import styles from './IntroSection.module.css';

export default function IntroSection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.intro}>
        
        <div className={styles.leftColumn}>
          <h2 className={styles.mainTitle}>
            Народная<br/>фабрика
          </h2>
        </div>

        <div className={styles.rightColumn}>
          
          <p className={styles.description}>
            Производство аэрозольных баллонов и готовой продукции.
            Собственная линейка и контрактное производство.
          </p>
          
          <Link href="/about" className={styles.aboutButton}>
            О нас
          </Link>
          
        </div>
      </div>
    </section>
  );
}