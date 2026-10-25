import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TriangleAlert, Users, BarChart3, ArrowRight } from 'lucide-react';
import StatsBar from './StatsBar';

export default function HeroSection({ onFeatureClick }) {
  const featureButtons = [
    {
      id: 'activities',
      title: 'Track Activities',
      icon: Leaf,
      description: 'Log daily eco-friendly actions like cycling, recycling, and conserving energy.',
    },
    {
      id: 'issues',
      title: 'Report Issues',
      icon: TriangleAlert,
      description: 'Flag local hazards like illegal dumping, deforestation, or water pollution.',
    },
    {
      id: 'campaigns',
      title: 'Join Campaigns',
      icon: Users,
      description: 'Collaborate with local communities on tree planting and cleanup drives.',
    },
    {
      id: 'impact',
      title: 'See Impact',
      icon: BarChart3,
      description: 'Visualize your CO2 offset, trees saved, and community milestones.',
    },
  ];

  return (
    <section className="relative z-20 flex flex-col justify-center max-w-xl xl:max-w-2xl select-none">
      {/* 1. Subtitle / Overline Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-2.5"
      >
        <span className="text-[#59E39C] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase font-['Outfit'] inline-block drop-shadow-[0_0_8px_rgba(89,227,156,0.5)]">
          OUR PLANET. OUR RESPONSIBILITY.
        </span>
      </motion.div>

      {/* 2. Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-extrabold tracking-tight leading-[1.08] mb-3.5 font-['Outfit']"
      >
        <span className="text-white block">Track Today</span>
        <span className="block">
          <span className="text-white">for a </span>
          <span className="bg-gradient-to-r from-[#B7FF91] via-[#59E39C] to-[#22C55E] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(89,227,156,0.3)]">
            Greener
          </span>
        </span>
        <span className="bg-gradient-to-r from-[#B7FF91] via-[#59E39C] to-[#22C55E] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(89,227,156,0.35)] block">
          Tomorrow.
        </span>
      </motion.h1>

      {/* 3. Supporting Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mb-5 font-normal"
      >
        Record your actions, report environmental issues, and create real impact together.
      </motion.p>

      {/* 4. Vertically Stacked Feature Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-col gap-2.5 max-w-xs sm:max-w-sm mb-6"
      >
        {featureButtons.map((btn) => {
          const IconComponent = btn.icon;
          return (
            <motion.button
              key={btn.id}
              onClick={() => onFeatureClick?.(btn)}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group relative flex items-center gap-3.5 px-4 sm:px-5 py-2.5 rounded-full glass-pill cursor-pointer focus:outline-none"
            >
              {/* Icon Container with subtle green glow */}
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#031611]/60 text-[#59E39C] group-hover:text-[#B7FF91] transition-colors border border-[#59E39C]/30 group-hover:border-[#59E39C]/80 shadow-[0_0_10px_rgba(89,227,156,0.15)] group-hover:shadow-[0_0_15px_rgba(89,227,156,0.4)]">
                <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>

              {/* Button Label */}
              <span className="text-white font-medium text-sm sm:text-base tracking-wide group-hover:text-white transition-colors">
                {btn.title}
              </span>

              {/* Subtle hover right chevron */}
              <div className="ml-auto opacity-0 group-hover:opacity-80 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                <ArrowRight className="w-4 h-4 text-[#59E39C]" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* 5. Bottom Statistics Bar (Integrated under buttons matching reference composition) */}
      <div className="w-full">
        <StatsBar />
      </div>
    </section>
  );
}
