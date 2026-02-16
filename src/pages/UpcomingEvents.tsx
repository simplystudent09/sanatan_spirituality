import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Event } from '../types';
import { Calendar, MapPin, Clock, Filter, Mail, ArrowRight } from 'lucide-react';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const categories = ['All', 'Yoga', 'Meditation', 'Discourse', 'Festival', 'Yatra'];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === selectedCategory));
    }
  }, [selectedCategory, events]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });

      if (error) throw error;
      if (data) {
        setEvents(data);
        setFilteredEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setSubscribeMessage('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        setSubscribeMessage('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      setSubscribeMessage('An error occurred. Please try again.');
    }

    setTimeout(() => setSubscribeMessage(''), 5000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const featuredEvent = events.find((event) => event.is_featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FF6B00] text-2xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-4">
            Upcoming Events
          </h1>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8" />
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Join us for transformative spiritual experiences and sacred gatherings
          </p>
        </div>
      </section>

      {featuredEvent && (
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Featured Event</h2>
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-black to-gray-800 rounded-2xl overflow-hidden border-2 border-[#FF6B00] shadow-2xl shadow-[#FF6B00]/20">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredEvent.image_url || 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#FF6B00] text-white px-4 py-2 rounded-full font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-[#FF6B00]/20 text-[#FF6B00] px-4 py-1 rounded-full text-sm font-semibold mb-4 self-start">
                    {featuredEvent.category}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{featuredEvent.title}</h3>
                  <p className="text-gray-300 mb-6">{featuredEvent.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="text-[#FF6B00]" size={20} />
                      <span>{formatDate(featuredEvent.date)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Clock className="text-[#FF6B00]" size={20} />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin className="text-[#FF6B00]" size={20} />
                      <span>{featuredEvent.venue}</span>
                    </div>
                  </div>
                  <button className="bg-[#FF6B00] text-white px-8 py-3 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold flex items-center justify-center space-x-2">
                    <span>Register Now</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <Filter className="text-[#FF6B00]" size={24} />
              <h3 className="text-2xl font-bold text-white">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-[#FF6B00] transition-all duration-300 shadow-lg hover:shadow-[#FF6B00]/20 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url || 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF6B00] transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <Calendar className="text-[#FF6B00]" size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <Clock className="text-[#FF6B00]" size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 text-sm">
                      <MapPin className="text-[#FF6B00]" size={16} />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#FF6B00] text-white py-2 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-black p-8 md:p-12 rounded-2xl border-2 border-[#FF6B00]/30 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#FF6B00]" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Stay Updated</h2>
              <p className="text-gray-300">
                Subscribe to our newsletter and never miss an event
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-[#FF6B00] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B00] text-white px-8 py-3 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              {subscribeMessage && (
                <p className={`text-center ${subscribeMessage.includes('Successfully') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {subscribeMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
