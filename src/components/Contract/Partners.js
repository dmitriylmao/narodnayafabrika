import Image from 'next/image';
import styles from './Partners.module.css';

export default function Partners() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Нам доверяют ритейл-гиганты</p>
        <div className={styles.grid}>
          <div className={styles.logoItemMetro}>METRO C&C</div>
          <div className={styles.divider}></div>
          <div className={styles.logoItemX5}>X5 Retail Group</div>
          <div className={styles.divider}></div>
          <div className={styles.logoItem}>Rush Ltd.</div>
        </div>
      </div>
    </section>
  );
}