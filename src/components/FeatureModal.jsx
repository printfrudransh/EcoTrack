import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function FeatureModal({ feature, onClose }) {
  if (!feature) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-[#59E39C]/40 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#061F19]/80 text-gray-400 hover:text-white border border-[#59E39C]/20 hover:border-[#59E39C]/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#061F19] border border-[#59E39C]/40 flex items-center justify-center text-[#59E39C] shadow-[0_0_15px_rgba(89,227,156,0.3)]">
              {feature.icon ? <feature.icon className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#59E39C] font-semibold">
                Platform Module
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                {feature.title || feature.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {feature.description ||
              'Empowering individuals, enterprises, and local communities to monitor green progress and build sustainable habits.'}
          </p>

          {/* Key Highlights */}
          <div className="space-y-2.5 mb-6 bg-[#061F19]/60 p-4 rounded-xl border border-[#2D5A4C]/40">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-[#59E39C] flex-shrink-0" />
              <span>Real-time environmental metrics & verified reporting</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-[#59E39C] flex-shrink-0" />
              <span>Interactive geo-tagged map with community hotspots</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-[#59E39C] flex-shrink-0" />
              <span>Gamified carbon reduction rewards and badges</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl glow-btn-primary font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer font-['Outfit']"
            >
              <span>Explore Module</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-[#061F19]/80 border border-[#2D5A4C]/50 text-gray-300 hover:text-white hover:border-[#59E39C]/40 text-sm font-medium transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
