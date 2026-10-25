import React, { useMemo } from 'react';
import forestBg from '../assets/forest-canopy.png';

export default function BackgroundEnvironment() {
  // Calm, slow-drifting firefly bokeh particles
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 12 + Math.random() * 76,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 20, // 20s - 28s: very slow and elegant
      delay: Math.random() * 8,
      glow: Math.random() > 0.5 ? 'rgba(183, 255, 145, 0.65)' : 'rgba(89, 227, 156, 0.55)',
    }));
  }, []);

  // Floating ambient canopy leaves (subtle sway & drift)
  const leaves = useMemo(() => {
    return [
      { id: 1, left: 16, duration: 28, delay: 0, scale: 0.75 },
      { id: 2, left: 42, duration: 34, delay: 9, scale: 0.6 },
      { id: 3, left: 74, duration: 30, delay: 16, scale: 0.8 },
      { id: 4, left: 86, duration: 32, delay: 5, scale: 0.68 },
    ];
  }, []);

  // Soft emerald bokeh circles creating realistic depth of field
  const bokehOrbs = useMemo(() => {
    return [
      { id: 1, top: '18%', left: '12%', size: 160, color: 'rgba(89, 227, 156, 0.08)', duration: 16 },
      { id: 2, top: '60%', left: '25%', size: 220, color: 'rgba(34, 197, 94, 0.06)', duration: 22 },
      { id: 3, top: '24%', right: '28%', size: 180, color: 'rgba(183, 255, 145, 0.08)', duration: 18 },
      { id: 4, bottom: '20%', right: '14%', size: 240, color: 'rgba(89, 227, 156, 0.06)', duration: 24 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Realistic Lush Forest Canopy (Detailed Leaves & Branches on Outer Edges) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-100"
        style={{
          backgroundImage: `url(${forestBg})`,
          filter: 'contrast(1.05) brightness(0.94) saturate(1.08)',
        }}
      />

      {/* 2. Realistic Volumetric Emerald Light Rays (Sunbeams breaking through the tree canopy) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35 overflow-hidden">
        {/* Ray 1 */}
        <div 
          className="absolute -top-32 right-1/4 w-44 h-[120vh] origin-top -rotate-[26deg] animate-ray-shimmer"
          style={{
            background: 'linear-gradient(to bottom, rgba(183, 255, 145, 0.4) 0%, rgba(89, 227, 156, 0.18) 40%, rgba(6, 31, 25, 0) 85%)',
            filter: 'blur(16px)',
          }}
        />
        {/* Ray 2 */}
        <div 
          className="absolute -top-28 right-[15%] w-60 h-[120vh] origin-top -rotate-[26deg] animate-ray-shimmer"
          style={{
            background: 'linear-gradient(to bottom, rgba(183, 255, 145, 0.35) 0%, rgba(89, 227, 156, 0.14) 45%, rgba(6, 31, 25, 0) 80%)',
            filter: 'blur(22px)',
            animationDelay: '3s',
          }}
        />
        {/* Ray 3 (Broader ambient beam) */}
        <div 
          className="absolute -top-36 right-[38%] w-80 h-[120vh] origin-top -rotate-[24deg] opacity-60"
          style={{
            background: 'linear-gradient(to bottom, rgba(89, 227, 156, 0.22) 0%, rgba(34, 197, 94, 0.08) 50%, transparent 85%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* 3. Middle-Ground Atmospheric Depth Haze */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse 85% 55% at 50% 50%, rgba(6, 31, 25, 0.35) 0%, rgba(3, 22, 17, 0.65) 80%, rgba(3, 22, 17, 0.85) 100%)',
        }}
      />

      {/* 4. Selective Readability Overlays (Targeted darker shading behind Hero and Login Card) */}
      {/* Left side: Behind Hero Text & Feature Buttons */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-[46%] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(3, 22, 17, 0.88) 0%, rgba(3, 22, 17, 0.62) 65%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Right side: Behind Login Card */}
      <div 
        className="absolute inset-y-0 right-0 w-full md:w-[42%] pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(3, 22, 17, 0.82) 0%, rgba(3, 22, 17, 0.48) 60%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Top Navbar Area Shading */}
      <div 
        className="absolute top-0 inset-x-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(3, 22, 17, 0.8) 0%, rgba(3, 22, 17, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* Bottom Footer & Stats Shading */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(3, 22, 17, 0.82) 0%, rgba(3, 22, 17, 0.2) 75%, transparent 100%)',
        }}
      />

      {/* 5. Soft Layered Screen Edge Vignette (Framing corner leaves in deep forest shadow without flattening) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 30px rgba(3, 22, 17, 0.65)',
        }}
      />

      {/* 6. Soft Emerald Bokeh Orbs (Depth of field) */}
      {bokehOrbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full pointer-events-none blur-3xl animate-pulse-glow"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: orb.color,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}

      {/* 7. Subtle Drifting Firefly Bokeh Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#ffffff',
            boxShadow: `0 0 ${p.size * 2}px ${p.glow}, 0 0 ${p.size * 4}px ${p.glow}`,
            animation: `gentleDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 8. Elegant Falling Canopy Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none opacity-25"
          style={{
            left: `${leaf.left}%`,
            top: `-5%`,
            transform: `scale(${leaf.scale})`,
            animation: `canopyLeafFall ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#59E39C]/70">
            <path
              d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2C6.2 17.5 7.5 14 10 12c3.5-2.8 7-3 12-2-.5 4.5-3.5 8-8 8.8 2.5 1.5 5.5 1.2 8-1.8C22 17 22 7 12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes rayShimmer {
          0%, 100% {
            opacity: 0.3;
            transform: rotate(-26deg) translateY(0px);
          }
          50% {
            opacity: 0.45;
            transform: rotate(-25deg) translateY(-8px);
          }
        }

        .animate-ray-shimmer {
          animation: rayShimmer 8s ease-in-out infinite;
        }

        @keyframes gentleDrift {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          30% {
            opacity: 0.7;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80px) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes canopyLeafFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          85% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(105vh) rotate(320deg) translateX(45px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-particle-drift,
          .animate-pulse-glow,
          .animate-spin-orbit,
          .animate-spin-orbit-reverse,
          .animate-ray-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
