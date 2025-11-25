
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import IntroSection from '@/components/IntroSection/IntroSection'; 
import ServiceBlocks from '@/components/ServiceBlocks/ServiceBlocks'; 
import NewsHomeSection from '@/components/News/NewsHomeSection';

export default function HomePage() {
  return (
    <> 
      <div className={styles.pageWrapper} id="main-content"> 
        <IntroSection />
        <ServiceBlocks />
        <HeroSection/>
        <NewsHomeSection />
      </div>
    </>
  );
}