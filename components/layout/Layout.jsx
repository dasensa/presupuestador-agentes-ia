import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14">
        {children}
      </main>
      <Footer />
    </>
  );
}
