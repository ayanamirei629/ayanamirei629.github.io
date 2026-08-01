import './i18n';
import BlackHoleBackground from './components/BlackHoleBackground';
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
    <div className="relative isolate min-h-screen bg-dark-950 text-slate-200">
      <BlackHoleBackground />
      <div
        className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_83%_47%,transparent_0%,rgba(3,3,3,0.035)_34%,rgba(3,3,3,0.26)_100%)]"
        aria-hidden="true"
      />
      <div className="relative z-10">
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
    </div>
  );
}

export default App;
