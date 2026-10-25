import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import earthAsset from '../assets/connected-earth-clean.png';

export default function AnimatedEarth({ onSelectFeature }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none pointer-events-none">
      {/* Outer Atmospheric Radiant Glow */}
      <div 
        className="absolute w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] lg:w-[750px] lg:h-[750px] rounded-full blur-[80px] opacity-40 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(89, 227, 156, 0.45) 0%, rgba(34, 197, 94, 0.2) 40%, rgba(6, 31, 25, 0) 70%)',
        }}
      />

      {/* Floating Animated Container with subtle interactive parallax */}
      <motion.div
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 0.8, 0, -0.8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Futuristic Rotating SVG Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 - Slanted Clockwise Orbit */}
          <div className="absolute w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px] animate-spin-orbit opacity-75">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <ellipse
                cx="250"
                cy="250"
                rx="240"
                ry="135"
                fill="none"
                stroke="url(#orbitGradient1)"
                strokeWidth="1.5"
                strokeDasharray="14 20"
                transform="rotate(-25 250 250)"
                className="opacity-70"
              />
              <defs>
                <linearGradient id="orbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#59E39C" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#B7FF91" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Ring 2 - Opposite Counter-Clockwise Orbit */}
          <div className="absolute w-[490px] h-[490px] sm:w-[610px] sm:h-[610px] lg:w-[740px] lg:h-[740px] animate-spin-orbit-reverse opacity-60">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <ellipse
                cx="250"
                cy="250"
                rx="230"
                ry="145"
                fill="none"
                stroke="url(#orbitGradient2)"
                strokeWidth="1.2"
                strokeDasharray="10 26"
                transform="rotate(35 250 250)"
              />
              <defs>
                <linearGradient id="orbitGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B7FF91" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#59E39C" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0B2B22" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* The Earth with Glowing Eco Network Asset (Transparent RGBA) */}
        <motion.div
          className="relative z-10 w-full max-w-[620px] sm:max-w-[720px] lg:max-w-[840px] xl:max-w-[900px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={earthAsset}
            alt="Connected Earth - Neon Eco Network"
            className="w-full h-auto object-contain pointer-events-auto"
          />

          {/* Dynamic Light Sparkle Hotspots */}
          <span 
            className="absolute top-[28%] left-[43%] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#B7FF91,0_0_24px_#59E39C] animate-ping opacity-85"
            style={{ animationDuration: '3s' }}
          />
          <span 
            className="absolute top-[52%] left-[58%] w-3 h-3 rounded-full bg-white shadow-[0_0_14px_#59E39C,0_0_28px_#B7FF91] animate-ping opacity-90"
            style={{ animationDuration: '4s', animationDelay: '1.2s' }}
          />
          <span 
            className="absolute top-[68%] left-[36%] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#B7FF91] animate-ping opacity-75"
            style={{ animationDuration: '3.5s', animationDelay: '2s' }}
          />

          {/* Interactive Clickable Hotspots for the 5 Icons */}
          {/* 1. Community / Users badge (Top) */}
          <button
            onClick={() => onSelectFeature?.('Join Campaigns')}
            title="Join Campaigns"
            className="absolute top-[17%] left-[29%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            aria-label="Join Campaigns"
          >
            <span className="sr-only">Join Campaigns</span>
          </button>

          {/* 2. Leaf badge (Mid-left) */}
          <button
            onClick={() => onSelectFeature?.('Track Activities')}
            title="Track Activities"
            className="absolute top-[37%] left-[17%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            aria-label="Track Activities"
          >
            <span className="sr-only">Track Activities</span>
          </button>

          {/* 3. Recycle badge (Lower-left) */}
          <button
            onClick={() => onSelectFeature?.('Recycling Network')}
            title="Recycling Network"
            className="absolute top-[58%] left-[16%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            aria-label="Recycling Network"
          >
            <span className="sr-only">Recycling Network</span>
          </button>

          {/* 4. Chart / Stats badge (Bottom) */}
          <button
            onClick={() => onSelectFeature?.('See Impact')}
            title="See Impact"
            className="absolute top-[75%] left-[32%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            aria-label="See Impact"
          >
            <span className="sr-only">See Impact</span>
          </button>

          {/* 5. Warning badge (Right) */}
          <button
            onClick={() => onSelectFeature?.('Report Issues')}
            title="Report Issues"
            className="absolute top-[62%] right-[28%] w-12 h-12 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-transform hover:scale-125 focus:outline-none"
            aria-label="Report Issues"
          >
            <span className="sr-only">Report Issues</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
