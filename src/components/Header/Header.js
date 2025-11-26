'use client'; 

import { useState, useEffect } from 'react'; 
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

const WHITE_BACKGROUND_PATHS = ['/about', '/' ,'/policy' , '/contract']; 

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false); 

  const isCatalogPath = pathname === '/catalog' || pathname.startsWith('/catalog/');
  const isWhiteBg = WHITE_BACKGROUND_PATHS.includes(pathname) || isCatalogPath;

  const LOGO_WIDTH = 100;
  const LOGO_HEIGHT = 100;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${isWhiteBg ? styles.themeWhite : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src={isWhiteBg ? "/logo-blue.png" : "/logo-white.png"} 
            alt="Народная фабрика - Завод аэрозолей"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className={styles.logoImage}
            priority 
          />
        </Link>

        <button 
          className={styles.burgerBtn} 
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link 
                  href={link.href} 
                  className={styles.navLink}
                  onClick={closeMenu} 
                >
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