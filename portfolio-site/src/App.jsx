import './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import News from './components/News';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Activity from './components/Activity';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Personal from './components/Personal';
import Reading from './components/Reading';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-200">
      <Navbar />
      <Hero />
      <News />
      <Education />
      <Experience />
      <Projects />
      <Activity />
      <Publications />
      <Skills />
      <Personal />
      <Reading />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
