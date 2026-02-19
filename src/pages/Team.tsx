import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';
import { User, Mail, MessageCircle } from 'lucide-react';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('hierarchy_level', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data) setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHierarchyTitle = (level: number) => {
    switch (level) {
      case 1:
        return 'Spiritual Leadership';
      case 2:
        return 'Core Team';
      case 3:
        return 'Volunteers';
      default:
        return 'Team Members';
    }
  };

  const groupedMembers = teamMembers.reduce((acc, member) => {
    const level = member.hierarchy_level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(member);
    return acc;
  }, {} as Record<number, TeamMember[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-primary text-2xl">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg pt-20">
      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Meet the dedicated souls committed to preserving and sharing the wisdom of Sanatan Dharma
          </p>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto">
              <img
                src="/our-story-community.png"
                alt="Sanatan Spirituality Foundation community"
                className="w-full max-h-[320px] rounded-2xl border-2 border-maroon shadow-2xl object-cover"
              />
            </div>
            <div className="mt-10 max-w-3xl mx-auto space-y-6">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-left">
                In 2022, a sacred seed was planted in the UK — a seed rooted in Sanatan Dharma, culture, and spiritual awakening — and it blossomed into Sanatan Sanstha of UK, not merely an organization but a living movement. Our journey began with a historic celebration of Geeta Jayanti inside the halls of the UK Parliament, where the timeless wisdom of the Bhagavad Gita echoed through a space that shapes modern governance, symbolizing a powerful meeting of ancient dharma and contemporary society. From there, the momentum only grew. We launched Sanatan Gurukul to nurture the next generation through Hindi, Sanskrit, scriptures, and Vedic values, with three successful batches graduating and children across the UK discovering not just language but identity, mantra, and meaning. Alongside this, free Kundalini Yoga has been offered for over a decade, ensuring spirituality is not just spoken about — it is practiced and experienced.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-left">
                Our sacred events have continued to make history. At Shravanabhava Ashram, 25 young students were trained in the full depth and symbolism of Rudra Abhishek science, transforming ritual into true understanding. Through our Santon Ki Vaani series at the Nehru Centre, we brought the life and teachings of Adi Shankaracharya alive for modern seekers. The "YugaPurush" event at the UK Parliament, celebrating the Ram Mandir inauguration, resonated globally as chants of Bhagwan Ram filled its historic halls. The Shivoham Shiv Mela in South London drew over 500 devotees, marking the first Aghori Tandav performed in the UK, and we now prepare for the grand Shivoham Shiva Festival 2026. In 2025, under the presidency of Acharya Abhi Yogi Ji, the foundation expanded into the USA, particularly Houston, while co-founding Sumarti Ashram in Odisha to preserve Sanatan roots, strengthen dharmic identity, and support tribal villages & communities. Guided by the mentorship of JagadGuru Swami Sandeepani Ji Maharaj, and powered by over 5,000 impacted community members, 1,000+ dedicated supporters, and countless volunteers, our vision remains clear: to bring true Sanatan literacy to every child in the world — not just rituals, but deep spiritual understanding of who we are and the timeless science within Sanatan Dharma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pageBg rounded-2xl border-2 border-maroon shadow-2xl overflow-hidden">
              <div className="flex items-center justify-center bg-gray-100 min-h-[320px] max-h-[380px] p-4">
                <img
                  src="/swami_ji_maharaj.png"
                  alt="Jagadguru Swami Sandeepani Ji Maharaj"
                  className="max-w-full max-h-[340px] w-auto h-auto object-contain"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                  JAGADGURU SWAMI SANDEEPANI JI MAHARAJ
                </h3>
                <p className="text-lg text-primary font-semibold text-center mb-6">
                  CHIEF MENTOR, SANATAN SPIRITUALITY FOUNDATION
                </p>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    In an age where spirituality often fades into mere discourse, Shree JagadGuru Swami Sandeepani Ji Maharaj shines as a living embodiment of divine realization — a saint whose silence carries the depth of scriptures and whose presence radiates the serenity of truth.
                  </p>
                  <p>
                    Revered as a Purna Sant (Realized Master), Swami Ji embodies the harmony of ज्ञान (wisdom), भक्ति (devotion), and सेवा (selfless service). His life is not a journey of words, but of inner awakening — a path carved through tapasya, compassion, and divine insight. Each discourse of his breathes the fragrance of the Upanishads — timeless, luminous, and liberating.
                  </p>
                  <p>
                    Swami Ji's mission transcends religious boundaries. His vision is to awaken humanity to its highest potential — to the realization that divinity is not somewhere distant, but dwelling within every heart. His teachings gently dissolve ignorance and fear, awakening inner peace, clarity, and spiritual purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pageBg rounded-2xl border-2 border-maroon shadow-2xl overflow-hidden">
              <div className="w-full h-96 overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                  src="/WhatsApp_Image_2026-02-18_at_15.18.44.jpeg"
                  alt="Shri Ajay Prakash"
                  className="w-full h-full object-cover scale-150"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                  SHRI AJAY PRAKASH
                </h3>
                <p className="text-lg text-primary font-semibold text-center mb-6">
                  VICE PRESIDENT SSF
                </p>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Shri Ajay Prakash, Vice President of the Sanatan Spirituality Foundation, has been a pillar of strength and dedication in advancing the vision of Sanatan work in the UK. With unwavering commitment, he has consistently offered his time, guidance, and wholehearted support to every initiative of the foundation, playing a vital role in nurturing its spiritual and cultural mission. He is also President of KRISH TRAVELS, a proud Sanatani travel agency and trusted partner of SSF, supporting community journeys and spiritually aligned travel experiences. His devotion to Dharma, leadership spirit, and continuous service remain a true inspiration to all connected with the foundation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pageBg rounded-2xl border-2 border-maroon shadow-2xl overflow-hidden">
              <img
                src="/photo_5807747553699761772_x.jpg"
                alt="Acharya Abhi Yogi Ji"
                className="w-full max-h-[340px] object-cover object-top"
              />
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                  ACHARYA ABHI YOGI JI
                </h3>
                <p className="text-lg text-primary font-semibold text-center mb-6">
                  FOUNDER, SANATAN SPIRITUALITY FOUNDATION
                </p>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Acharya Abhi Yogi Ji is the Founder of Sanatan Spirituality Foundation and Co-founder of Sumarti Ashram in Bharat. A dedicated Sanatan Dharma guide and spiritual educator, he leads initiatives for Vedic and Sanatan education across the UK, Bharat, and the USA.
                  </p>
                  <p>
                    For over a decade he has been a Kundalini Yogi, freely teaching this sacred science to seekers. Through Sanatan Gurukul and Simply Sanatan, he promotes Shastras, Sanskrit, and spiritual literacy for children and adults — ensuring Sanatan and Vedic wisdom reaches every seeker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pageBg rounded-2xl border-2 border-maroon shadow-2xl overflow-hidden">
              <img
                src="/shivohum-mahashivratri-mela.png"
                alt="Sanatan community and events"
                className="w-full max-h-[340px] object-cover object-center"
              />
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                  OUR SANGAM &amp; SEVA
                </h3>
                <p className="text-lg text-primary font-semibold text-center mb-6">
                  COMMUNITY, EVENTS &amp; DHARMIC SERVICE
                </p>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Our community comes together through sacred events — from Geeta Jayanti at the UK Parliament and Santon Ki Vaani at the Nehru Centre to the Shivoham Shiv Mela and the upcoming Shivoham Shiva Festival 2026. Over 5,000 members have been touched by these gatherings.
                  </p>
                  <p>
                    With Sanatan Gurukul batches, Rudra Abhishek training at Shravanabhava Ashram, and expansion into the USA and Sumarti Ashram in Odisha, we blend ज्ञान, भक्ति, and सेवा — so that the next generation carries forward the light of Sanatan Dharma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Object.entries(groupedMembers)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([level, members]) => (
          <section key={level} className="py-16 bg-pageBg odd:bg-creamCard">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                {getHierarchyTitle(Number(level))}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-12" />

              <div
                className={`grid gap-8 ${
                  Number(level) === 1
                    ? 'grid-cols-1 max-w-2xl mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className={`bg-pageBg rounded-2xl overflow-hidden border-2 border-maroon hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 group ${
                      Number(level) === 1 ? 'flex flex-col md:flex-row' : ''
                    }`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div
                      className={`relative overflow-hidden bg-gray-100 ${
                        Number(level) === 1 ? 'md:w-1/2 h-64 md:h-auto' : 'h-64'
                      }`}
                    >
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="text-primary" size={Number(level) === 1 ? 120 : 80} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className={`p-6 ${Number(level) === 1 ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
                      <h3
                        className={`font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 ${
                          Number(level) === 1 ? 'text-3xl' : 'text-xl'
                        }`}
                      >
                        {member.name}
                      </h3>
                      <p className="text-primary font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{member.bio}</p>
                      {member.specialization && (
                        <div className="mb-4">
                          <p className="text-gray-900 font-semibold text-sm mb-2">Specialization:</p>
                          <p className="text-gray-600 text-sm">{member.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      <section className="py-20 bg-pageBg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-pageBg p-12 rounded-2xl border-2 border-maroon shadow-2xl text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-primary" size={40} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-gray-700 text-lg mb-8">
              Are you passionate about spirituality and service? We welcome dedicated individuals
              to join our community of volunteers and help spread the light of Sanatan wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ssukconnect@gmail.com"
                className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primaryHover transition-colors duration-300 font-semibold"
              >
                <Mail size={20} />
                <span>Email Us</span>
              </a>
              <a
                href="https://chat.whatsapp.com/HAmQud3OOaiKAGqbyxqBAv?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors duration-300 font-semibold"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Us</span>
              </a>
            </div>
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
      `}</style>
    </div>
  );
}
