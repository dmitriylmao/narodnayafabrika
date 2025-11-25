'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight; 
      const videoHeight = videoRef.current.offsetHeight;    
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + containerHeight);

        const parallaxStrength = 0.8; 

        const maxScrollRange = videoHeight - containerHeight;
        
        const yOffset = maxScrollRange * scrollProgress * parallaxStrength;

        videoRef.current.style.transform = `translate3d(0, ${-yOffset}px, 0)`;
      }
    };

    const animate = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', animate);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', animate);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); 

  return (
    <section className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        <video 
          ref={videoRef}
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
    </section>
  );
}