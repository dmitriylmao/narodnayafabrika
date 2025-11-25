import Link from 'next/link';
import Image from 'next/image';
import styles from './ContractHero.module.css';

export default function ContractHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <h1 className={styles.pageTitle}>
          Контрактное производство
        </h1>

        <div className={styles.heroCard}>
          <div className={styles.contentSide}>
            <h2 className={styles.cardHeadline}>
              Создайте свой бренд <br/>
              <span className={styles.fadedText}>на мощностях лидера.</span>
            </h2>
            <p className={styles.description}>
              Полный цикл производства: от разработки рецептуры в нашей лаборатории 
              до готовой партии на вашем складе. Немецкое качество Hinterkopf 
              и гарантия ISO 9001.
            </p>
            
            <div className={styles.buttonWrapper}>
              <Link href="/contact" className={styles.primaryButton}>
                Рассчитать проект
              </Link>
            </div>
          </div>

          <div className={styles.imageSide}>
            <Image 
              src="/contract-hero.webp" 
              alt="Производственная линия"
              fill
              className={styles.image}
              priority
            />
            <div className={styles.gradientOverlay}></div>
          </div>
        </div>

      </div>
    </section>
  );
}