
import { Raleway } from 'next/font/google'; 
import '@/styles/globals.css';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer';

import { AuthContextProvider } from '@/context/AuthContext'; 

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway', 
});


export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${raleway.variable}`}>
      <body id="root-body">
        <AuthContextProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}