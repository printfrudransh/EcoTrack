import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#59E39C] flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#B7FF91] flex-shrink-0" />,
  };

  return (
    <AnimatePresence>
      <div className="fixed top-6 right-6 z-50 max-w-sm w-full pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="flex items-start gap-3 p-4 rounded-2xl glass-card border border-[#59E39C]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(89,227,156,0.25)]"
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-white font-['Outfit']">
              {toast.title}
            </h4>
            <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
