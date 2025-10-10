
import { Raleway } from 'next/font/google'; 
import '@/styles/globals.css';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer';

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway', 
});


export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${raleway.variable}`}>
      <body>
        <Header />
            <main>
            {children} 
            </main>
        <Footer />
      </body>
    </html>
  );
}