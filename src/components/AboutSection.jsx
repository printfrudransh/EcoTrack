import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  TriangleAlert,
  Users,
  BarChart3,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  Recycle,
  Bus,
  Zap,
  Trees,
  Coffee,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import aboutForestBg from '../assets/about-forest-bg.jpg';
import issuePreviewImg from '../assets/issue-preview.jpg';
import cleanupPreviewImg from '../assets/cleanup-preview.jpg';

export default function AboutSection({ onSelectFeature }) {
  // Luminous floating firefly particles (mint & sunlit embers)
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: 3 + Math.random() * 94,
      y: 6 + Math.random() * 88,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 14,
      delay: Math.random() * 6,
      isGolden: i % 4 === 0,
    }));
  }, []);

  const handleCardAction = (title, description, icon) => {
    onSelectFeature?.({
      title,
      icon,
      description,
    });
  };

  return (
    <section 
      id="about" 
      className="relative z-20 w-full min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden select-none flex flex-col justify-center"
    >
      {/* 1. Cinematic Forest Garden Walkway Background (No Earth, No Globe) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url(${aboutForestBg})`,
            filter: 'contrast(1.08) brightness(0.94) saturate(1.15)',
          }}
        />

        {/* Warm Golden Sunlight Filtering Through Canopy */}
        <div 
          className="absolute inset-0 mix-blend-screen opacity-45 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 60% at 75% 15%, rgba(254, 240, 138, 0.45) 0%, rgba(165, 255, 139, 0.25) 35%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Central Dark Emerald Readability Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 85% 70% at 50% 50%, rgba(3, 27, 20, 0.82) 0%, rgba(3, 27, 20, 0.92) 55%, rgba(3, 27, 20, 0.98) 100%)',
          }}
        />

        {/* Top Gradient Transition from Hero */}
        <div 
          className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #031611 0%, rgba(3, 27, 20, 0.75) 50%, transparent 100%)',
          }}
        />

        {/* Bottom Gradient Transition to Footer */}
        <div 
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #031611 0%, rgba(3, 27, 20, 0.8) 50%, transparent 100%)',
          }}
        />

        {/* Floating Glowing Firefly Embers */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.isGolden ? '#FEF08A' : '#54F0AE',
              boxShadow: p.isGolden
                ? '0 0 10px rgba(254, 240, 138, 0.9), 0 0 20px rgba(250, 204, 21, 0.6)'
                : '0 0 10px rgba(84, 240, 174, 0.85), 0 0 18px rgba(165, 255, 139, 0.5)',
              animation: `particleFloat ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* Eyebrow Label with Thin Flanking Lines (Matching Reference Image) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3.5"
        >
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#54F0AE]/60" />
          <div className="flex items-center gap-2 text-[#54F0AE] text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase font-['Outfit']">
            <Leaf className="w-3.5 h-3.5 text-[#54F0AE]" />
            <span>WHAT ECOTRACK DOES</span>
          </div>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#54F0AE]/60" />
        </motion.div>

        {/* Large Headline: Small Actions. A Cleaner Tomorrow. */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-center tracking-tight leading-[1.12] mb-3.5 font-['Outfit']"
        >
          <span className="text-[#F5FFF9]">Small Actions. </span>
          <span className="bg-gradient-to-r from-[#54F0AE] via-[#86FF9F] to-[#A5FF8B] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(84,240,174,0.35)]">
            A Cleaner Tomorrow.
          </span>
        </motion.h2>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#9EB3A8] text-center text-sm sm:text-base md:text-[17px] max-w-2xl leading-relaxed mb-10 sm:mb-14 font-normal"
        >
          EcoTrack helps individuals, communities and institutions work together for cleaner, greener and more sustainable environments.
        </motion.p>

        {/* 3. Four Main Feature Cards (2x2 Grid) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">
          
          {/* ===================== CARD 1: TRACK ENVIRONMENTAL ACTIVITIES ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[28px] p-5 sm:p-6 md:p-7 bg-[#04241B]/75 hover:bg-[#063B2C]/80 backdrop-blur-xl border border-[#54F0AE]/25 hover:border-[#54F0AE]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(84,240,174,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(84,240,174,0.16)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#54F0AE]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#54F0AE]/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-between">
              
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#031B14]/90 border border-[#54F0AE]/35 text-[#A5FF8B] font-bold text-xs flex items-center justify-center font-['Outfit']">
                      01
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#063B2C]/90 border border-[#54F0AE]/50 flex items-center justify-center text-[#54F0AE] shadow-[0_0_15px_rgba(84,240,174,0.35)] group-hover:scale-110 transition-transform duration-300">
                      <Leaf className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-['Outfit'] leading-tight">
                    Track Environmental <br className="hidden sm:inline" />
                    <span className="text-[#54F0AE]">Activities</span>
                  </h3>

                  {/* Description */}
                  <p className="text-[#9EB3A8] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    Record eco-friendly actions like recycling, tree planting, using public transport and saving electricity. Build a record of your environmental contributions.
                  </p>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    onClick={() =>
                      handleCardAction(
                        'Track Environmental Activities',
                        'Record eco-friendly actions like recycling, tree planting, using public transport and saving electricity. Build a record of your environmental contributions.',
                        Leaf
                      )
                    }
                    className="glow-btn-primary px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group/btn"
                  >
                    <span>Track Activities</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Visual Treatment: Smartphone Mockup Preview */}
              <div className="w-full sm:w-[200px] md:w-[210px] xl:w-[225px] flex-shrink-0 flex justify-center relative">
                
                {/* Decorative floating leaves */}
                <div className="absolute -bottom-2 -left-2 pointer-events-none opacity-85 z-20">
                  <Leaf className="w-5 h-5 text-[#A5FF8B] drop-shadow-[0_0_10px_rgba(165,255,139,0.7)] rotate-45" />
                </div>
                <div className="absolute -top-2 -right-2 pointer-events-none opacity-85 z-20">
                  <Leaf className="w-4 h-4 text-[#54F0AE] drop-shadow-[0_0_8px_rgba(84,240,174,0.6)] -rotate-12" />
                </div>

                {/* Phone Frame */}
                <div className="w-full max-w-[210px] bg-[#031B14]/95 rounded-[24px] p-2.5 border-2 border-[#54F0AE]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(84,240,174,0.15)] backdrop-blur-md">
                  {/* Speaker notch */}
                  <div className="w-10 h-1 bg-[#54F0AE]/30 rounded-full mx-auto mb-2" />
                  
                  {/* Screen Header */}
                  <div className="flex items-center justify-between px-1 mb-2 pb-1 border-b border-[#54F0AE]/20">
                    <span className="text-[11px] font-bold text-white font-['Outfit']">Log Activity</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#54F0AE]" />
                  </div>

                  {/* Activity Item List */}
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20 text-gray-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#54F0AE]/20 flex items-center justify-center text-[#54F0AE]">
                          <Recycle className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium text-white truncate max-w-[95px]">Recycle Waste</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20 text-gray-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#F59E0B]/20 flex items-center justify-center text-[#FBBF24]">
                          <Bus className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium text-white truncate max-w-[95px]">Public Transport</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20 text-gray-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#EAB308]/20 flex items-center justify-center text-[#FDE047]">
                          <Zap className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium text-white truncate max-w-[95px]">Save Electricity</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20 text-gray-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#10B981]/20 flex items-center justify-center text-[#34D399]">
                          <Trees className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium text-white truncate max-w-[95px]">Plant a Tree</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20 text-gray-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#06B6D4]/20 flex items-center justify-center text-[#22D3EE]">
                          <Coffee className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium text-white truncate max-w-[95px]">Avoid Plastic</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ===================== CARD 2: REPORT ENVIRONMENTAL ISSUES ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[28px] p-5 sm:p-6 md:p-7 bg-[#04241B]/75 hover:bg-[#063B2C]/80 backdrop-blur-xl border border-[#54F0AE]/25 hover:border-[#54F0AE]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(84,240,174,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(84,240,174,0.16)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#54F0AE]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#54F0AE]/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-between">
              
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#031B14]/90 border border-[#54F0AE]/35 text-[#A5FF8B] font-bold text-xs flex items-center justify-center font-['Outfit']">
                      02
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#063B2C]/90 border border-[#54F0AE]/50 flex items-center justify-center text-[#54F0AE] shadow-[0_0_15px_rgba(84,240,174,0.35)] group-hover:scale-110 transition-transform duration-300">
                      <TriangleAlert className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-['Outfit'] leading-tight">
                    Report <br className="hidden sm:inline" />
                    <span className="text-[#54F0AE]">Environmental Issues</span>
                  </h3>

                  {/* Description */}
                  <p className="text-[#9EB3A8] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    Report garbage dumping, overflowing bins, pollution and other environmental issues with photos and location details.
                  </p>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    onClick={() =>
                      handleCardAction(
                        'Report Environmental Issues',
                        'Report garbage dumping, overflowing bins, pollution and other environmental issues with photos and location details. Help us identify problem areas and get them resolved.',
                        TriangleAlert
                      )
                    }
                    className="glow-btn-primary px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group/btn"
                  >
                    <span>Report an Issue</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Visual Treatment: Report Preview Card */}
              <div className="w-full sm:w-[210px] md:w-[220px] xl:w-[235px] flex-shrink-0 flex justify-center relative">
                
                {/* Decorative leaf accent */}
                <div className="absolute -top-2 -right-1 pointer-events-none opacity-85 z-20">
                  <Leaf className="w-5 h-5 text-[#A5FF8B] drop-shadow-[0_0_8px_rgba(165,255,139,0.7)] rotate-12" />
                </div>

                <div className="w-full max-w-[225px] bg-[#031B14]/95 rounded-2xl p-2.5 border border-[#54F0AE]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(84,240,174,0.12)] backdrop-blur-md">
                  
                  {/* Photo with Pin & Status */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-2 border border-[#54F0AE]/20">
                    <img
                      src={issuePreviewImg}
                      alt="Garbage Overflow Issue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Animated Location Pin Marker on Image */}
                    <div className="absolute bottom-2.5 right-4 flex items-center justify-center">
                      <div className="absolute w-5 h-5 rounded-full bg-red-500/40 animate-ping" />
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg border border-white/60">
                        <MapPin className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between gap-1">
                    <div>
                      <h4 className="text-xs font-bold text-white font-['Outfit'] truncate">
                        Garbage Overflow
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-300">
                        <MapPin className="w-2.5 h-2.5 text-[#54F0AE]" />
                        <span className="truncate">Main Block, BMSCE</span>
                      </div>
                    </div>

                    {/* Reported Badge */}
                    <span className="px-2 py-0.5 rounded-full bg-[#B45309]/50 border border-[#F59E0B]/60 text-[#FDE68A] text-[10px] font-semibold tracking-wide shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      Reported
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

          {/* ===================== CARD 3: MANAGE CAMPAIGNS & PARTICIPATION ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[28px] p-5 sm:p-6 md:p-7 bg-[#04241B]/75 hover:bg-[#063B2C]/80 backdrop-blur-xl border border-[#54F0AE]/25 hover:border-[#54F0AE]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(84,240,174,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(84,240,174,0.16)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#54F0AE]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#54F0AE]/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-between">
              
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#031B14]/90 border border-[#54F0AE]/35 text-[#A5FF8B] font-bold text-xs flex items-center justify-center font-['Outfit']">
                      03
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#063B2C]/90 border border-[#54F0AE]/50 flex items-center justify-center text-[#54F0AE] shadow-[0_0_15px_rgba(84,240,174,0.35)] group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-['Outfit'] leading-tight">
                    Manage Campaigns <br className="hidden sm:inline" />
                    <span className="text-[#54F0AE]">& Participation</span>
                  </h3>

                  {/* Description */}
                  <p className="text-[#9EB3A8] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    Discover and join environmental drives, cleanup campaigns, sustainability challenges and community activities.
                  </p>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    onClick={() =>
                      handleCardAction(
                        'Manage Campaigns & Participation',
                        'Discover and join environmental drives, cleanup campaigns, sustainability challenges and community activities. Organize cleanups and tree plantation drives.',
                        Users
                      )
                    }
                    className="glow-btn-primary px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group/btn"
                  >
                    <span>Explore Campaigns</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Visual Treatment: Campaign Preview Card */}
              <div className="w-full sm:w-[210px] md:w-[220px] xl:w-[235px] flex-shrink-0 flex justify-center relative">
                
                {/* Decorative leaves */}
                <div className="absolute -bottom-2 -left-2 pointer-events-none opacity-85 z-20">
                  <Leaf className="w-5 h-5 text-[#54F0AE] drop-shadow-[0_0_8px_rgba(84,240,174,0.6)] 45" />
                </div>

                <div className="w-full max-w-[225px] bg-[#031B14]/95 rounded-2xl p-2.5 border border-[#54F0AE]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(84,240,174,0.12)] backdrop-blur-md">
                  
                  {/* Photo with Ongoing Badge */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-2 border border-[#54F0AE]/20">
                    <img
                      src={cleanupPreviewImg}
                      alt="Campus Cleanup Drive"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Ongoing Badge with glowing green pulse dot */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#031B14]/85 border border-[#54F0AE]/60 text-[#54F0AE] text-[10px] font-semibold flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#54F0AE] animate-ping" />
                      <span>Ongoing</span>
                    </div>
                  </div>

                  {/* Campaign Metadata */}
                  <div>
                    <h4 className="text-xs font-bold text-white font-['Outfit'] truncate">
                      Campus Cleanup Drive
                    </h4>
                    <p className="text-[10px] text-gray-300 truncate mb-1.5">
                      A cleaner campus for a brighter future.
                    </p>

                    {/* Date and Participants Row */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#54F0AE]/20 text-[10px] text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#54F0AE]" />
                        <span>Sat, 12 Apr</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#A5FF8B] font-medium">
                        <Users className="w-3 h-3" />
                        <span>120+ Joined</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

          {/* ===================== CARD 4: MONITOR ENVIRONMENTAL IMPACT ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-[28px] p-5 sm:p-6 md:p-7 bg-[#04241B]/75 hover:bg-[#063B2C]/80 backdrop-blur-xl border border-[#54F0AE]/25 hover:border-[#54F0AE]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(84,240,174,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(84,240,174,0.16)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#54F0AE]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#54F0AE]/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-between">
              
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#031B14]/90 border border-[#54F0AE]/35 text-[#A5FF8B] font-bold text-xs flex items-center justify-center font-['Outfit']">
                      04
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#063B2C]/90 border border-[#54F0AE]/50 flex items-center justify-center text-[#54F0AE] shadow-[0_0_15px_rgba(84,240,174,0.35)] group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-['Outfit'] leading-tight">
                    Monitor <br className="hidden sm:inline" />
                    <span className="text-[#54F0AE]">Environmental Impact</span>
                  </h3>

                  {/* Description */}
                  <p className="text-[#9EB3A8] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    Monitor activities, reported issues, resolution progress and community participation through a centralized dashboard.
                  </p>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    onClick={() =>
                      handleCardAction(
                        'Monitor Environmental Impact',
                        'Monitor activities, reported issues, resolution progress and community participation through a centralized dashboard. Track real-time progress and milestones.',
                        BarChart3
                      )
                    }
                    className="glow-btn-primary px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group/btn"
                  >
                    <span>See Impact</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Visual Treatment: Dashboard Impact Preview Card */}
              <div className="w-full sm:w-[210px] md:w-[220px] xl:w-[235px] flex-shrink-0 flex justify-center relative">
                
                {/* Decorative leaf */}
                <div className="absolute -bottom-2 -right-2 pointer-events-none opacity-85 z-20">
                  <Leaf className="w-5 h-5 text-[#A5FF8B] drop-shadow-[0_0_8px_rgba(165,255,139,0.7)] rotate-45" />
                </div>

                <div className="w-full max-w-[225px] bg-[#031B14]/95 rounded-2xl p-2.5 border border-[#54F0AE]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(84,240,174,0.12)] backdrop-blur-md">
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white font-['Outfit']">Our Impact</span>
                    <span className="text-[9px] text-gray-300 px-1.5 py-0.5 rounded-full bg-[#063B2C]/70 border border-[#54F0AE]/20">
                      This Month ▾
                    </span>
                  </div>

                  {/* Growth Pill */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#54F0AE]/15 text-[#54F0AE] text-[9px] font-semibold">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>+32% Activities</span>
                    </div>
                  </div>

                  {/* Minimal Green Bar Chart */}
                  <div className="h-12 w-full flex items-end justify-between gap-1 px-1 py-1 mb-2.5 rounded-lg bg-[#063B2C]/40 border border-[#54F0AE]/15">
                    {[
                      { m: 'Jan', h: 35 },
                      { m: 'Feb', h: 48 },
                      { m: 'Mar', h: 65 },
                      { m: 'Apr', h: 55 },
                      { m: 'May', h: 88 },
                      { m: 'Jun', h: 72 },
                      { m: 'Jul', h: 96 },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#063B2C] via-[#54F0AE] to-[#A5FF8B] transition-all duration-500 hover:brightness-125"
                          style={{ height: `${bar.h}%` }}
                        />
                        <span className="text-[7px] text-gray-400">{bar.m}</span>
                      </div>
                    ))}
                  </div>

                  {/* 2x2 Metric Grid (Zero values / labeled illustrative stats as required) */}
                  <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                    <div className="p-1 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20">
                      <div className="flex items-center gap-1 text-[#54F0AE] mb-0.5">
                        <Trees className="w-2.5 h-2.5" />
                        <span className="text-[8px] text-gray-300">Trees Planted</span>
                      </div>
                      <span className="text-xs font-bold text-white font-['Outfit']">0</span>
                    </div>

                    <div className="p-1 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20">
                      <div className="flex items-center gap-1 text-[#54F0AE] mb-0.5">
                        <Recycle className="w-2.5 h-2.5" />
                        <span className="text-[8px] text-gray-300">Waste Reduced</span>
                      </div>
                      <span className="text-xs font-bold text-white font-['Outfit']">0 kg</span>
                    </div>

                    <div className="p-1 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20">
                      <div className="flex items-center gap-1 text-[#54F0AE] mb-0.5">
                        <Users className="w-2.5 h-2.5" />
                        <span className="text-[8px] text-gray-300">Participants</span>
                      </div>
                      <span className="text-xs font-bold text-white font-['Outfit']">0</span>
                    </div>

                    <div className="p-1 rounded-lg bg-[#063B2C]/70 border border-[#54F0AE]/20">
                      <div className="flex items-center gap-1 text-[#54F0AE] mb-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span className="text-[8px] text-gray-300">Resolved</span>
                      </div>
                      <span className="text-xs font-bold text-white font-['Outfit']">0</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Embedded CSS for particle float */}
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-80px) translateX(25px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-ping {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
