
import Link from 'next/link';
import Image from 'next/image'; 
import styles from '@/components/Header/Header.module.css';

const navLinks = [
  { href: '/about', label: 'О нас' },
  { href: '/products', label: 'Продукция' },
  { href: '/contract', label: 'Контрактное производство' },
  { href: '/news', label: 'Новости' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {

  const LOGO_WIDTH = 120; 
  const LOGO_HEIGHT = 120; 

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          
          <Image
            src="/logo.png"
            alt="Народная фабрика - Завод аэрозолей"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className={styles.logoImage} 
          />
          
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