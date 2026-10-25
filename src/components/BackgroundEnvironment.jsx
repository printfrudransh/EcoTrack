import React, { useMemo } from 'react';
import forestBg from '../assets/forest-canopy.png';

export default function BackgroundEnvironment() {
  // Gentle, high-end floating firefly bokeh orbs (calm, restrained motion)
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 80,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 18, // 18s - 26s (slow & calming)
      delay: Math.random() * 6,
      glow: Math.random() > 0.5 ? 'rgba(183, 255, 145, 0.7)' : 'rgba(89, 227, 156, 0.6)',
    }));
  }, []);

  // Floating ambient leaves drifting gracefully through the forest canopy
  const leaves = useMemo(() => {
    return [
      { id: 1, left: 14, duration: 24, delay: 0, scale: 0.8 },
      { id: 2, left: 45, duration: 30, delay: 7, scale: 0.65 },
      { id: 3, left: 78, duration: 26, delay: 13, scale: 0.9 },
      { id: 4, left: 88, duration: 28, delay: 4, scale: 0.7 },
    ];
  }, []);

  // Subtle background emerald bokeh circles
  const bokehOrbs = useMemo(() => {
    return [
      { id: 1, top: '15%', left: '22%', size: 140, color: 'rgba(89, 227, 156, 0.12)', duration: 14 },
      { id: 2, top: '65%', left: '18%', size: 200, color: 'rgba(34, 197, 94, 0.08)', duration: 18 },
      { id: 3, top: '30%', right: '20%', size: 160, color: 'rgba(183, 255, 145, 0.1)', duration: 16 },
      { id: 4, bottom: '15%', right: '12%', size: 220, color: 'rgba(89, 227, 156, 0.07)', duration: 20 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Realistic Lush Forest Canopy Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-100"
        style={{
          backgroundImage: `url(${forestBg})`,
          filter: 'contrast(1.04) brightness(0.96)',
        }}
      />

      {/* 2. Soft Emerald Light Rays (Atmospheric Sunbeams through Canopy) */}
      <div 
        className="absolute -top-20 right-10 w-[700px] h-[700px] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at 80% 0%, rgba(183, 255, 145, 0.35) 0%, rgba(89, 227, 156, 0.15) 35%, rgba(6, 31, 25, 0) 70%)',
          transform: 'rotate(-12deg)',
        }}
      />

      {/* 3. Atmospheric Depth Haze & Middle-Ground Mist */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 45%, rgba(6, 31, 25, 0.4) 0%, rgba(3, 22, 17, 0.75) 85%)',
        }}
      />

      {/* 4. Selective Readability Overlays (Targeted darker contrast behind Hero and Login Card) */}
      {/* Behind Hero Text (Left side) */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-[48%] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(3, 22, 17, 0.88) 0%, rgba(3, 22, 17, 0.6) 65%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Behind Login Card (Right side) */}
      <div 
        className="absolute inset-y-0 right-0 w-full md:w-[44%] pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(3, 22, 17, 0.84) 0%, rgba(3, 22, 17, 0.45) 60%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Top navbar readability shading */}
      <div 
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(3, 22, 17, 0.82) 0%, rgba(3, 22, 17, 0.3) 65%, transparent 100%)',
        }}
      />

      {/* Bottom screen subtle shadow */}
      <div 
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(3, 22, 17, 0.85) 0%, rgba(3, 22, 17, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* 5. Soft Layered Screen Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 110px 40px rgba(3, 22, 17, 0.7)',
        }}
      />

      {/* 6. Soft Emerald Bokeh Orbs */}
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
        @keyframes gentleDrift {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          30% {
            opacity: 0.75;
          }
          70% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-90px) translateX(24px);
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
            transform: translateY(105vh) rotate(320deg) translateX(50px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-particle-drift,
          .animate-pulse-glow,
          .animate-spin-orbit,
          .animate-spin-orbit-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
