import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

const JOIN_WEBHOOK_URL =
  import.meta.env.VITE_JOIN_WEBHOOK_URL ||
  'https://n8n.srv1004168.hstgr.cloud/webhook/edfb6266-b3aa-4dc2-85f2-65d945e07f9f';

export default function JoinForm() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactNumber.trim()) {
      setMessage('Please fill in both name and contact number.');
      return;
    }
    const trimmedName = name.trim();
    const trimmedContact = contactNumber.trim();

    // Use form POST to hidden iframe - bypasses CORS (browser allows form POST cross-origin)
    const iframe = document.createElement('iframe');
    iframe.name = 'webhook-frame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = JOIN_WEBHOOK_URL;
    form.target = 'webhook-frame';
    form.style.display = 'none';

    const nameInput = document.createElement('input');
    nameInput.name = 'name';
    nameInput.value = trimmedName;
    form.appendChild(nameInput);

    const contactInput = document.createElement('input');
    contactInput.name = 'contact_number';
    contactInput.value = trimmedContact;
    form.appendChild(contactInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Remove iframe after a delay (webhook should receive by then)
    setTimeout(() => document.body.removeChild(iframe), 3000);

    setIsSubmitted(true);
    setName('');
    setContactNumber('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FF6B00]/20 flex items-center justify-center">
            <CheckCircle className="text-[#FF6B00]" size={64} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You for Joining!
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            We have received your details. Our team will connect with you soon.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-[#FF6B00] text-white px-8 py-4 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#FF6B00] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-gradient-to-br from-gray-800 to-black p-6 sm:p-8 rounded-2xl border-2 border-[#FF6B00]/30 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Join Our Community
            </h1>
            <p className="text-gray-400">
              Share your details and we will connect with you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/30 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-gray-300 font-medium mb-2">
                Contact Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  id="contact"
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Any format: +91 98765 43210, +4477988898932, etc."
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/30 outline-none transition-all"
                  required
                  autoComplete="tel"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">All formats accepted — no restrictions</p>
            </div>

            {message && (
              <p className="text-amber-400 text-sm">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6B00] text-white py-4 rounded-xl font-semibold hover:bg-[#ff8534] transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
