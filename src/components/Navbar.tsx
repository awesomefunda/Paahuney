'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, BookOpen, Users, Home, LogIn } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/activities', label: 'Activities', icon: MapPin },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/community', label: 'Community', icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-600">
          <span className="text-2xl">🙏</span>
          <span>Paahuney</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/auth"
          className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <LogIn size={16} />
          Sign In
        </Link>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden border-t border-gray-100 flex justify-around py-2 bg-white">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
              pathname === href ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
