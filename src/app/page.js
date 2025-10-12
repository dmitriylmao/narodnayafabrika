
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection/HeroSection'; 

export default function HomePage() {
  return (
    <> 
      <HeroSection /> 
      
      <div className={styles.pageWrapper} id="main-content"> 
        <h2>Контент после Hero</h2>
        <p>Текст для скролла.</p>
      </div>
    </>
  );
}