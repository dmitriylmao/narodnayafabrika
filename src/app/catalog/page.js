import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import Link from 'next/link';
import CategoryCard from '@/components/Catalog/CategoryCard';
import styles from './page.module.css';
import { getAllCategories } from '@/utils/catalog';

export default async function CatalogPage() {
  const categories = getAllCategories();

  if (categories.length === 0) {
    return (
      <div className={styles.page}>
        <Breadcrumbs />
        <h1 className={styles.title}>Каталог</h1>
        <p className={styles.status}>Категорий пока нет</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />

      <h1 className={styles.title}>Каталог</h1>

      <div className={styles.grid}>
        {categories.map(category => (
          <Link key={category.slug} href={`/catalog/${category.slug}`}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>

    </div>
  );
}
