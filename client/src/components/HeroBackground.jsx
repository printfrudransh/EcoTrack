import React, { useEffect, useRef } from 'react';
import { Recycle, Users, Leaf, AlertTriangle, BarChart3 } from 'lucide-react';

export default function HeroBackground({ onBadgeClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system: glowing bioluminescent dust and drifting leaves
    const particles = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2, // drifting upwards
        opacity: Math.random() * 0.7 + 0.2,
        isLeaf: i % 4 === 0, // every 4th particle is a tiny stylized leaf
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        // Wrap around
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.isLeaf) {
          // Draw subtle stylized miniature leaf
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2, p.size, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity * 0.5})`;
          ctx.fill();
        } else {
          // Draw glowing particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(134, 239, 172, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#22c55e';
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="hero-background-root"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* 1. Cinematic Dark Forest Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/forest-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.88,
          filter: 'brightness(0.7) contrast(1.15)'
        }}
      />

      {/* Atmospheric Dark & Vignette Gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 62% 48%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
            linear-gradient(to right, rgba(5, 16, 11, 0.94) 0%, rgba(5, 16, 11, 0.7) 45%, rgba(5, 16, 11, 0.5) 75%, rgba(5, 16, 11, 0.85) 100%),
            linear-gradient(to bottom, rgba(5, 16, 11, 0.8) 0%, transparent 20%, transparent 75%, rgba(5, 16, 11, 0.95) 100%)
          `
        }}
      />

      {/* 2. Interactive Canvas for Glowing Particles & Drifting Leaves */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />

      {/* 3. Center-Right Glowing Earth Globe + Orbital Lines + Floating Icons */}
      <div
        className="globe-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '68%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '560px',
          zIndex: 2,
          pointerEvents: 'auto'
        }}
      >
        {/* Outer radial green atmosphere aura */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.42) 0%, rgba(16, 185, 129, 0.22) 45%, transparent 70%)',
            filter: 'blur(25px)',
            animation: 'pulseGlow 6s ease-in-out infinite'
          }}
        />

        {/* High-res Glowing Earth Image with rounded circular clip & glow border */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(34, 197, 94, 0.55), inset 0 0 40px rgba(34, 197, 94, 0.4)',
            border: '2px solid rgba(74, 222, 128, 0.6)'
          }}
        >
          <img
            src="/assets/earth-centerpiece.jpg"
            alt="Glowing Earth Sustainability Centerpiece"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: 'floatGlobe 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* Orbital SVG Lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          viewBox="0 0 560 560"
        >
          <defs>
            <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Elliptical Orbital Path 1 */}
          <ellipse
            cx="280"
            cy="280"
            rx="235"
            ry="115"
            fill="none"
            stroke="url(#orbitGrad1)"
            strokeWidth="1.8"
            strokeDasharray="6 4"
            style={{
              transformOrigin: '280px 280px',
              transform: 'rotate(-28deg)',
              filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))'
            }}
          />

          {/* Elliptical Orbital Path 2 */}
          <ellipse
            cx="280"
            cy="280"
            rx="245"
            ry="125"
            fill="none"
            stroke="url(#orbitGrad2)"
            strokeWidth="1.6"
            style={{
              transformOrigin: '280px 280px',
              transform: 'rotate(40deg)',
              filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.7))'
            }}
          />
        </svg>

        {/* 5 Glowing Circular Badges placed along orbit paths matching reference */}
        
        {/* Badge 1: Community (Top-Left of Globe) */}
        <div
          onClick={() => onBadgeClick && onBadgeClick('campaigns')}
          title="Community & Campaigns"
          className="orbit-badge"
          style={{
            position: 'absolute',
            top: '75px',
            left: '175px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(8, 28, 18, 0.88)',
            border: '2px solid #4ade80',
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.75), inset 0 0 8px rgba(74, 222, 128, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'badgeBob 4.2s ease-in-out infinite'
          }}
        >
          <Users size={22} color="#4ade80" />
        </div>

        {/* Badge 2: Leaf / Activity (Left Center) */}
        <div
          onClick={() => onBadgeClick && onBadgeClick('activities')}
          title="Track Activities"
          className="orbit-badge"
          style={{
            position: 'absolute',
            top: '215px',
            left: '88px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(8, 28, 18, 0.88)',
            border: '2px solid #4ade80',
            boxShadow: '0 0 22px rgba(74, 222, 128, 0.8), inset 0 0 10px rgba(74, 222, 128, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'badgeBob 3.6s ease-in-out 0.8s infinite'
          }}
        >
          <Leaf size={24} color="#86efac" />
        </div>

        {/* Badge 3: Recycling (Lower-Left) */}
        <div
          onClick={() => onBadgeClick && onBadgeClick('activities')}
          title="Waste & Recycling Action"
          className="orbit-badge"
          style={{
            position: 'absolute',
            bottom: '120px',
            left: '110px',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(8, 28, 18, 0.88)',
            border: '2px solid #22c55e',
            boxShadow: '0 0 22px rgba(34, 197, 94, 0.8), inset 0 0 10px rgba(34, 197, 94, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'badgeBob 4.8s ease-in-out 1.5s infinite'
          }}
        >
          <Recycle size={26} color="#4ade80" />
        </div>

        {/* Badge 4: Analytics (Bottom-Center) */}
        <div
          onClick={() => onBadgeClick && onBadgeClick('impact')}
          title="Estimated Environmental Impact"
          className="orbit-badge"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '260px',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(8, 28, 18, 0.88)',
            border: '2.5px solid #4ade80',
            boxShadow: '0 0 26px rgba(74, 222, 128, 0.85), inset 0 0 12px rgba(74, 222, 128, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'badgeBob 4.5s ease-in-out 0.4s infinite'
          }}
        >
          <BarChart3 size={28} color="#4ade80" />
        </div>

        {/* Badge 5: Hazard / Issue Alert (Lower-Right) */}
        <div
          onClick={() => onBadgeClick && onBadgeClick('issues')}
          title="Report Environmental Hazards"
          className="orbit-badge"
          style={{
            position: 'absolute',
            bottom: '105px',
            right: '90px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(8, 28, 18, 0.88)',
            border: '2px solid #facc15',
            boxShadow: '0 0 22px rgba(250, 204, 21, 0.75), inset 0 0 10px rgba(250, 204, 21, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'badgeBob 3.9s ease-in-out 1.1s infinite'
          }}
        >
          <AlertTriangle size={24} color="#facc15" />
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        .orbit-badge {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .orbit-badge:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 0 30px rgba(74, 222, 128, 1) !important;
        }
        @media (max-width: 1100px) {
          .globe-container {
            left: 50% !important;
            transform: translate(-50%, -50%) scale(0.85) !important;
            opacity: 0.65;
          }
        }
        @media (max-width: 768px) {
          .globe-container {
            left: 50% !important;
            transform: translate(-50%, -50%) scale(0.65) !important;
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}
