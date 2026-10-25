import React, { useState } from 'react';
import BackgroundEnvironment from './components/BackgroundEnvironment';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnimatedEarth from './components/AnimatedEarth';
import LoginCard from './components/LoginCard';
import Toast from './components/Toast';
import FeatureModal from './components/FeatureModal';
import { Leaf, TriangleAlert, Users, BarChart3, Mail } from 'lucide-react';

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
    if (id === 'features') {
      setSelectedFeature({
        title: 'Platform Features',
        icon: Leaf,
        description: 'Explore community-driven climate action, intelligent carbon accounting, and verified incident reporting.',
      });
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
      message: 'Fill in your credentials on the right card to join the green movement!',
    });
  };

  const handleFeatureSelect = (featureName) => {
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

    setSelectedFeature(featureMap[featureName] || {
      title: featureName,
      icon: Leaf,
      description: 'Join thousands of proactive citizens taking measurable environmental action today.',
    });
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden ${isDarkMode ? 'dark' : 'nature-mode'}`}>
      {/* 1. Fullscreen Dark Forest Atmosphere */}
      <BackgroundEnvironment />

      {/* 2. Transparent Top Navigation Bar */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onSignUpClick={handleSignUpClick}
        onNavigate={handleNavClick}
      />

      {/* 3. Main Fullscreen Composition */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 max-w-[1600px] mx-auto w-full py-4">
        
        {/* Fullscreen Row: Hero Text & Stats (Left), Earth (Center/Back), Login Card (Right) */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 my-auto">
          
          {/* LEFT: Hero Content & Feature Buttons & Bottom Stats */}
          <div className="relative z-20 w-full lg:w-[44%] flex flex-col justify-center">
            <HeroSection
              onFeatureClick={(btn) => setSelectedFeature(btn)}
            />
          </div>

          {/* CENTER: Glowing Animated Earth (Layered between hero & login card, matching reference layout) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-visible lg:translate-x-[4%]">
            <div className="w-[340px] sm:w-[500px] md:w-[620px] lg:w-[760px] xl:w-[880px] pointer-events-auto">
              <AnimatedEarth onSelectFeature={handleFeatureSelect} />
            </div>
          </div>

          {/* RIGHT: Glassmorphism Login Card */}
          <div className="relative z-30 w-full lg:w-[38%] flex justify-center lg:justify-end">
            <LoginCard onToast={showToast} />
          </div>

        </div>

      </main>

      {/* 4. Interactive Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* 5. Feature Detail Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}
