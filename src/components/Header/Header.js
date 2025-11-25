'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navLinks = [
  { href: '/about', label: 'О нас' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/contract', label: 'Контрактное производство' },
  { href: '/news', label: 'Новости' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/contact', label: 'Контакты' },
];

// 3. Список страниц, где фон БЕЛЫЙ (а значит хедер должен быть темным/синим)
// Все остальные страницы по умолчанию будут считаться СИНИМИ.
const WHITE_BACKGROUND_PATHS = ['/about', '/' ,'/policy' , '/contract']; 

export default function Header() {
  const pathname = usePathname();
  const isCatalogPath = pathname === '/catalog' || pathname.startsWith('/catalog/');

  const isWhiteBg = WHITE_BACKGROUND_PATHS.includes(pathname) || isCatalogPath;;

  const LOGO_WIDTH = 100;
  const LOGO_HEIGHT = 100;

  return (
    <header className={`${styles.header} ${isWhiteBg ? styles.themeWhite : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src={isWhiteBg ? "/logo-blue.png" : "/logo-white.png"} 
            alt="Народная фабрика - Завод аэрозолей"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className={styles.logoImage}
            priority 
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