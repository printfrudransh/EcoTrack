import React, { useMemo } from 'react';
import forestBg from '../assets/forest-canopy.png';

export default function BackgroundEnvironment() {
  // Rich multi-depth floating particles: luminous mint, neon emerald, and warm golden firefly embers
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      // 20% golden sunlit particles, 40% neon lime, 40% mint green
      const rand = Math.random();
      let color = 'rgba(89, 227, 156, 0.85)';
      let glow = 'rgba(89, 227, 156, 0.9)';
      let size = Math.random() * 3 + 2;

      if (rand < 0.22) {
        // Golden sunlit ember
        color = 'rgba(254, 240, 138, 0.95)';
        glow = 'rgba(250, 204, 21, 0.85)';
        size = Math.random() * 3 + 2.5;
      } else if (rand < 0.6) {
        // Bright lime green
        color = 'rgba(183, 255, 145, 0.95)';
        glow = 'rgba(183, 255, 145, 0.85)';
      }

      return {
        id: i,
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 82,
        size,
        color,
        glow,
        duration: Math.random() * 10 + 16, // 16s - 26s
        delay: Math.random() * 8,
      };
    });
  }, []);

  // Floating canopy leaves drifting through dappled sunlight
  const leaves = useMemo(() => {
    return [
      { id: 1, left: 12, duration: 24, delay: 0, scale: 0.85, rotate: 25 },
      { id: 2, left: 38, duration: 32, delay: 6, scale: 0.65, rotate: -15 },
      { id: 3, left: 76, duration: 28, delay: 12, scale: 0.9, rotate: 35 },
      { id: 4, left: 88, duration: 30, delay: 4, scale: 0.72, rotate: -20 },
    ];
  }, []);

  // Soft atmospheric bokeh discs
  const bokehOrbs = useMemo(() => {
    return [
      { id: 1, top: '12%', left: '15%', size: 180, color: 'rgba(89, 227, 156, 0.14)', duration: 16 },
      { id: 2, top: '55%', left: '22%', size: 240, color: 'rgba(34, 197, 94, 0.1)', duration: 20 },
      { id: 3, top: '20%', right: '22%', size: 220, color: 'rgba(253, 224, 71, 0.12)', duration: 15 }, // Warm golden-green bokeh
      { id: 4, bottom: '18%', right: '12%', size: 260, color: 'rgba(89, 227, 156, 0.09)', duration: 22 },
    ];
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Realistic Lush Forest Canopy Background (Crisp, detailed foliage with warm golden-green vibrance) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-100"
        style={{
          backgroundImage: `url(${forestBg})`,
          filter: 'contrast(1.08) brightness(0.98) saturate(1.15)',
        }}
      />

      {/* 2. Golden-Green Sunbeams / Volumetric Light Rays streaming from the upper canopy */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 overflow-hidden">
        {/* Ray 1: Golden-lime sunbeam */}
        <div 
          className="absolute -top-36 right-1/4 w-52 h-[125vh] origin-top -rotate-[25deg] animate-ray-shimmer"
          style={{
            background: 'linear-gradient(to bottom, rgba(254, 240, 138, 0.5) 0%, rgba(183, 255, 145, 0.28) 35%, rgba(89, 227, 156, 0.1) 65%, transparent 85%)',
            filter: 'blur(18px)',
          }}
        />
        {/* Ray 2: Vibrant emerald beam */}
        <div 
          className="absolute -top-32 right-[14%] w-64 h-[125vh] origin-top -rotate-[26deg] animate-ray-shimmer"
          style={{
            background: 'linear-gradient(to bottom, rgba(183, 255, 145, 0.45) 0%, rgba(89, 227, 156, 0.22) 40%, rgba(6, 31, 25, 0) 80%)',
            filter: 'blur(24px)',
            animationDelay: '3.5s',
          }}
        />
        {/* Ray 3: Diffuse ambient golden glow across top right foliage */}
        <div 
          className="absolute -top-20 right-0 w-[550px] h-[450px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 85% 10%, rgba(253, 224, 71, 0.28) 0%, rgba(183, 255, 145, 0.18) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* 3. Middle-Ground Depth Haze (Soft emerald mist creating natural depth of field) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6, 31, 25, 0.3) 0%, rgba(3, 22, 17, 0.6) 80%, rgba(3, 22, 17, 0.85) 100%)',
        }}
      />

      {/* 4. Selective Readability Overlays (Targeted darker shading behind text while leaving foliage vibrant) */}
      {/* Left side: Behind Hero Text & Feature Buttons */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-[48%] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(3, 22, 17, 0.86) 0%, rgba(3, 22, 17, 0.58) 65%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Right side: Behind Login Card */}
      <div 
        className="absolute inset-y-0 right-0 w-full md:w-[42%] pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(3, 22, 17, 0.8) 0%, rgba(3, 22, 17, 0.44) 60%, rgba(3, 22, 17, 0) 100%)',
        }}
      />

      {/* Top Navbar Area Shading */}
      <div 
        className="absolute top-0 inset-x-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(3, 22, 17, 0.78) 0%, rgba(3, 22, 17, 0.2) 70%, transparent 100%)',
        }}
      />

      {/* Bottom Shading */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(3, 22, 17, 0.8) 0%, rgba(3, 22, 17, 0.15) 75%, transparent 100%)',
        }}
      />

      {/* 5. Soft Layered Screen Edge Vignette (Framing corner leaves in deep forest shadow) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 95px 25px rgba(3, 22, 17, 0.6)',
        }}
      />

      {/* 6. Soft Emerald and Golden Bokeh Discs */}
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

      {/* 7. Subtle Drifting Firefly Bokeh Particles (Mint, Lime & Golden Embers) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.glow}, 0 0 ${p.size * 5}px ${p.glow}`,
            animation: `gentleDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 8. Elegant Falling Canopy Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none opacity-30"
          style={{
            left: `${leaf.left}%`,
            top: `-5%`,
            transform: `scale(${leaf.scale}) rotate(${leaf.rotate}deg)`,
            animation: `canopyLeafFall ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#59E39C]/75 drop-shadow-[0_0_8px_rgba(89,227,156,0.3)]">
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
            opacity: 0.35;
            transform: rotate(-25deg) translateY(0px);
          }
          50% {
            opacity: 0.55;
            transform: rotate(-24.5deg) translateY(-6px);
          }
        }

        .animate-ray-shimmer {
          animation: rayShimmer 9s ease-in-out infinite;
        }

        @keyframes gentleDrift {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          35% {
            opacity: 0.85;
          }
          70% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-90px) translateX(22px);
            opacity: 0;
          }
        }

        @keyframes canopyLeafFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          85% {
            opacity: 0.35;
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
          .animate-spin-orbit-reverse,
          .animate-ray-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
