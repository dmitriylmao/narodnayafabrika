'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategorySidebar.module.css';

export default function CategorySidebar({ categories, allBrands, activeCategorySlug, activeBrandSlug }) {
  // Если выбран бренд, раскрываем список сразу
  const [isBrandsOpen, setIsBrandsOpen] = useState(!!activeBrandSlug);

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  return (
    <aside className={styles.sidebar}>
      
      {/* БЛОК КАТЕГОРИЙ */}
      <div className={styles.menuGroup}>
        <h3 className={styles.groupTitle}>Категории</h3>
        <ul className={styles.list}>
          {categories.map(category => {
            const isActive = category.slug === activeCategorySlug;
            return (
              <li key={category.slug}>
                <Link 
                  href={`/catalog/${category.slug}`} 
                  // Используем общий класс .link
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {category.image && (
                    <div className={styles.iconWrapper}>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={24}
                        height={24}
                        className={styles.icon}
                      />
                    </div>
                  )}
                  <span>{category.name}</span>
                  {isActive && <span className={styles.activeDot}>•</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* БЛОК БРЕНДОВ */}
      {allBrands && allBrands.length > 0 && (
        <div className={styles.menuGroup}>
          <div
            className={`${styles.brandsHeader} ${isBrandsOpen ? styles.brandsOpen : ''}`}
            onClick={toggleBrands}
          >
            <h3 className={styles.groupTitle}>Бренды</h3>
            <span className={styles.arrow}>▼</span>
          </div>

          <div className={`${styles.brandsCollapse} ${isBrandsOpen ? styles.expanded : ''}`}>
            <ul className={styles.brandsList}>
              {allBrands.map(brand => {
                const isBrandActive = brand.slug === activeBrandSlug;
                return (
                  <li key={brand.slug}>
                    <Link 
                      href={`/catalog/brand/${brand.slug}`} 
                      // ВАЖНО: Используем тот же класс .link, что и у категорий
                      className={`${styles.link} ${isBrandActive ? styles.active : ''}`}
                    >
                      {/* Если у брендов будут иконки, можно добавить сюда. 
                          Пока просто текст, но стиль идентичный. */}
                      <span>{brand.name}</span>
                      
                      {isBrandActive && <span className={styles.activeDot}>•</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}