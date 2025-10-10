
import Link from 'next/link';
import styles from '@/components/Header/Header.module.css';

const navLinks = [
  { href: '/about', label: 'О нас' },
  { href: '/products', label: 'Продукция' },
  { href: '/contract', label: 'Контрактное производство' },
  { href: '/news', label: 'Новости' },
  { href: '/job', label: 'Вакансии' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Народная фабрика
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}