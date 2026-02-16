import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
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
              <div>
                <div className="text-white font-bold text-lg">Sanatan Spirituality</div>
                <div className="text-[#FF6B00] text-sm">Foundation</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Preserving and promoting the timeless wisdom of Sanatan Dharma through yoga, meditation, and spiritual education.
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">संस्कार से संस्कृति तक</p>
              <p className="text-[#FF6B00] font-semibold">www.sanatanspirituality.org</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-[#FF6B00]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/what-we-done" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300">
                  What We've Done
                </Link>
              </li>
              <li>
                <Link to="/upcoming-events" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-[#FF6B00]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#FF6B00] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Sanatan Spirituality Foundation<br />
                  New Delhi, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-[#FF6B00] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-[#FF6B00] flex-shrink-0" />
                <a href="mailto:ssukconnect@gmail.com" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
                  ssukconnect@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-[#FF6B00]">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/ssfconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@abhiyogishow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>

            <div className="bg-white p-3 rounded-lg inline-block">
              <img
                src="/whatsapp-qr.png"
                alt="WhatsApp QR Code"
                className="w-32 h-32"
              />
              <p className="text-center text-xs text-black mt-2 font-medium">Scan to WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Sanatan Spirituality Foundation. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Designed with devotion and dedication
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
