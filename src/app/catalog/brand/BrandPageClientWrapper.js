'use client';

import React, { useRef } from 'react';
import styles from './page.module.css';
import BrandCardEffect from '@/components/Catalog/BrandCardEffect';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';

export default function BrandPageClientWrapper({ brands }) {
  const pageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!pageRef.current) return;
    
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    currentTarget.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    currentTarget.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  return (
    <div 
      className={styles.pageContainer} 
      onMouseMove={handleMouseMove}
      ref={pageRef}
    >
      <Breadcrumbs
        categoryName="Бренды"
        categorySlug="brand" 
      />
      
      <h1 className={styles.mainHeading}>Исследуйте Наши Бренды</h1>
      <p className={styles.subHeading}>Откройте мир качественных продуктов от ваших любимых производителей</p>

      {brands.length === 0 ? (
        <p className={styles.noBrandsText}>Бренды пока не добавлены.</p>
      ) : (
        <div className={styles.brandsGrid}>
          {brands.map(brand => (
            <BrandCardEffect key={brand.slug} brandName={brand.name} brandSlug={brand.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
