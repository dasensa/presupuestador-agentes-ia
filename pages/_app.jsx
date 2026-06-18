import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${jakarta.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
