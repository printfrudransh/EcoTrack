import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import earthAsset from '../assets/connected-earth-clean.png';

export default function AnimatedEarth({ onSelectFeature }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none pointer-events-none">
      {/* 1. Subtle Cyan-Green Atmospheric Rim Glow (Enhances separation from forest background) */}
      <div 
        className="absolute w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] rounded-full blur-[75px] opacity-35 animate-pulse-glow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(89, 227, 156, 0.3) 40%, rgba(6, 31, 25, 0.1) 65%, transparent 75%)',
        }}
      />

      {/* 2. Floating Animated Container with gentle parallax */}
      <motion.div
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 0.6, 0, -0.6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* 3. Refined, Restrained SVG Orbit Lines (Thin, elegant, low visual clutter) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 - Slanted Clockwise Orbit */}
          <div className="absolute w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] lg:w-[750px] lg:h-[750px] animate-spin-orbit opacity-45">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <ellipse
                cx="250"
                cy="250"
                rx="235"
                ry="130"
                fill="none"
                stroke="url(#orbitGradient1)"
                strokeWidth="1.1"
                strokeDasharray="8 28"
                transform="rotate(-25 250 250)"
              />
              <defs>
                <linearGradient id="orbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#59E39C" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Ring 2 - Opposite Counter-Clockwise Orbit */}
          <div className="absolute w-[470px] h-[470px] sm:w-[590px] sm:h-[590px] lg:w-[710px] lg:h-[710px] animate-spin-orbit-reverse opacity-35">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <ellipse
                cx="250"
                cy="250"
                rx="225"
                ry="140"
                fill="none"
                stroke="url(#orbitGradient2)"
                strokeWidth="0.9"
                strokeDasharray="6 32"
                transform="rotate(35 250 250)"
              />
              <defs>
                <linearGradient id="orbitGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B7FF91" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#59E39C" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0B2B22" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 4. The Earth with Glowing Eco Network Asset */}
        <motion.div
          className="relative z-10 w-full max-w-[620px] sm:max-w-[720px] lg:max-w-[830px] xl:max-w-[890px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.015 }}
        >
          <img
            src={earthAsset}
            alt="Connected Earth - Neon Eco Network"
            className="w-full h-auto object-contain pointer-events-auto drop-shadow-[0_0_40px_rgba(89,227,156,0.35)]"
          />

          {/* Calmer, Soft Light Pulses on Earth Node Junctions */}
          <span 
            className="absolute top-[28%] left-[43%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#59E39C,0_0_16px_#38BDF8] animate-pulse opacity-75"
            style={{ animationDuration: '3.5s' }}
          />
          <span 
            className="absolute top-[52%] left-[58%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#B7FF91,0_0_16px_#59E39C] animate-pulse opacity-80"
            style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}
          />
          <span 
            className="absolute top-[68%] left-[36%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#59E39C] animate-pulse opacity-70"
            style={{ animationDuration: '3.8s', animationDelay: '2.2s' }}
          />

          {/* Interactive Clickable Hotspots for the 5 Sustainability Icons */}
          {/* 1. Community / Users badge (Top) */}
          <button
            onClick={() => onSelectFeature?.('Join Campaigns')}
            title="Join Campaigns"
            className="absolute top-[17%] left-[29%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-115 focus:outline-none"
            aria-label="Join Campaigns"
          >
            <span className="sr-only">Join Campaigns</span>
          </button>

          {/* 2. Leaf badge (Mid-left) */}
          <button
            onClick={() => onSelectFeature?.('Track Activities')}
            title="Track Activities"
            className="absolute top-[37%] left-[17%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-115 focus:outline-none"
            aria-label="Track Activities"
          >
            <span className="sr-only">Track Activities</span>
          </button>

          {/* 3. Recycle badge (Lower-left) */}
          <button
            onClick={() => onSelectFeature?.('Recycling Network')}
            title="Recycling Network"
            className="absolute top-[58%] left-[16%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-115 focus:outline-none"
            aria-label="Recycling Network"
          >
            <span className="sr-only">Recycling Network</span>
          </button>

          {/* 4. Chart / Stats badge (Bottom) */}
          <button
            onClick={() => onSelectFeature?.('See Impact')}
            title="See Impact"
            className="absolute top-[75%] left-[32%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-115 focus:outline-none"
            aria-label="See Impact"
          >
            <span className="sr-only">See Impact</span>
          </button>

          {/* 5. Warning badge (Right) */}
          <button
            onClick={() => onSelectFeature?.('Report Issues')}
            title="Report Issues"
            className="absolute top-[62%] right-[28%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-115 focus:outline-none"
            aria-label="Report Issues"
          >
            <span className="sr-only">Report Issues</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
