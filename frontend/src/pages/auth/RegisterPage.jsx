import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../../components/common/Card';
import { ButtonPrimary } from '../../components/common/Button';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !displayName) {
      setError('Sabhi fields bharna compulsory hai.');
      return;
    }

    if (password.length < 6) {
      setError('Password kam se kam 6 character ka hona chahiye.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords match nahi kar rahe.');
      return;
    }

    setSubmitting(true);
    const result = await register(email, password, displayName);
    setSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-plasma-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 via-yellow-300 to-plasma-400 bg-clip-text text-transparent font-mono mb-2">
            PRODUCTIVITY<span className="text-neutral-50 font-bold">OS</span>
          </h1>
          <p className="text-sm text-neutral-400 font-body">
            RPG-based productivity cockpit mein enter karein.
          </p>
        </div>

        <GlassCard className="border border-white/10 shadow-2xl relative">
          <h2 className="text-2xl font-bold text-center text-neutral-50 font-mono mb-6 uppercase tracking-wide">
            🎮 Initial Setup
          </h2>

          {error && (
            <div className="mb-5 p-3 rounded-lg border border-danger-500/20 bg-danger-500/10 text-danger-400 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                Warrior Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-void border border-white/10 rounded-lg px-4 py-2 text-neutral-100 font-body placeholder-neutral-600 focus:outline-none focus:border-primary-400/50 focus:shadow-[0_0_15px_rgba(255,173,0,0.1)] transition-all duration-200"
                placeholder="Productivity Master"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-void border border-white/10 rounded-lg px-4 py-2 text-neutral-100 font-body placeholder-neutral-600 focus:outline-none focus:border-primary-400/50 focus:shadow-[0_0_15px_rgba(255,173,0,0.1)] transition-all duration-200"
                placeholder="warrior@productivityos.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-void border border-white/10 rounded-lg px-4 py-2 text-neutral-100 font-body placeholder-neutral-600 focus:outline-none focus:border-primary-400/50 focus:shadow-[0_0_15px_rgba(255,173,0,0.1)] transition-all duration-200"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-void border border-white/10 rounded-lg px-4 py-2 text-neutral-100 font-body placeholder-neutral-600 focus:outline-none focus:border-primary-400/50 focus:shadow-[0_0_15px_rgba(255,173,0,0.1)] transition-all duration-200"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <ButtonPrimary
              type="submit"
              disabled={submitting}
              className="w-full mt-3 py-3"
            >
              {submitting ? 'Creating Character...' : 'Create Account 🚀'}
            </ButtonPrimary>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-neutral-500 font-body">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-bold transition-colors duration-150"
              >
                Authenticate Here
              </Link>
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
