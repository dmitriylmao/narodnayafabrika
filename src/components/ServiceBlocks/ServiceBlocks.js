'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import styles from './ServiceBlocks.module.css';

const blocksData = [
  {
    title: 'Собственная продукция',
    text: 'Мы производим аэрозольную продукцию под брендом «Народная фабрика» — косметические, бытовые и технические средства. В основе — надёжное сырьё, современное оборудование и контроль качества на каждом этапе.',
    link: '/catalog',
    buttonText: 'Подробнее',
  },
  {
    title: 'Контрактное производство',
    text: 'Выполняем полный цикл контрактного производства аэрозольной продукции — от разработки формулы до упаковки. Предлагаем готовые решения для брендов, которым важна стабильность и технологичность.',
    link: '/contract',
    buttonText: 'Подробнее',
  },
];

export default function ServiceBlocks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        
        <div 
          className={styles.slidingPanel} 
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />

        {blocksData.map((block, index) => {
          const isHovered = activeIndex === index;
          
          return (
            <div
              key={index}
              className={styles.block}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className={`${styles.content} ${index === 1 ? styles.alignRight : ''}`}>
                <h3 className={`${styles.title} ${isHovered ? styles.textDark : styles.textLight}`}>
                  {block.title}
                </h3>
                
                <p className={`${styles.text} ${isHovered ? styles.textDark : styles.textLight}`}>
                  {block.text}
                </p>
                
                <div className={styles.buttonWrapper}>
                  <Link 
                    href={block.link} 
                    className={isHovered ? styles.btnBlue : styles.btnWhite}
                  >
                    {block.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}