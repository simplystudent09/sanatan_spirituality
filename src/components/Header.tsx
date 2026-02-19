import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';

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
    { to: '/team', label: 'Our Story' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-maroon shadow-lg' : 'bg-maroon/95'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Sanatan Spirituality Foundation"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-white text-xl md:text-2xl font-bold leading-tight">
                Sanatan Spirituality
              </span>
              <span className="text-primary text-lg md:text-xl font-semibold leading-tight">
                Foundation
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white hover:text-primary transition-colors duration-300 font-medium ${
                  isActive(link.to) ? 'text-primary' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 mr-2">
              <a
                href="https://facebook.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@abhiyogishow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <Link
              to="/join"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primaryHover transition-colors duration-300 font-medium"
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
          <nav className="lg:hidden py-4 border-t border-maroon/80">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 text-white hover:text-primary transition-colors duration-300 ${
                  isActive(link.to) ? 'text-primary' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-center space-x-4 my-6">
              <a
                href="https://facebook.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@abhiyogishow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            <Link
              to="/join"
              className="block mt-4 bg-primary text-white px-6 py-3 rounded-full hover:bg-primaryHover transition-colors duration-300 text-center font-medium"
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
