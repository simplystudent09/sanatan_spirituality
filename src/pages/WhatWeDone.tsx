import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Statistic } from '../types';
import { Users, Calendar, Heart } from 'lucide-react';

const FEATURED_VIDEO_ID = 'Ti1OlqzjpS0';

export default function WhatWeDone() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.from('statistics').select('*');
      if (data) setStatistics(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaults: Record<string, number> = {
    members: 1000,
    events_conducted: 20,
    people_impacted: 5000,
  };
  const getStatValue = (label: string) => {
    const stat = statistics.find((s) => s.label === label);
    const value = stat ? stat.value : 0;
    return value > 0 ? value : (defaults[label] ?? 0);
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
      title: 'Expanding Horizon',
      achievements: ['Work started on Sumarti Ashram Bharat with co-founder Acharya Abhi Yogi Ji', 'International sanatan events planned'],
    },
    {
      year: '2025',
      title: 'New Journey',
      achievements: ['New chapter launched in Bharat and USA', 'Sanatan Sanstha UK (SSUK) - now becomes Sanatan Spirituality Foundation (SSF)'],
    },
    {
      year: '2022',
      title: 'Foundation Years',
      achievements: ['Started Sanatan Sanstha of UK (SSUK)', 'Did first Bhagavad Gita event in UK Parliament'],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-primary text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg pt-20">
      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
            What We've Accomplished
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            A journey of service, devotion, and spiritual awakening
          </p>
        </div>
      </section>

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-pageBg p-8 rounded-2xl border-2 border-maroon text-center group hover:border-primary transition-all duration-300 shadow-xl"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-300">
                    <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={40} />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-xl text-gray-900 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">Featured Video</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12" />
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-maroon">
              <iframe
                src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pageBg relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-16 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full" />
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-primary/30" />
                )}
                <div className="bg-pageBg p-6 rounded-xl border border-maroon hover:border-primary transition-all duration-300">
                  <div className="text-primary font-bold text-2xl mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full" />
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

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">Sanatan Events</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
            Watch highlights from our spiritual events, celebrations, and community gatherings
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-maroon shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLvwfzYVr21N_BhcOwdrgvS-YjxAxLFiJT"
                title="Sanatan Events Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">Our Podcasts - The Yogis Show</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
            Explore deep spiritual conversations and wisdom from ancient traditions
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-maroon shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLvwfzYVr21N_h32s7_4aPC0eabJiMnsJs"
                title="The Yogis Show Podcast Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
