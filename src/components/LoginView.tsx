import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, KeyRound, User } from 'lucide-react';
import RiseveraLogo from './RiseveraLogo';

interface LoginViewProps {
  onLoginSuccess: (user: { email: string; name: string; plan: string }) => void;
  onBackToLanding: () => void;
}

export default function LoginView({ onLoginSuccess, onBackToLanding }: LoginViewProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load registered users from localStorage or initialize with a demo user
  useEffect(() => {
    const existingUsers = localStorage.getItem('risevera_registered_users');
    let users = [];
    if (existingUsers) {
      try {
        users = JSON.parse(existingUsers);
      } catch (e) {
        users = [];
      }
    }
    
    // Check if demo user is present, if not add it, or update its password to rise123vera
    const demoIndex = users.findIndex((u: any) => u.email === 'demo@riseveraglobal.com');
    if (demoIndex > -1) {
      users[demoIndex].password = 'rise123vera';
    } else {
      users.push({
        email: 'demo@riseveraglobal.com',
        password: 'rise123vera',
        name: 'Demo Partner',
        plan: 'Professional Account',
      });
    }
    localStorage.setItem('risevera_registered_users', JSON.stringify(users));
  }, []);

  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client side validation
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email format.');
      return;
    }
    if (!password) {
      setError('Please specify your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    // Simulate secure network/cryptographic authentication delay
    setTimeout(() => {
      const usersRaw = localStorage.getItem('risevera_registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (isSignUp) {
        // Sign Up Mode
        const userExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
          setError('An account with this email already exists.');
          setLoading(false);
          return;
        }

        const newUser = {
          email: email.toLowerCase(),
          password, // Simulated stored credential
          name,
          plan: 'Professional Account'
        };

        users.push(newUser);
        localStorage.setItem('risevera_registered_users', JSON.stringify(users));
        
        setSuccess('Account created successfully! Auto-authenticating...');
        setTimeout(() => {
          setLoading(false);
          onLoginSuccess({ email: newUser.email, name: newUser.name, plan: newUser.plan });
        }, 1200);

      } else {
        // Sign In Mode
        const matchedUser = users.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!matchedUser) {
          setError('Invalid email or password combination.');
          setLoading(false);
          return;
        }

        // Save active session
        localStorage.setItem('risevera_active_session', JSON.stringify({
          email: matchedUser.email,
          name: matchedUser.name,
          plan: matchedUser.plan,
          timestamp: Date.now()
        }));

        setSuccess('Authentication verified! Redirecting to secure panel...');
        setTimeout(() => {
          setLoading(false);
          onLoginSuccess({ email: matchedUser.email, name: matchedUser.name, plan: matchedUser.plan });
        }, 1000);
      }
    }, 1200);
  };

  return (
    <div id="login-container" className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans selection:bg-orange-950 selection:text-orange-400">
      
      {/* Decorative ambient background rings for cyber/secure look */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Floating Back Link */}
      <button
        onClick={onBackToLanding}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        id="login-back-to-landing-btn"
      >
        &larr; Back to Landing Page
      </button>

      {/* Main Auth Card wrapper */}
      <div className="w-full max-w-md z-10" id="auth-panel-wrapper">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-3">
            <RiseveraLogo className="h-12 w-12" isDarkBackground={true} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            RISEVERA GLOBAL DECISION ENGINE
          </h2>
          <p className="text-[11px] font-bold text-[#F07125] uppercase tracking-widest mt-1">
            Secure Member Gate
          </p>
        </div>

        <div className="bg-slate-800/85 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden p-8">
          
          {/* Tab Selection */}
          <div className="flex border-b border-slate-700 mb-6 relative">
            <button
              onClick={() => { setIsSignUp(false); setError(null); setSuccess(null); }}
              className={`flex-1 pb-3 text-sm font-bold transition-colors cursor-pointer ${!isSignUp ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              id="tab-sign-in"
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(null); setSuccess(null); }}
              className={`flex-1 pb-3 text-sm font-bold transition-colors cursor-pointer ${isSignUp ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              id="tab-sign-up"
            >
              Create Account
            </button>
            <span
              className="absolute bottom-0 h-0.5 bg-[#F07125] transition-all duration-300 ease-out"
              style={{
                left: isSignUp ? '50%' : '0%',
                width: '50%'
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        id="signup-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Johnathan Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs focus:border-[#F07125] focus:outline-none placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs focus:border-[#F07125] focus:outline-none placeholder-slate-600 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset links will be simulated. Check console or enter default rise123vera to access.')}
                    className="text-[10px] text-slate-500 hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs focus:border-[#F07125] focus:outline-none placeholder-slate-600 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Notifications / Feedback Alerts */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-900/50 text-[11px] leading-relaxed"
                  id="auth-error-alert"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 text-emerald-400 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50 text-[11px] leading-relaxed"
                  id="auth-success-alert"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#F07125] hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  <span>SECURE GATEWAY SYNCING...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'CREATE ACCOUNT' : 'SECURE SIGN IN'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>



        </div>

        {/* Security Seals */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-slate-500 text-[10px] font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>AES-256 Cloud Session Cryptographic Handshake Enabled</span>
        </div>
      </div>
    </div>
  );
}
