import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Leaf } from 'lucide-react';

export default function Navbar({ 
  activeNav, 
  setActiveNav, 
  isDarkMode, 
  setIsDarkMode, 
  onSignUpClick,
  onNavigate 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Features', id: 'features' },
    { name: 'Impact', id: 'impact' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    onNavigate?.(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 sm:px-10 lg:px-16 py-4 bg-[#031611]/85 backdrop-blur-md border-b border-[#54F0AE]/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          {/* Stylized leaf logo matching reference image */}
          <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <svg 
              viewBox="0 0 36 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 drop-shadow-[0_0_12px_rgba(89,227,156,0.65)]"
            >
              <path 
                d="M32 4C32 4 22 5 13 14C4 23 4 32 4 32C4 32 13 32 22 23C31 14 32 4 32 4Z" 
                fill="#59E39C" 
              />
              <path 
                d="M13 23L23 13" 
                stroke="#031611" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-white font-['Outfit'] transition-colors group-hover:text-[#59E39C]">
            EcoTrack
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 text-base font-medium transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B7FF91] via-[#59E39C] to-[#22C55E] rounded-full shadow-[0_0_8px_#59E39C]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle & Sign Up Button */}
        <div className="hidden md:flex items-center gap-5">
          {/* Dark / Light Mode Toggle Pill */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#061F19]/60 hover:bg-[#0B2B22]/80 border border-[#59E39C]/25 hover:border-[#59E39C]/60 text-white transition-all duration-200 shadow-lg cursor-pointer hover:shadow-[0_0_15px_rgba(89,227,156,0.25)]"
            title={isDarkMode ? "Switch to Nature Daylight mode" : "Switch to Deep Forest Dark mode"}
            aria-label="Toggle theme mode"
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-white fill-white transition-transform hover:-rotate-12" />
            ) : (
              <Sun className="w-5 h-5 text-[#B7FF91] transition-transform hover:rotate-45" />
            )}
          </button>

          {/* Sign Up Button (Lime-to-Mint Gradient Pill) */}
          <button
            onClick={onSignUpClick}
            className="glow-btn-primary px-7 py-2.5 rounded-full font-semibold text-sm tracking-wide transition-all cursor-pointer font-['Outfit']"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-[#061F19]/60 border border-[#59E39C]/20 text-white"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Moon className="w-4 h-4 fill-white" /> : <Sun className="w-4 h-4 text-[#B7FF91]" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#061F19]/80 border border-[#59E39C]/30 text-white hover:text-[#59E39C] focus:outline-none"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 p-6 glass-card rounded-2xl flex flex-col gap-4 border border-[#59E39C]/30"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-lg font-medium transition-colors ${
                  activeNav === link.id
                    ? 'bg-[#59E39C]/15 text-[#59E39C] font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 border-t border-[#59E39C]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignUpClick();
                }}
                className="w-full glow-btn-primary py-3 rounded-xl font-semibold text-center"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
