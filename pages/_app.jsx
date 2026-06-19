import { DM_Sans } from 'next/font/google';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${dmSans.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
