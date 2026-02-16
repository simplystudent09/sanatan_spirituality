import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  BookOpen,
  Music,
  GraduationCap,
  MapPin as Mountain,
  Scroll,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pillars = [
    { name: 'धर्म', translation: 'Dharma', description: 'Righteous Living' },
    { name: 'योग', translation: 'Yoga', description: 'Union with Divine' },
    { name: 'विद्या', translation: 'Vidya', description: 'Sacred Knowledge' },
    { name: 'ज्ञान', translation: 'Jnana', description: 'Wisdom & Insight' },
  ];

  const services = [
    {
      icon: Heart,
      name: 'Ashtanga Yoga',
      description: 'Traditional eight-limbed yoga practice'
    },
    {
      icon: Sparkles,
      name: 'Kundalini Meditation',
      description: 'Awaken your inner spiritual energy'
    },
    {
      icon: Music,
      name: 'Spiritual Events',
      description: 'Sacred gatherings and celebrations'
    },
    {
      icon: Music,
      name: 'Kirtans & Bhajans',
      description: 'Devotional singing and chanting'
    },
    {
      icon: GraduationCap,
      name: 'Sanatan Gurukul',
      description: 'Traditional spiritual education'
    },
    {
      icon: Mountain,
      name: 'Spiritual Yatras',
      description: 'Sacred pilgrimage journeys'
    },
    {
      icon: Scroll,
      name: 'Ramayan & Gita',
      description: 'Ancient scripture discourses'
    },
    {
      icon: BookOpen,
      name: 'Upanishads Discourse',
      description: 'Vedic philosophy teachings'
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2597205/pexels-photo-2597205.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div
          className={`relative z-10 text-center transform transition-all duration-1000 px-4 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 animate-pulse">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="90" fill="#FF6B00" opacity="0.1" />
              <path
                d="M100 40 L100 160 M70 70 L100 40 L130 70 M60 100 L140 100 M80 130 C80 130 90 140 100 140 C110 140 120 130 120 130"
                stroke="#FF6B00"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="100"
                y="105"
                fontSize="56"
                fontWeight="bold"
                fill="#FF6B00"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ॐ
              </text>
              <circle cx="100" cy="100" r="85" stroke="#FF6B00" strokeWidth="2" opacity="0.3" />
              <circle cx="100" cy="100" r="75" stroke="#FF6B00" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Sanatan Spirituality Foundation
          </h1>

          <p className="text-4xl sm:text-5xl md:text-7xl text-[#FF6B00] font-bold mb-8 tracking-wide devanagari">
            संस्कार
          </p>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto px-4">
            Preserving ancient wisdom, illuminating modern paths to spiritual enlightenment
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              to="/join"
              className="bg-[#FF6B00] text-white px-8 py-4 rounded-full hover:bg-[#ff8534] transition-all duration-300 text-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-[#FF6B00]/50"
            >
              <span>Join Us</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/upcoming-events"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-lg font-semibold shadow-lg"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            About the Foundation
          </h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-10" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-8 px-4">
            Sanatan Spirituality Foundation is a leading Sanatan spiritual non profit organisation operating across the UK and Bharat, dedicated to spreading spiritual awareness, Vedic knowledge, and Dharmic values. SSF designs and hosts large scale cultural and devotional events that uplift communities, inspire youth, and preserve ancient traditions in a contemporary setting.
          </p>
          <h3 className="text-xl font-semibold text-white mb-4 text-center">SSF&apos;s core pillars include:</h3>
          <ul className="space-y-3 max-w-2xl mx-auto mb-8 list-none">
            <li className="flex items-start gap-3 text-gray-300 text-base sm:text-lg">
              <span className="text-[#FF6B00] flex-shrink-0">•</span>
              <span>Promoting Sanatan Dharma and Vedic education</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-base sm:text-lg">
              <span className="text-[#FF6B00] flex-shrink-0">•</span>
              <span>Creating youth centric spiritual programmes and platforms</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-base sm:text-lg">
              <span className="text-[#FF6B00] flex-shrink-0">•</span>
              <span>Supporting community development and service initiatives</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300 text-base sm:text-lg">
              <span className="text-[#FF6B00] flex-shrink-0">•</span>
              <span>Preserving cultural and spiritual heritage through festivals and gatherings</span>
            </li>
          </ul>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto px-4">
            With a track record of high quality, well organised, and impactful devotional events, SSF is trusted by devotees, families, and partner organisations alike.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-4" />
          <p className="text-[#FF6B00] text-lg font-semibold text-center mb-10">Acharya Abhi Yogi ji</p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto px-4">
            Acharya Abhi Yogi ji is the Founder of Sanatan Spirituality Foundation and Co-founder of Sumarti Ashram in Bharat, working alongside Jagadguru Swami Sandeepani ji Maharaj. A dedicated Sanatan Dharma guide and spiritual educator, he leads multiple initiatives for Vedic and Sanatan education across the UK, Bharat, and the USA. For over a decade, he has been a Kundalini Yogi, freely teaching this sacred and hidden science to seekers around the world. Through his Sanatan Gurukul and Simply Sanatan platforms, he promotes Shastras, Sanskrit learning, Sanatan values, and spiritual literacy for children and adults. His mission is to ensure Sanatan and Vedic literacy for every Sanatani child and to spread the understanding that the true purpose of life is understood &amp; begins after spiritual awakening and self-realisation. 🕉️🙏
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Four Pillars of Sanatan Dharma
          </h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-black p-8 rounded-full aspect-square flex flex-col items-center justify-center border-4 border-[#FF6B00]/20 group-hover:border-[#FF6B00] transition-all duration-500 shadow-xl group-hover:shadow-[#FF6B00]/30">
                  <div className="absolute inset-0 rounded-full bg-[#FF6B00]/5 group-hover:bg-[#FF6B00]/10 transition-all duration-500" />
                  <p className="text-6xl md:text-7xl text-[#FF6B00] font-bold mb-2 relative z-10 devanagari">
                    {pillar.name}
                  </p>
                  <p className="text-xl text-white font-semibold relative z-10">
                    {pillar.translation}
                  </p>
                  <p className="text-sm text-gray-400 mt-2 relative z-10">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-[#FF6B00] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-2 border-[#FF6B00] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-[#FF6B00] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[#FF6B00]/20"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] transition-all duration-300">
                    <Icon className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Shiv Festival
              </h2>
              <div className="w-24 h-1 bg-[#FF6B00] mb-6" />
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Experience the divine celebration of Lord Shiva through sacred rituals,
                meditation, and spiritual discourse. Join thousands of devotees in honoring
                the cosmic consciousness.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">🔱</div>
                <div>
                  <p className="text-2xl font-bold text-[#FF6B00]">Mahashivratri 2026</p>
                  <p className="text-gray-400">The Great Night of Shiva</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border-2 border-[#FF6B00]/30 shadow-2xl">
              <div className="text-center">
                <div className="text-8xl mb-4">🕉️</div>
                <h3 className="text-3xl font-bold text-white mb-4">Santon ki Vani</h3>
                <p className="text-gray-300 mb-6">
                  Sacred wisdom from enlightened masters, sharing timeless teachings
                  that illuminate the path to self-realization.
                </p>
                <Link
                  to="/upcoming-events"
                  className="inline-flex items-center space-x-2 bg-[#FF6B00] text-white px-6 py-3 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold"
                >
                  <MessageCircle size={20} />
                  <span>Listen to Discourses</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of seekers and discover the profound wisdom of Sanatan Dharma
          </p>
          <Link
            to="/upcoming-events"
            className="inline-flex items-center space-x-2 bg-[#FF6B00] text-white px-10 py-4 rounded-full hover:bg-[#ff8534] transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-[#FF6B00]/50"
          >
            <span>Explore Upcoming Events</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
