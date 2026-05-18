'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    const supabase = createClient();

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } },
      });
      if (error) setError(error.message);
      else setMessage('Check your email for a confirmation link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🙏</div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome back' : 'Join Paahuney'}
          </h1>
          <p className="text-gray-500 mt-1">
            {mode === 'signin'
              ? 'Sign in to post and connect with the community'
              : 'Create an account to share tips and find companions'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Mode toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            {(['signin', 'signup'] as const).map(m => (
              <button
                key={m} onClick={() => { setMode(m); setError(''); setMessage(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                  mode === m ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
            {message && <p className="text-green-600 text-sm bg-green-50 p-3 rounded-xl">{message}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Please wait...</> : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            By signing up, you agree to our Terms. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
