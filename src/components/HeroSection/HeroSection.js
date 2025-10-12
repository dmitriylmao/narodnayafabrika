
import ScrollDownButton from '@/components/ScrollDownButton/ScrollDownButton'; 
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      
      <div className={styles.videoContainer}>
        
        <video 
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/video-poster.webp" 
        >
          <source src="/hero-video.webm" type="video/webm" />
          
          Ваш браузер не поддерживает видео HTML5.
        </video>
        
      </div>
      
      <div className={styles.scrollButtonWrapper}>
        <ScrollDownButton />
      </div>
      
    </section>
  );
}