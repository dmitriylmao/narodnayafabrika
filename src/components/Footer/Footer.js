// src/components/Footer/Footer.js
// Server Component (по умолчанию)

import Link from 'next/link';
import styles from './Footer.module.css';

// Данные для колонок навигации
const aboutLinks = [
  { href: '/about', label: 'О компании' },
  { href: '/delivery', label: 'Условия доставки', external: false }, // Предполагаем новую страницу
  { href: '/payments', label: 'Условия оплаты', external: false }, // Предполагаем новую страницу
];

const contactInfo = [
  { type: 'phone', value: '+7 (383) 300-23-00' },
  { type: 'email', value: 'sales@narodfabrika.ru' },
  { type: 'address', value: 'г. Аэрозольск, ул. Заводская, 1' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* === БЛОК 1: Навигация и Контакты === */}
        <div className={styles.topRow}>
          
          {/* 1. Колонка О компании / Навигация */}
          <div className={styles.navSection}>
            <h4 className={styles.navTitle}>Информация</h4>
            <ul className={styles.navList}>
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                {/* Ссылка на существующую страницу Контакты */}
                <Link href="/contact" className={styles.navLink}>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Колонка Контакты */}
          <div className={styles.contactSection}>
            <h4 className={styles.navTitle}>Связь</h4>
            {contactInfo.map((item, index) => (
              <div key={index} className={styles.contactItem}>
                <p className={styles.contactText}>
                  {/* Простая заглушка для иконок */}
                  {item.type === 'phone' && '📞 '}
                  {item.type === 'email' && '✉️ '}
                  {item.type === 'address' && '📍 '}
                  
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          
          {/* 3. Политика Конфиденциальности */}
          <div className={styles.policySection}>
            <Link href="/policy" className={styles.policyLink}>
              ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
            </Link>
          </div>
        </div>
        
        {/* === БЛОК 2: Копирайт и Иконки === */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {currentYear} ООО "Народная фабрика". Все права защищены.
          </p>
          
          {/* Заглушка для иконок платежных систем */}
          <div className={styles.paymentIcons}>
            {/* В реальном проекте здесь были бы SVG/PNG иконки */}
            <span>VISA</span>
            <span>MasterCard</span>
            <span>MIR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}