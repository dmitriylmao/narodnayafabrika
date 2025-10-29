import { getAllBrands } from '@/utils/catalog';
import BrandPageClientWrapper from './BrandPageClientWrapper';

export async function generateMetadata() {
  return {
    title: 'Все Бренды',
    description: 'Ознакомьтесь с полным списком брендов в нашем каталоге.',
  };
}

export default async function AllBrandsPage() {
  const brands = getAllBrands(); 

  return (
    <BrandPageClientWrapper brands={brands} />
  );
}
