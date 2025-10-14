
import Link from 'next/link';
import styles from './Footer.module.css';

const aboutLinks = [
  { href: '/about', label: 'О компании' },
  { href: '/delivery', label: 'Условия доставки', external: false }, 
  { href: '/payments', label: 'Условия оплаты', external: false }, 
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
        
        {/* Навигация и Контакты */}
        <div className={styles.topRow}>
          
          {/* О компании / Навигация */}
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
                <Link href="/contact" className={styles.navLink}>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.contactSection}>
            <h4 className={styles.navTitle}>Связь</h4>
            {contactInfo.map((item, index) => (
              <div key={index} className={styles.contactItem}>
                <p className={styles.contactText}>
                  {item.type === 'phone' && '📞 '}
                  {item.type === 'email' && '✉️ '}
                  {item.type === 'address' && '📍 '}
                  
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          
          <div className={styles.policySection}>
            <Link href="/policy" className={styles.policyLink}>
              ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
            </Link>
          </div>
        </div>
        
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {currentYear} ООО &quot;Народная фабрика&quot;. Все права защищены.
          </p>
          
          <div className={styles.paymentIcons}>
            <span>MIR</span>
          </div>

          <Link 
            href="/admin/login" 
            className={styles.adminKeyLink}
            title="Вход для администратора"
          >
            <img 
              src="/key.svg" 
              alt="Admin Login" 
              className={styles.adminKeyIcon} 
            />
          </Link>
          
        </div>
      </div>
    </footer>
  );
}