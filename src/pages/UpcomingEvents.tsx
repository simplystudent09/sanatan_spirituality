import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Event } from '../types';
import { Calendar, MapPin, Clock, Filter, MessageCircle, X } from 'lucide-react';

const STATIC_EVENTS: Event[] = [
  {
    id: 'shivohum-mahashivratri-mela-2026',
    title: 'SHIVOHUM MAHASHIVRATRI MELA',
    date: '2026-02-21',
    time: '12:30 PM - 4:30 PM',
    venue: "Tudor Park Sports & Leisure, Browell's Lane, FELTHAM, TW13 7EF",
    description:
      'Celebrate Mahashivratri with Devotion, Joy & Divine Energy! FREE ENTRY. Activities include Shiv Puja (Rudrabhishek), Jalaabhishek, Shiv Baraat, Shiv Tandav, Bhajan Jamming, and more. Free Bihari samosas.',
    category: 'Festival',
    image_url: '/shivohum-mahashivratri-mela.png',
    registration_link: '',
    is_featured: true,
    status: 'upcoming',
    created_at: '2026-02-16T00:00:00Z',
  },
];

function sortEventsByDate(a: Event, b: Event) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

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
    if (!supabase) {
      setEvents(STATIC_EVENTS);
      setFilteredEvents(STATIC_EVENTS);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .order('date', { ascending: true });

      if (error) throw error;
      const merged = [...STATIC_EVENTS, ...(data || [])].sort(sortEventsByDate);
      setEvents(merged);
      setFilteredEvents(merged);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(STATIC_EVENTS);
      setFilteredEvents(STATIC_EVENTS);
    } finally {
      setLoading(false);
    }
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
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-primary text-2xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg pt-20">
      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
            Upcoming Events
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Join us for transformative spiritual experiences and sacred gatherings
          </p>
        </div>
      </section>

      {featuredEvent && (
        <section className="py-12 bg-pageBg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Featured Event</h2>
            <div className="max-w-5xl mx-auto bg-pageBg rounded-2xl overflow-hidden border-2 border-maroon shadow-2xl shadow-primary/20">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div
                  className="relative h-64 lg:h-auto cursor-pointer"
                  onClick={() => setSelectedPoster(featuredEvent.image_url || 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg')}
                >
                  <img
                    src={featuredEvent.image_url || 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4 self-start">
                    {featuredEvent.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-words">{featuredEvent.title}</h3>
                  <p className="text-gray-700 mb-6 text-sm sm:text-base">{featuredEvent.description}</p>
                  <div className="space-y-3 mb-6 min-w-0 break-words">
                    <div className="flex items-center space-x-3 text-gray-700 text-sm sm:text-base">
                      <Calendar className="text-primary flex-shrink-0" size={20} />
                      <span>{formatDate(featuredEvent.date)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700 text-sm sm:text-base">
                      <Clock className="text-primary flex-shrink-0" size={20} />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-700 text-sm sm:text-base">
                      <MapPin className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="break-words">{featuredEvent.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <Filter className="text-primary flex-shrink-0" size={24} />
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-pageBg text-gray-700 border border-maroon hover:border-primary hover:bg-gray-50'
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
                className="bg-pageBg rounded-xl overflow-hidden border border-maroon hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 group"
              >
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPoster(event.image_url || 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg')}
                >
                  <img
                    src={event.image_url || 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-700 text-sm">
                      <Calendar className="text-primary" size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 text-sm">
                      <Clock className="text-primary" size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 text-sm">
                      <MapPin className="text-primary" size={16} />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-pageBg p-8 md:p-12 rounded-2xl border-2 border-maroon shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Event Updates on WhatsApp</h2>
              <p className="text-gray-700">
                Join our WhatsApp group for event reminders and updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="/whatsapp-qr.png"
                  alt="WhatsApp QR Code"
                  className="w-40 h-40 object-contain"
                />
                <p className="text-gray-600 text-sm mt-2">Scan to join</p>
              </div>
              <a
                href="https://chat.whatsapp.com/HAmQud3OOaiKAGqbyxqBAv?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors duration-300 font-semibold"
              >
                <MessageCircle size={20} />
                <span>Join on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedPoster && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPoster(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            onClick={() => setSelectedPoster(null)}
            aria-label="Close"
          >
            <X size={40} />
          </button>
          <img
            src={selectedPoster}
            alt="Event poster"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
