import Link from 'next/link';
import { MapPin, BookOpen, Users, Shield, Leaf, Star } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Discover Activities',
    desc: 'Temples, parks, senior groups, and more — filtered by mobility level and vegetarian-friendliness.',
    href: '/activities',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: BookOpen,
    title: 'Resource Hub',
    desc: 'Visitor insurance guides, Indian doctors, emergency contacts, packing checklists — all in one place.',
    href: '/resources',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    title: 'Community Board',
    desc: 'Find travel companions, share tips, and connect with other families in the same situation.',
    href: '/community',
    color: 'bg-green-50 text-green-600',
  },
];

const stats = [
  { label: 'Curated Places', value: '100+', icon: MapPin },
  { label: 'Vegetarian-Friendly', value: '70%', icon: Leaf },
  { label: 'Bay Area Coverage', value: '4 Cities', icon: Shield },
  { label: 'Community Posts', value: 'Growing', icon: Star },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome your <span className="text-orange-500">Paahuney</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your parents are visiting from India. Make it unforgettable.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Discover temples, parks, senior groups, and community connections — curated for immigrant families in the Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/activities"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-lg transition-colors shadow-md"
            >
              Find Activities →
            </Link>
            <Link
              href="/community"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-lg transition-colors border border-gray-200 shadow-sm"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-orange-600">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Everything you need, in one place
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, href, color }) => (
            <Link
              key={title}
              href={href}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              <div className="mt-4 text-orange-500 text-sm font-medium">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Real pain points callout */}
      <section className="bg-orange-500 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">You are not alone 💛</h2>
          <p className="text-orange-100 text-lg leading-relaxed">
            Thousands of families in the Bay Area go through the same challenge — parents visiting from India, feeling isolated, missing their community. Paahuney is here to change that.
          </p>
          <Link
            href="/community"
            className="inline-block mt-6 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
          >
            Connect with others
          </Link>
        </div>
      </section>
    </div>
  );
}
