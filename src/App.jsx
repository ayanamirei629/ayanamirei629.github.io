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
import { MotionConfig } from 'framer-motion';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site-root">
        <BlackHoleBackground />
        <div className="relative z-10">
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <div className="content-surface">
              <Projects />
              <News />
              <Experience />
              <Education />
              <Publications />
              <Skills />
              <Activity />
              <Personal />
              <Reading />
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
