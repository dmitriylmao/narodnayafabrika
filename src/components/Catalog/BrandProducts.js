// src/components/Catalog/BrandProducts.js
'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import styles from './BrandProducts.module.css';

export default function BrandProductsSlider({ brandName, relatedProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARD_WIDTH = 330;
  const CARD_GAP = 24;
  const VISIBLE_COUNT = 4;      
  const STEP = 1;               

  const products = relatedProducts || [];
  if (!products || products.length === 0) return null;

  // Максимальный индекс, до которого можно долистать
  const maxIndex = Math.max(products.length - VISIBLE_COUNT, 0);

  const handlePrev = () =>
    setCurrentIndex(prev => Math.max(prev - STEP, 0));

  const handleNext = () =>
    setCurrentIndex(prev => Math.min(prev + STEP, maxIndex));

  // Сдвиг слайдера
  const transformValue = -(currentIndex * (CARD_WIDTH + CARD_GAP));

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === maxIndex;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Похожие товары бренда {brandName}</h3>
      <div className={styles.sliderWrapper}>
        
        {/* Левая кнопка */}
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
          disabled={isPrevDisabled}
          aria-label="Предыдущий товар"
        >
          &lsaquo;
        </button>

        {/* Область слайдера */}
        <div className={styles.sliderClip}>
          <div
            className={styles.slider}
            style={{ transform: `translateX(${transformValue}px)` }}
          >
            {products.map(product => (
              <ProductCard
                key={product.slug}
                product={product}
                categorySlug={product.categorySlug}
              />
            ))}
          </div>
        </div>

        {/* Правая кнопка */}
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="Следующий товар"
        >
          &rsaquo;
        </button>

      </div>
    </div>
  );
}
