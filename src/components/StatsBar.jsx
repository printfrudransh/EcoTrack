import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Trees, BarChart3 } from 'lucide-react';

export default function StatsBar() {
  const [counts, setCounts] = useState({
    activities: 0,
    users: 0,
    issues: 0,
    campaigns: 0,
  });

  // Animated counter on mount (animates from zero to zero)
  useEffect(() => {
    const targets = {
      activities: 0,
      users: 0,
      issues: 0,
      campaigns: 0,
    };

    let start = 0;
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);

      setCounts({
        activities: Math.round(targets.activities * eased),
        users: Math.round(targets.users * eased),
        issues: Math.round(targets.issues * eased),
        campaigns: Math.round(targets.campaigns * eased),
      });

      if (start >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 'activities',
      icon: Leaf,
      value: `${counts.activities}`,
      label: 'Activities Tracked',
    },
    {
      id: 'users',
      icon: Users,
      value: `${counts.users}`,
      label: 'Active Users',
    },
    {
      id: 'issues',
      icon: Trees,
      value: `${counts.issues}`,
      label: 'Issues Resolved',
    },
    {
      id: 'campaigns',
      icon: BarChart3,
      value: `${counts.campaigns}`,
      label: 'Ongoing Campaigns',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative z-20 w-full max-w-[340px] glass-stat rounded-[20px] p-3.5 sm:p-4 select-none border border-[#59E39C]/30 shadow-[0_15px_35px_rgba(0,0,0,0.55),0_0_20px_rgba(89,227,156,0.12)]"
    >
      {/* 2x2 Grid matching reference image */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 items-start">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-2 group">
              {/* Glowing Icon */}
              <div className="flex-shrink-0 text-[#59E39C] group-hover:text-[#B7FF91] drop-shadow-[0_0_10px_rgba(89,227,156,0.6)] transition-all mt-0.5">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>

              {/* Numbers and Labels */}
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-white font-['Outfit'] tracking-tight group-hover:text-[#B7FF91] transition-colors leading-tight">
                  {item.value}
                </span>
                <span className="text-[11px] text-gray-300 font-normal leading-tight mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
