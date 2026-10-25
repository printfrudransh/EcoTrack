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

  // Animated counter on mount
  useEffect(() => {
    const targets = {
      activities: 10,
      users: 2,
      issues: 500,
      campaigns: 30,
    };

    let start = 0;
    const duration = 1600; // ms
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
      value: `${counts.activities}K+`,
      label: 'Activities Tracked',
    },
    {
      id: 'users',
      icon: Users,
      value: `${counts.users}K+`,
      label: 'Active Users',
    },
    {
      id: 'issues',
      icon: Trees,
      value: `${counts.issues}+`,
      label: 'Issues Resolved',
    },
    {
      id: 'campaigns',
      icon: BarChart3,
      value: `${counts.campaigns}+`,
      label: 'Ongoing Campaigns',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative z-20 w-full max-w-2xl glass-stat rounded-2xl sm:rounded-3xl py-3 px-4 sm:px-6 select-none"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 items-center">
        {stats.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <React.Fragment key={item.id}>
              <div className="flex items-center gap-2.5 sm:gap-3 group">
                {/* Glowing Icon */}
                <div className="flex-shrink-0 text-[#59E39C] group-hover:text-[#B7FF91] drop-shadow-[0_0_8px_rgba(89,227,156,0.5)] transition-all">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                </div>

                {/* Numbers and Labels */}
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-white font-['Outfit'] tracking-tight group-hover:text-[#B7FF91] transition-colors leading-none">
                    {item.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-300 font-normal mt-0.5 leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Vertical divider on desktop, hidden on the last item */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block h-7 w-[1px] bg-[#59E39C]/20 mx-auto" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}
