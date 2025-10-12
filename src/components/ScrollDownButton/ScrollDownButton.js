'use client'; 

import styles from './ScrollDownButton.module.css';

export default function ScrollDownButton() {
  const handleScroll = () => {
    const targetElement = document.getElementById('main-content');
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
  };

  return (
    <button className={styles.scrollButton} onClick={handleScroll}>
      <span className={styles.chevron}></span> 
    </button>
  );
}