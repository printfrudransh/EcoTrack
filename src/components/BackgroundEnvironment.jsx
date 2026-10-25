import React, { useMemo } from 'react';
import forestBg from '../assets/forest-canopy.png';

export default function BackgroundEnvironment() {
  // Generate random drifting firefly particles
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 8,
      glow: Math.random() > 0.4 ? 'rgba(183, 255, 145, 0.9)' : 'rgba(89, 227, 156, 0.8)',
    }));
  }, []);

  // Floating ambient leaves
  const leaves = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      duration: 18 + Math.random() * 12,
      delay: Math.random() * 10,
      scale: 0.6 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Dark Forest Canopy Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage: `url(${forestBg})`,
        }}
      />

      {/* 2. Cinematic Gradient Overlays to preserve legibility and match dark forest depth */}
      {/* Dark vignette around screen edges */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_30%,_rgba(3,22,17,0.75)_80%,_rgba(3,22,17,0.95)_100%]" />
      
      {/* Deep forest linear gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031611]/85 via-[#031611]/40 to-[#031611]/90" />
      
      {/* Left-side subtle shadow to ensure hero text is 100% readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031611]/80 via-[#031611]/30 to-transparent w-full md:w-3/4" />

      {/* 3. Ambient Green Atmospheric Light Pulses */}
      <div 
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 animate-pulse-glow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(89, 227, 156, 0.6) 0%, rgba(6, 31, 25, 0) 70%)',
        }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(183, 255, 145, 0.5) 0%, rgba(6, 31, 25, 0) 70%)',
        }}
      />

      {/* 4. Floating Fireflies / Glowing Spores */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-particle-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#ffffff',
            boxShadow: `0 0 ${p.size * 3}px ${p.glow}, 0 0 ${p.size * 6}px ${p.glow}`,
            animation: `particleDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 5. Gentle Floating Green Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none opacity-30"
          style={{
            left: `${leaf.left}%`,
            top: `-5%`,
            transform: `scale(${leaf.scale})`,
            animation: `fallGentle ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#59E39C]/60">
            <path
              d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2C6.2 17.5 7.5 14 10 12c3.5-2.8 7-3 12-2-.5 4.5-3.5 8-8 8.8 2.5 1.5 5.5 1.2 8-1.8C22 17 22 7 12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}

      {/* Embedded keyframe for gentle falling leaves */}
      <style>{`
        @keyframes fallGentle {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(60px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
