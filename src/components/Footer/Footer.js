import Link from 'next/link';
import styles from './Footer.module.css';

const navLinks = [
  { href: '/about', label: 'О нас' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/contract', label: 'Контрактное производство' },
  { href: '/news', label: 'Новости' },
  { href: '/vacancies', label: 'Вакансии' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const MAP_URL = "https://yandex.ru/map-widget/v1/?um=constructor%3A92abc416a3f926a6eae1a09b4ca44c459353c79a3ed34efd31b37f87733d563a&source=constructor";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.leftSide}>
          
          <div className={styles.infoRow}>
            
            <div className={styles.navColumn}>
              <h3 className={styles.title}>Навигация</h3>
              <ul className={styles.list}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contactsColumn}>
              <h3 className={styles.title}>Контакты</h3>
              <div className={styles.contactInfo}>
                <a href="tel:+79508655519" className={styles.contactLink}>
                  +7 (950) 865-55-19
                </a>
                <a href="mailto:narodnayafabrika@mail.ru" className={styles.contactLink}>
                  narodnayafabrika@mail.ru
                </a>
                <p className={styles.address}>
                  г. Донецк, ул. Заводская, 1
                </p>
              </div>
            </div>
          </div>

          <div className={styles.bottomArea}>
            <div className={styles.divider}></div>
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                © {currentYear} ООО «Народная фабрика»
              </p>
              <Link href="/policy" className={styles.policyLink}>
                Политика конфиденциальности
              </Link>
            </div>
          </div>

        </div>

        {/* ПРАВАЯ ЧАСТЬ: Карта во всю высоту */}
        <div className={styles.mapSide}>
          <div className={styles.mapWrapper}>
            <iframe
              src={MAP_URL}
              className={styles.mapFrame}
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              title="Карта проезда"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}