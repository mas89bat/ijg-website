import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import LeadCapture from './components/LeadCapture';
import About from './components/About';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#07090F' }}>
      <Nav />
      <Hero />
      <Services />
      <LeadCapture />
      <About />
      <Footer />
    </div>
  );
}
