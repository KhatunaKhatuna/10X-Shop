import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Container from '../ui/Container';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-50 antialiased transition-colors duration-200">
      <Header />
      <main className="flex-1 py-6 sm:py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
