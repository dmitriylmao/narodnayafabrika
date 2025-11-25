import Image from 'next/image';
import styles from './TechBento.module.css';

export default function TechBento() {
  const printColors = [
    '#ff0000ff', // Cyan
    '#ff8800ff', // Magenta
    '#ffff00ff', // Yellow
    '#006905ff', // Key
    '#00ff88ff', // Silver
    '#00b7ffff', // Gold
    '#4c00ffff', // Pantone Red
    '#b81effff', // Pantone Blue
    '#ff00b3ff', // Pantone Green
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Технологический фундамент</h2>
      
      <div className={styles.grid}>
        
        <div className={styles.cardMain}>
          <div className={styles.bgImage}>
            <Image 
              src="/bento.webp" 
              alt="Hinterkopf" 
              fill 
              className={styles.img}
            />
            <div className={styles.darkOverlay} />
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.badge}>Made in Germany</div>
            <h3>Hinterkopf H240</h3>
            <p className={styles.revealText}>
              Флагманская линия. Полная автоматизация, высочайшая точность 
              и производительность до 240 баллонов в минуту.
            </p>
          </div>
        </div>

        <a href="/presentation.pdf" download="Контрактное производство.pdf" className={styles.cardPdf}>
          <div className={styles.pdfContent}>
            <div className={styles.iconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3>Скачать<br/>презентацию</h3>
          </div>
          <div className={styles.pdfHoverBg} />
        </a>

        <div className={styles.cardPrint}>
          <div className={styles.defaultState}>
            <h3>9-цветная печать</h3>
            <p>Фотографическое качество</p>
          </div>
          
          <div className={styles.hoverState}>
            <div className={styles.paletteGrid}>
              {printColors.map((color, idx) => (
                <div 
                  key={idx} 
                  className={styles.colorDot} 
                  style={{ backgroundColor: color, transitionDelay: `${idx * 0.05}s` }}
                />
              ))}
            </div>
            <p className={styles.hoverText}>
              Сложные градиенты, матовый лак, металлик и Soft-touch покрытия.
            </p>
          </div>
        </div>

        <div className={styles.cardShape}>
          <div className={styles.shapeVisual}>
            <div className={styles.canShape} />
          </div>
          <div className={styles.cardContentBottom}>
            <h3>Шейпинг</h3>
            <p className={styles.revealText}>
              Придание баллону уникальной рельефной формы для выделения на полке.
            </p>
          </div>
        </div>

        <div className={styles.cardCoatings}>
          <div className={styles.cardContent}>
            <h4 className={styles.typesPOKRITIE}>Типы покрытий</h4>
            <div className={styles.coatingsList}>
              <div className={styles.coatingItem}>
                <span>Внутренние</span>
                <p>Эпоксидные / Порошковые</p>
              </div>
              <div className={styles.divider} />
              <div className={styles.coatingItem}>
                <span>Внешние</span>
                <p>Глянцевые / Матовые / Перламутр</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}