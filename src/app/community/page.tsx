'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Post, PostType } from '@/types';
import { ThumbsUp, MessageSquare, Plus, X, Loader2 } from 'lucide-react';

const POST_TYPES: { value: PostType | 'all'; label: string; emoji: string; color: string }[] = [
  { value: 'all', label: 'All Posts', emoji: '📋', color: 'bg-gray-100 text-gray-700' },
  { value: 'seeking_companion', label: 'Seeking Companion', emoji: '🤝', color: 'bg-blue-100 text-blue-700' },
  { value: 'tip', label: 'Tips & Tricks', emoji: '💡', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'question', label: 'Questions', emoji: '❓', color: 'bg-purple-100 text-purple-700' },
  { value: 'event', label: 'Events', emoji: '🎉', color: 'bg-green-100 text-green-700' },
];

const MOCK_POSTS: Post[] = [
  {
    id: '1', user_id: 'u1', type: 'tip', title: 'ISKCON Sunday feast is perfect for parents!',
    content: 'Every Sunday at 5pm, ISKCON Silicon Valley has a free feast. The prasad is delicious — all vegetarian. My parents loved it. No registration needed, just show up. They also have Hindi bhajans which parents really connect with.',
    city: 'Sunnyvale', upvotes: 24, created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: '', profiles: { display_name: 'Rahul S.' },
  },
  {
    id: '2', user_id: 'u2', type: 'seeking_companion', title: 'Looking for walk companions at Lake Elizabeth (Fremont)',
    content: 'My parents (68F, 70M) visit every morning at 7:30am at Lake Elizabeth. Looking for other Indian seniors to join their walks. They speak Hindi and Gujarati. Would love to find them some regular walking buddies!',
    city: 'Fremont', upvotes: 18, created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: '', profiles: { display_name: 'Priya M.' },
  },
  {
    id: '3', user_id: 'u3', type: 'question', title: 'Which visitor insurance is best for parents with diabetes?',
    content: 'My mom (65) has Type 2 diabetes and is visiting for 4 months. Looking for insurance that covers acute onset of pre-existing conditions. Has anyone used Patriot America Plus or Atlas America? What was your experience?',
    city: 'San Jose', upvotes: 31, created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: '', profiles: { display_name: 'Ankit P.' },
  },
  {
    id: '4', user_id: 'u4', type: 'event', title: 'Diwali Mela at Fremont Hindu Temple – Nov 1st',
    content: 'The annual Diwali Mela at Fremont Hindu Temple is on November 1st. There will be cultural performances, food stalls (all vegetarian!), handicraft market, and fireworks. Great event for visiting parents. Free entry!',
    city: 'Fremont', upvotes: 45, created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: '', profiles: { display_name: 'Deepa K.' },
  },
  {
    id: '5', user_id: 'u5', type: 'tip', title: 'Great Mall Milpitas morning walk — underrated gem',
    content: 'The Great Mall opens at 10am but you can walk inside from 8am! It\'s AC, flat, safe, and has benches. Many Indian seniors do laps in the morning. My parents have made friends there. Much better than outdoor walks in summer heat!',
    city: 'Milpitas', upvotes: 37, created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: '', profiles: { display_name: 'Sanjay N.' },
  },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PostType | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  // New post form state
  const [formType, setFormType] = useState<PostType>('tip');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCity, setFormCity] = useState('Bay Area');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        let q = supabase.from('posts').select('*, profiles(display_name)').order('created_at', { ascending: false });
        if (filter !== 'all') q = q.eq('type', filter);
        const { data, error } = await q;
        if (error || !data?.length) {
          setPosts(filter === 'all' ? MOCK_POSTS : MOCK_POSTS.filter(p => p.type === filter));
        } else {
          setPosts(data);
        }
      } catch {
        setPosts(filter === 'all' ? MOCK_POSTS : MOCK_POSTS.filter(p => p.type === filter));
      }
      setLoading(false);
    };
    load();
  }, [filter]);

  const handleUpvote = (postId: string) => {
    if (upvoted.has(postId)) return;
    setUpvoted(prev => new Set([...prev, postId]));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    // TODO: persist to Supabase
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;
    setSubmitting(true);
    const newPost: Post = {
      id: Date.now().toString(), user_id: 'guest',
      type: formType, title: formTitle, content: formContent,
      city: formCity, upvotes: 0,
      created_at: new Date().toISOString(), updated_at: '',
      profiles: { display_name: 'You' },
    };
    setPosts(prev => [newPost, ...prev]);
    setFormTitle(''); setFormContent(''); setShowForm(false);
    setSubmitting(false);
    // TODO: supabase.from('posts').insert(...)
  };

  const typeInfo = (type: PostType) => POST_TYPES.find(t => t.value === type)!;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 Community Board</h1>
          <p className="text-gray-500">Tips, companion requests, and local knowledge from families like yours.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> Post
        </button>
      </div>

      {/* New Post Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Share with the community</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {POST_TYPES.filter(t => t.value !== 'all').map(t => (
                  <button
                    key={t.value} type="button"
                    onClick={() => setFormType(t.value as PostType)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formType === t.value ? t.color + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
              <input
                required value={formTitle} onChange={e => setFormTitle(e.target.value)}
                placeholder="Title"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <textarea
                required value={formContent} onChange={e => setFormContent(e.target.value)}
                placeholder="Share your tip, question, or request..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
              />
              <input
                value={formCity} onChange={e => setFormCity(e.target.value)}
                placeholder="City (e.g. Fremont, Sunnyvale)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit" disabled={submitting}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Posting...</> : 'Post to Community'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {POST_TYPES.map(t => (
          <button
            key={t.value} onClick={() => setFilter(t.value as PostType | 'all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === t.value ? (t.color || 'bg-orange-500 text-white') : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => {
            const type = typeInfo(post.type);
            return (
              <div key={post.id} className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 transition-all p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${type.color}`}>
                    {type.emoji} {type.label}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(post.created_at)}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 leading-snug">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>📍 {post.city}</span>
                    {post.profiles?.display_name && (
                      <><span>·</span><span>by {post.profiles.display_name}</span></>
                    )}
                  </div>
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      upvoted.has(post.id)
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-orange-500'
                    }`}
                  >
                    <ThumbsUp size={14} /> {post.upvotes}
                  </button>
                </div>
              </div>
            );
          })}
          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">💬</p>
              <p>No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
