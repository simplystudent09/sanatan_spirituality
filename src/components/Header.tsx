import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/what-we-done', label: "What We've Done" },
    { to: '/upcoming-events', label: 'Upcoming Events' },
    { to: '/team', label: 'Our Team' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-black/90'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 20 L50 80 M35 35 L50 20 L65 35 M30 50 L70 50 M40 65 C40 65 45 70 50 70 C55 70 60 65 60 65"
                  stroke="#FF6B00"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="50"
                  y="50"
                  fontSize="28"
                  fontWeight="bold"
                  fill="#FF6B00"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  ॐ
                </text>
              </svg>
            </div>
            <div className="hidden md:block">
              <div className="text-white font-bold text-lg">Sanatan Spirituality</div>
              <div className="text-[#FF6B00] text-xs">Foundation</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white hover:text-[#FF6B00] transition-colors duration-300 font-medium ${
                  isActive(link.to) ? 'text-[#FF6B00]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/join"
              className="bg-[#FF6B00] text-white px-6 py-2 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-medium"
            >
              Join Us
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 text-white hover:text-[#FF6B00] transition-colors duration-300 ${
                  isActive(link.to) ? 'text-[#FF6B00]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="block mt-4 bg-[#FF6B00] text-white px-6 py-3 rounded-full hover:bg-[#ff8534] transition-colors duration-300 text-center font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
