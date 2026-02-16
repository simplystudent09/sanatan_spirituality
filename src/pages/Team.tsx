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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FF6B00] text-2xl">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4">
            Our Team
          </h1>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8" />
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Meet the dedicated souls committed to preserving and sharing the wisdom of Sanatan Dharma
          </p>
        </div>
      </section>

      {Object.entries(groupedMembers)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([level, members]) => (
          <section key={level} className="py-16 bg-gray-900 odd:bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
                {getHierarchyTitle(Number(level))}
              </h2>
              <div className="w-16 h-1 bg-[#FF6B00] mx-auto mb-12" />

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
                    className={`bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden border-2 border-gray-700 hover:border-[#FF6B00] transition-all duration-300 shadow-lg hover:shadow-[#FF6B00]/20 group ${
                      Number(level) === 1 ? 'flex flex-col md:flex-row' : ''
                    }`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br from-[#FF6B00]/20 to-gray-800 ${
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
                          <User className="text-[#FF6B00]" size={Number(level) === 1 ? 120 : 80} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className={`p-6 ${Number(level) === 1 ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
                      <h3
                        className={`font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors duration-300 ${
                          Number(level) === 1 ? 'text-3xl' : 'text-xl'
                        }`}
                      >
                        {member.name}
                      </h3>
                      <p className="text-[#FF6B00] font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>
                      {member.specialization && (
                        <div className="mb-4">
                          <p className="text-white font-semibold text-sm mb-2">Specialization:</p>
                          <p className="text-gray-400 text-sm">{member.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-black p-12 rounded-2xl border-2 border-[#FF6B00]/30 shadow-2xl text-center">
            <div className="w-20 h-20 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-[#FF6B00]" size={40} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Team</h2>
            <p className="text-gray-300 text-lg mb-8">
              Are you passionate about spirituality and service? We welcome dedicated individuals
              to join our community of volunteers and help spread the light of Sanatan wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ssukconnect@gmail.com"
                className="inline-flex items-center justify-center space-x-2 bg-[#FF6B00] text-white px-8 py-4 rounded-full hover:bg-[#ff8534] transition-colors duration-300 font-semibold"
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
