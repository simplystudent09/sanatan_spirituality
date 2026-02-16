export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: 'Yoga' | 'Meditation' | 'Discourse' | 'Festival' | 'Yatra';
  image_url: string;
  registration_link: string;
  is_featured: boolean;
  status: 'upcoming' | 'past';
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialization: string;
  photo_url: string;
  hierarchy_level: number;
  display_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  event_id?: string;
  image_url: string;
  caption: string;
  date: string;
  category: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  video_url: string;
  event_type: string;
  date: string;
  created_at: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}
