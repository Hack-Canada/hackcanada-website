import Navbar from '@/components/sections/navbar';
import Footer from '@/components/sections/footer';
import About from '@/components/sections/about';
import Stats from '@/components/sections/stats';
import Sponsors from '@/components/sections/sponsors';
import FAQ from '@/components/sections/faq';
import Team from '@/components/sections/team';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <About />
        <Stats />
        <Sponsors />
        <FAQ />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
