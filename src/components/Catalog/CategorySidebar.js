// src/components/Catalog/CategorySidebar.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategorySidebar.module.css';

export default function CategorySidebar({ categories, activeCategorySlug }) {

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {categories.map(category => {
          const key = category.slug;
          const isActive = category.slug === activeCategorySlug;
          const linkClassName = `${styles.link} ${isActive ? styles.active : ''}`;

          return (
            <li key={key}>
              <Link href={`/catalog/${category.slug}`} className={linkClassName}>
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={30}
                    height={30}
                    className={styles.icon}
                  />
                ) : (
                  <div className={styles.iconPlaceholder}></div>
                )}
                <span>{category.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}