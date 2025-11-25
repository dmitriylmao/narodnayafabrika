import ContractHero from '@/components/Contract/ContractHero';
import TechBento from '@/components/Contract/TechBento';
import Partners from '@/components/Contract/Partners';
import WhyUs from '@/components/Contract/WhyUs';
import ProductsAndQuality from '@/components/Contract/ProductsAndQuality';

const pageStyle = {
  paddingBottom: '40px',
  backgroundColor: 'var(--color-background-light)',
  minHeight: '100vh',
};

export default function ContractPage() {
  return (
    <main style={pageStyle}>
      <ContractHero />
      <Partners />
      <TechBento />
      <WhyUs />
    </main>
  );
}