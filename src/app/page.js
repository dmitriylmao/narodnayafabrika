
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import IntroSection from '@/components/IntroSection/IntroSection'; 

export default function HomePage() {
  return (
    <> 
      <HeroSection /> 
      
      <div className={styles.pageWrapper} id="main-content"> 
        <IntroSection />
      </div>
    </>
  );
}