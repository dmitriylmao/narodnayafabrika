// src/app/catalog/[categorySlug]/page.js

import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import ProductCard from '@/components/Catalog/ProductCard';
import CategorySidebar from '@/components/Catalog/CategorySidebar';
import styles from './page.module.css';
import { getAllCategories, getProductsByCategorySlug, getAllBrands } from '@/utils/catalog';

export async function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;

  const categoryData = getProductsByCategorySlug(categorySlug);

  if (!categoryData) {
    return { title: 'Категория не найдена' };
  }

  return {
    title: `${categoryData.name} - Каталог`,
    description: categoryData.description,
  };
}


export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;

  const categoryData = getProductsByCategorySlug(categorySlug);

  if (!categoryData) {
    notFound();
  }

  const allCategories = getAllCategories();
  const allBrands = getAllBrands();
  const products = categoryData.products || [];

  return (
    <div className={styles.pageContainer}>
      <Breadcrumbs
        categoryName={categoryData.name}
        categorySlug={categoryData.slug}
      />

      <div className={styles.mainContentWrapper}>

        <CategorySidebar
          categories={allCategories}
          allBrands={allBrands}
          activeCategorySlug={categorySlug}
        />

        <main className={styles.contentArea}>
          <header className={styles.header}>
            <h1 className={styles.heading}>{categoryData.name}</h1>
            {categoryData.description && <p className={styles.description}>{categoryData.description}</p>}
          </header>

          {products.length === 0 ? (
            <p className={styles.emptyText}>В этой категории пока нет товаров.</p>
          ) : (
            <div className={styles.gridContainer}>
              {products.map(product => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  categorySlug={categoryData.slug}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}