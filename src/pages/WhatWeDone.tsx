import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryItem, Testimonial, Statistic } from '../types';
import { Users, Calendar, Heart, X } from 'lucide-react';

export default function WhatWeDone() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [galleryRes, testimonialsRes, statisticsRes] = await Promise.all([
        supabase.from('gallery').select('*').order('date', { ascending: false }),
        supabase.from('testimonials').select('*').order('date', { ascending: false }),
        supabase.from('statistics').select('*'),
      ]);

      if (galleryRes.data) setGallery(galleryRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (statisticsRes.data) setStatistics(statisticsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatValue = (label: string) => {
    const stat = statistics.find((s) => s.label === label);
    return stat ? stat.value : 0;
  };

  const stats = [
    {
      icon: Users,
      label: 'Members',
      value: getStatValue('members'),
      suffix: '+',
    },
    {
      icon: Calendar,
      label: 'Events Conducted',
      value: getStatValue('events_conducted'),
      suffix: '+',
    },
    {
      icon: Heart,
      label: 'People Impacted',
      value: getStatValue('people_impacted'),
      suffix: '+',
    },
  ];

  const timeline = [
    {
      year: '2026',
      title: 'Expanding Horizons',
      description: 'Launched new meditation centers across India and international outreach programs.',
      achievements: ['5 new centers opened', 'International yoga teacher training', '10,000+ new members'],
    },
    {
      year: '2025',
      title: 'Digital Transformation',
      description: 'Brought spiritual teachings to the digital age with online courses and virtual satsangs.',
      achievements: ['Online platform launch', '50+ virtual events', 'Global community building'],
    },
    {
      year: '2024',
      title: 'Foundation Year',
      description: 'Established the Sanatan Spirituality Foundation with a vision to preserve and promote ancient wisdom.',
      achievements: ['First yoga center', 'Community of 1000 seekers', 'Monthly satsangs initiated'],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FF6B00] text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-4">
            What We've Accomplished
          </h1>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8" />
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            A journey of service, devotion, and spiritual awakening
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-2xl border-2 border-[#FF6B00]/30 text-center group hover:border-[#FF6B00] transition-all duration-300 shadow-xl"
                >
                  <div className="w-20 h-20 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF6B00] transition-all duration-300">
                    <Icon className="text-[#FF6B00] group-hover:text-white transition-colors duration-300" size={40} />
                  </div>
                  <div className="text-5xl font-bold text-[#FF6B00] mb-2">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-xl text-white font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-16 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-[#FF6B00] rounded-full" />
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-[#FF6B00]/30" />
                )}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-[#FF6B00] transition-all duration-300">
                  <div className="text-[#FF6B00] font-bold text-2xl mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-400">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Photo Gallery</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-[#FF6B00]/30 transition-all duration-300"
                onClick={() => setSelectedImage(item.image_url)}
              >
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{item.caption}</p>
                    <p className="text-gray-300 text-sm">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-[#FF6B00] transition-all duration-300 shadow-lg"
              >
                <div className="text-[#FF6B00] text-5xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FF6B00]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B00] font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.event_type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#FF6B00] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
