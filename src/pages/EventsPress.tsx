import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Newspaper, Calendar, ExternalLink } from 'lucide-react';

interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  url: string;
  image_url?: string;
  created_at: string;
}

export default function EventsPress() {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPressArticles();
  }, []);

  const fetchPressArticles = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      if (data) setArticles(data);
    } catch (error) {
      console.error('Error fetching press articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-primary text-2xl">Loading press coverage...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg pt-20">
      <section className="py-20 bg-gradient-to-b from-maroon/5 to-pageBg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Newspaper className="text-primary mr-4" size={48} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Events Press
            </h1>
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Our events and initiatives have been featured in various media outlets, spreading awareness about Sanatan Dharma and our community work
          </p>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 text-lg">No press articles available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates on our media coverage.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-maroon hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/20 group"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {article.image_url && (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-3">
                      <Calendar size={16} />
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium mb-3 flex items-center gap-2">
                      <Newspaper size={14} />
                      {article.publication}
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-semibold transition-colors duration-300 group/link"
                    >
                      <span>Read Full Article</span>
                      <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-pageBg to-maroon/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border-2 border-maroon shadow-2xl text-center">
            <Newspaper className="mx-auto text-primary mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Media Inquiries
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              For press inquiries, interviews, or to cover our events, please reach out to our media team. We welcome opportunities to share our mission and the timeless wisdom of Sanatan Dharma.
            </p>
            <a
              href="mailto:ssukconnect@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primaryHover transition-colors duration-300 font-semibold text-lg"
            >
              Contact Media Team
            </a>
          </div>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
