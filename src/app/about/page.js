import Image from "next/image";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        
        <h1 className={styles.pageTitle}>О нас</h1>

        <section className={styles.heroSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="/about-hero.webp"
              alt="Цех Народная фабрика"
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroOverlay}>
              <h2 className={styles.heroTitle}>ООО «НАРОДНАЯ ФАБРИКА»</h2>
              <p className={styles.heroText}>
                — одно из ведущих предприятий на территории Донецкой Народной Республики, 
                специализирующееся на полном цикле производства аэрозольной продукции и 
                изготовлении высококачественной алюминиевой упаковки. Мы реализуем широкий 
                ассортимент аэрозольных средств бытового, технического и 
                парфюмерно-косметического назначения, являясь надежным партнером 
                для популярных торговых марок России.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoLabel}>
              <h3>Технологическое превосходство</h3>
            </div>
            <div className={styles.infoContent}>
              <p>
                Современнейшая линия Hinterkopf H240. Наше производство основано на передовых европейских технологиях. 
                Для изготовления алюминиевого баллона используется современная линия H240 от признанного мирового лидера 
                Hinterkopf GmbH (Германия). Это оборудование позволяет нам обеспечивать полный, замкнутый цикл производства 
                упаковки, гарантируя безупречное качество на выходе.
              </p>
              <p className={styles.subHeader}>Возможности упаковки:</p>
              <ul className={styles.list}>
                <li>9-цветная офсетная печать фотографического качества.</li>
                <li>Шейпинг (придание баллонам различных форм).</li>
                <li>Нанесение эпоксидного и порошкового внутреннего покрытия.</li>
              </ul>
            </div>
          </div>

          <hr className={styles.separator} />
          
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoLabel}>
              <h3>Система контроля качества</h3>
            </div>
            <div className={styles.infoContent}>
              <p>
                Безупречное качество по стандарту ISO. Контроль осуществляется на каждой стадии производственного процесса 
                в соответствии с международным стандартом ISO 9001-2008. Вся выпускаемая продукция соответствует необходимым 
                технологическим нормам, ГОСТам и международным стандартам.
              </p>
              <p>
                Гарантия герметичности: Линия оборудована новейшими системами контроля: две системы электронного зрения 
                проверяют качество печати и формирования горлышка, а система контроля микроутечек гарантирует стопроцентную 
                герметичность каждого баллона.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}