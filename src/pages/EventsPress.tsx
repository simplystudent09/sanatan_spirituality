import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Newspaper, Calendar, ExternalLink, ChevronLeft } from 'lucide-react';

interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  url: string;
  image_url?: string;
  full_content?: string;
  additional_images?: string[];
  video_url?: string;
  created_at: string;
}

export default function EventsPress() {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<PressArticle | null>(null);

  useEffect(() => {
    fetchPressArticles();
  }, []);

  const fetchPressArticles = async () => {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      setLoading(false);
      return;
    }
    try {
      console.log('Fetching press articles from Supabase...');
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched articles:', data?.length || 0);
      if (data) {
        console.log('Articles data:', data);
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching press articles:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
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

  const renderFullContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Handle headings
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {line.substring(3)}
          </h2>
        );
      }
      // Handle bullet points
      if (line.trim().startsWith('- **')) {
        const match = line.match(/- \*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          return (
            <li key={index} className="mb-2">
              <span className="font-bold text-gray-900">{match[1]}</span>: {match[2]}
            </li>
          );
        }
      }
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      // Handle regular paragraphs
      return (
        <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-primary text-2xl">Loading press coverage...</div>
      </div>
    );
  }

  // If an article is selected, show full article view
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-pageBg pt-20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-semibold mb-6 transition-colors duration-300 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to All Articles
          </button>

          <article className="bg-white rounded-2xl overflow-hidden border-2 border-maroon shadow-2xl">
            {selectedArticle.image_url && (
              <div className="relative h-64 md:h-96 overflow-hidden bg-gray-100">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            <div className="p-6 md:p-12">
              <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-4">
                <Calendar size={16} />
                <time dateTime={selectedArticle.date}>{formatDate(selectedArticle.date)}</time>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h1>

              <p className="text-lg text-gray-600 font-medium mb-8 flex items-center gap-2">
                <Newspaper size={18} />
                {selectedArticle.publication}
              </p>

              <div className="prose prose-lg max-w-none">
                {selectedArticle.full_content ? (
                  <div className="text-gray-700">
                    {renderFullContent(selectedArticle.full_content)}
                  </div>
                ) : (
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedArticle.excerpt}
                  </p>
                )}
              </div>

              {selectedArticle.video_url && (
                <div className="mt-12">
                  <div className="rounded-xl overflow-hidden border-2 border-maroon shadow-lg aspect-video">
                    <iframe
                      src={selectedArticle.video_url}
                      title={selectedArticle.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}

              {selectedArticle.additional_images && selectedArticle.additional_images.length > 0 && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedArticle.additional_images.map((imageUrl, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border-2 border-maroon shadow-lg">
                      <img
                        src={imageUrl}
                        alt={`${selectedArticle.title} - Image ${index + 1}`}
                        className="w-full h-auto object-contain bg-gray-50"
                      />
                    </div>
                  ))}
                </div>
              )}

              {selectedArticle.url && (
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-semibold transition-colors duration-300 group/link text-lg"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink size={20} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              )}
            </div>
          </article>

          <div className="mt-8 text-center">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primaryHover transition-colors duration-300 font-semibold"
            >
              <ChevronLeft size={20} />
              View More Articles
            </button>
          </div>
        </div>
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

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-2 text-primary hover:text-primaryHover font-semibold transition-colors duration-300 group/link"
                    >
                      <span>Read Full Article</span>
                      <ChevronLeft size={16} className="rotate-180 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </button>
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
