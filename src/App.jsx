import React, { useState } from 'react';
import BackgroundEnvironment from './components/BackgroundEnvironment';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnimatedEarth from './components/AnimatedEarth';
import LoginCard from './components/LoginCard';
import Toast from './components/Toast';
import FeatureModal from './components/FeatureModal';
import AboutSection from './components/AboutSection';
import { Leaf, TriangleAlert, Users, BarChart3, Mail, Heart } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const showToast = ({ type, title, message }) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast((current) => (current?.title === title ? null : current));
    }, 4500);
  };

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about' || id === 'features') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'impact') {
      setSelectedFeature({
        title: 'Global Impact Matrix',
        icon: BarChart3,
        description: 'Over 10,000 environmental actions documented with real-time carbon offset verification across 42 countries.',
      });
    } else if (id === 'contact') {
      setSelectedFeature({
        title: 'Connect with EcoTrack',
        icon: Mail,
        description: 'Have questions or want to partner with us on local environmental conservation? Reach out to team@ecotrack.org.',
      });
    }
  };

  const handleSignUpClick = () => {
    showToast({
      type: 'info',
      title: 'Get Started with EcoTrack',
      message: 'Fill in your credentials on the login card to join the green movement!',
    });
  };

  const handleFeatureSelect = (featureInput) => {
    if (featureInput && typeof featureInput === 'object') {
      setSelectedFeature(featureInput);
      return;
    }

    const featureMap = {
      'Track Activities': {
        title: 'Track Activities',
        icon: Leaf,
        description: 'Log and monitor daily eco actions: cycling to work, zero-waste shopping, composting, and home solar usage.',
      },
      'Report Issues': {
        title: 'Report Issues',
        icon: TriangleAlert,
        description: 'Spot environmental violations, illegal dump sites, or degraded trails. Pin geo-coordinates for swift municipal action.',
      },
      'Join Campaigns': {
        title: 'Join Campaigns',
        icon: Users,
        description: 'Unite with local volunteers for weekend beach cleanups, community tree planting, and biodiversity censuses.',
      },
      'See Impact': {
        title: 'See Impact',
        icon: BarChart3,
        description: 'Visualize your carbon offset score, community leaderboard rankings, and tangible environmental savings.',
      },
      'Recycling Network': {
        title: 'Circular Recycling Network',
        icon: Leaf,
        description: 'Connect with certified e-waste and plastics recyclers in your zip code to divert materials from landfills.',
      },
    };

    setSelectedFeature(featureMap[featureInput] || {
      title: featureInput,
      icon: Leaf,
      description: 'Join thousands of proactive citizens taking measurable environmental action today.',
    });
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden ${isDarkMode ? 'dark' : 'nature-mode'}`}>
      {/* 1. Transparent Sticky Top Navigation Bar */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onSignUpClick={handleSignUpClick}
        onNavigate={handleNavClick}
      />

      {/* 2. Section 1: Hero Fullscreen Composition (Existing Homepage Kept 100% Intact) */}
      <div id="home" className="relative z-10 min-h-[calc(100vh-76px)] flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 max-w-[1600px] mx-auto w-full py-4 sm:py-6 overflow-hidden">
        {/* Fullscreen Dark Forest Atmosphere for Hero */}
        <BackgroundEnvironment />
        
        {/* Fullscreen Row: Hero Text & Stats (Left), Earth (Center/Back), Login Card (Right) */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 my-auto">
          
          {/* LEFT: Hero Content & Feature Buttons & Bottom Stats */}
          <div className="relative z-20 w-full lg:w-[44%] flex flex-col justify-center">
            <HeroSection
              onFeatureClick={(btn) => setSelectedFeature(btn)}
            />
          </div>

          {/* CENTER: Glowing Animated Earth (Layered between hero & login card) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-visible lg:translate-x-[4%]">
            <div className="w-[340px] sm:w-[500px] md:w-[620px] lg:w-[760px] xl:w-[860px] pointer-events-auto">
              <AnimatedEarth onSelectFeature={handleFeatureSelect} />
            </div>
          </div>

          {/* RIGHT: Glassmorphism Login Card */}
          <div className="relative z-30 w-full lg:w-[38%] flex justify-center lg:justify-end">
            <LoginCard onToast={showToast} />
          </div>

        </div>

      </div>

      {/* 4. Section 2: WHAT ECOTRACK DOES (New About & Feature Highlights Section) */}
      <AboutSection onSelectFeature={handleFeatureSelect} />

      {/* 5. Minimalist Premium Footer */}
      <footer className="relative z-20 w-full border-t border-[#54F0AE]/20 bg-[#031611]/90 backdrop-blur-xl py-8 px-6 sm:px-12 text-center text-xs text-[#9EB3A8]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#54F0AE]" />
            <span className="font-bold text-white font-['Outfit'] tracking-wide">EcoTrack</span>
            <span className="text-gray-500">|</span>
            <span>Empowering grassroots environmental action worldwide</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => handleNavClick('features')} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => handleNavClick('impact')} className="hover:text-white transition-colors cursor-pointer">Impact</button>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with care for a greener future</span>
          </div>
        </div>
      </footer>

      {/* 6. Interactive Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* 7. Feature Detail Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}

