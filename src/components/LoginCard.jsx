import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoginCard({ onToast }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (isSignUpMode && !name.trim()) {
      errs.name = 'Please enter your full name';
    }
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      onToast?.({
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve the highlighted fields.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentic frontend response
    setTimeout(() => {
      setIsLoading(false);
      // Trigger festive celebration confetti
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#B7FF91', '#59E39C', '#22C55E', '#ffffff'],
      });

      onToast?.({
        type: 'success',
        title: isSignUpMode ? 'Welcome to EcoTrack!' : 'Logged in successfully!',
        message: isSignUpMode 
          ? `Welcome aboard, ${name || 'Eco Champion'}! (Demo only)`
          : `Signed in as ${email}. Welcome back! (Demo only)`,
      });
    }, 600);
  };

  const handleSocialClick = (provider) => {
    onToast?.({
      type: 'info',
      title: `${provider} Login`,
      message: `Connecting to ${provider} authentication... (Frontend demo)`,
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onToast?.({
      type: 'info',
      title: 'Password Reset',
      message: email 
        ? `A recovery link has been sent to ${email} (Demo)` 
        : 'Please enter your email above and try again.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative z-30 w-full max-w-[420px] select-none"
    >
      {/* 1. Luminous Emerald Ambient Halo behind the Login Card */}
      <div 
        className="absolute -inset-2.5 rounded-[38px] bg-gradient-to-b from-[#59E39C]/22 via-[#061F19]/20 to-[#59E39C]/14 blur-2xl -z-10 pointer-events-none" 
      />

      {/* 2. Glassmorphism Card Container matching reference image */}
      <div className="relative rounded-[28px] sm:rounded-[32px] glass-card p-6 sm:p-8 border border-[#59E39C]/35 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(89,227,156,0.15)]">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Leaf Logo Icon squircle badge matching reference */}
          <div className="mb-2.5 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#061F19]/90 border border-[#59E39C]/40 shadow-[0_0_22px_rgba(89,227,156,0.35)]">
            <svg 
              viewBox="0 0 36 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 drop-shadow-[0_0_10px_rgba(89,227,156,0.9)]"
            >
              <path 
                d="M32 4C32 4 22 5 13 14C4 23 4 32 4 32C4 32 13 32 22 23C31 14 32 4 32 4Z" 
                fill="#59E39C" 
              />
              <path 
                d="M13 23L23 13" 
                stroke="#031611" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Brand Heading */}
          <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight font-['Outfit']">
            EcoTrack
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm mt-1 font-normal">
            {isSignUpMode ? 'Join the global green movement.' : 'Login to make a difference.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Sign Up Name Field */}
          <AnimatePresence>
            {isSignUpMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-1 overflow-hidden"
              >
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400">
                    <Sparkles className="w-5 h-5 text-[#59E39C]" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                    }}
                    placeholder="Full name"
                    className={`w-full bg-[#061F19]/85 text-white placeholder-gray-400 text-sm sm:text-base rounded-xl pl-12 pr-4 py-3 border transition-all duration-200 focus:outline-none ${
                      errors.name 
                        ? 'border-red-400 focus:ring-1 focus:ring-red-400' 
                        : 'border-[#2D5A4C]/70 focus:border-[#59E39C] focus:ring-1 focus:ring-[#59E39C]/60'
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-400 flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Address Field */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <Mail className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#59E39C]" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                placeholder="Email address"
                className={`w-full bg-[#061F19]/85 text-white placeholder-gray-400 text-sm sm:text-base rounded-xl pl-12 pr-4 py-3 border transition-all duration-200 focus:outline-none ${
                  errors.email 
                    ? 'border-red-400 focus:ring-1 focus:ring-red-400' 
                    : 'border-[#2D5A4C]/70 focus:border-[#59E39C] focus:ring-1 focus:ring-[#59E39C]/60'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-400 flex items-center gap-1 pl-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                }}
                placeholder="Password"
                className={`w-full bg-[#061F19]/85 text-white placeholder-gray-400 text-sm sm:text-base rounded-xl pl-12 pr-12 py-3 border transition-all duration-200 focus:outline-none ${
                  errors.password 
                    ? 'border-red-400 focus:ring-1 focus:ring-red-400' 
                    : 'border-[#2D5A4C]/70 focus:border-[#59E39C] focus:ring-1 focus:ring-[#59E39C]/60'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-400 flex items-center gap-1 pl-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                rememberMe 
                  ? 'bg-[#59E39C] border-[#59E39C] text-[#031611]' 
                  : 'border-gray-500 bg-transparent'
              }`}>
                {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#59E39C] hover:text-[#B7FF91] hover:underline transition-colors focus:outline-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button (Bright Lime-to-Emerald Gradient with Glow) */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl glow-btn-primary font-bold text-base tracking-wide mt-2 cursor-pointer font-['Outfit'] shadow-[0_0_25px_rgba(183,255,145,0.6)] hover:shadow-[0_0_35px_rgba(183,255,145,0.85)]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#031611] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUpMode ? 'Sign Up' : 'Login'}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </>
            )}
          </button>

          {/* Social Login Divider */}
          <div className="relative flex items-center justify-center my-1.5">
            <div className="border-t border-[#2D5A4C]/60 w-full" />
            <span className="bg-[#0B2B22] px-3 text-xs text-gray-400 font-normal">
              or continue with
            </span>
            <div className="border-t border-[#2D5A4C]/60 w-full" />
          </div>

          {/* Social Login 3 Buttons: Google, GitHub, Microsoft */}
          <div className="grid grid-cols-3 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleSocialClick('Google')}
              className="flex items-center justify-center py-2.5 rounded-xl bg-[#061F19]/85 border border-[#2D5A4C]/70 hover:border-[#59E39C]/70 hover:bg-[#061F19] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_14px_rgba(89,227,156,0.25)]"
              title="Continue with Google"
              aria-label="Continue with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={() => handleSocialClick('GitHub')}
              className="flex items-center justify-center py-2.5 rounded-xl bg-[#061F19]/85 border border-[#2D5A4C]/70 hover:border-[#59E39C]/70 hover:bg-[#061F19] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_14px_rgba(89,227,156,0.25)] text-white"
              title="Continue with GitHub"
              aria-label="Continue with GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </button>

            {/* Microsoft Button */}
            <button
              type="button"
              onClick={() => handleSocialClick('Microsoft')}
              className="flex items-center justify-center py-2.5 rounded-xl bg-[#061F19]/85 border border-[#2D5A4C]/70 hover:border-[#59E39C]/70 hover:bg-[#061F19] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_14px_rgba(89,227,156,0.25)]"
              title="Continue with Microsoft"
              aria-label="Continue with Microsoft"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
            </button>
          </div>

          {/* Footer Toggle */}
          <div className="text-center pt-2 text-xs sm:text-sm text-gray-300">
            <span>{isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}</span>
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setErrors({});
              }}
              className="text-[#59E39C] hover:text-[#B7FF91] font-semibold hover:underline transition-colors focus:outline-none cursor-pointer"
            >
              {isSignUpMode ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
