
'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import styles from './ServiceBlocks.module.css';

const blocksData = [
  {
    title: 'Собственная продукция',
    text: 'Мы производим аэрозольную продукцию под брендом «Народная фабрика» — косметические, бытовые и технические средства. В основе — надёжное сырьё, современное оборудование и контроль качества на каждом этапе.',
    link: '/products',
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
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className={styles.services}>
      
      {blocksData.map((block, index) => {
        const isActive = activeIndex === index;
        
        const alignmentClass = index === 1 ? styles.alignRight : '';
        
        return (
          <div
            key={index}
            className={`${styles.block} ${isActive ? styles.activeBlock : ''} ${alignmentClass}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <h3 className={styles.title}>
              {block.title}
            </h3>
            
            <p className={styles.text}>
              {block.text}
            </p>
            
            <div className={`${styles.buttonWrapper} ${isActive ? styles.showButton : styles.hideButton}`}>
              <Link href={block.link} className={styles.serviceButton}>
                {block.buttonText}
              </Link>
            </div>
            
          </div>
        );
      })}
      
    </section>
  );
}