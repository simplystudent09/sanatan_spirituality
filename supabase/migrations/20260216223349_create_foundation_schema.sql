/*
  # Sanatan Spirituality Foundation Database Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, event name)
      - `date` (date, event date)
      - `time` (text, event time)
      - `venue` (text, location)
      - `description` (text, event details)
      - `category` (text, Yoga/Meditation/Discourse/Festival/Yatra)
      - `image_url` (text, event image)
      - `registration_link` (text, registration URL)
      - `is_featured` (boolean, highlight this event)
      - `status` (text, upcoming/past)
      - `created_at` (timestamp)
    
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text, member name)
      - `role` (text, position/title)
      - `bio` (text, member biography)
      - `specialization` (text, areas of expertise)
      - `photo_url` (text, profile image)
      - `hierarchy_level` (integer, 1=Founder, 2=Core, 3=Volunteer)
      - `display_order` (integer, sort order)
      - `created_at` (timestamp)
    
    - `gallery`
      - `id` (uuid, primary key)
      - `event_id` (uuid, optional reference to events)
      - `image_url` (text, photo URL)
      - `caption` (text, image description)
      - `date` (date, photo date)
      - `category` (text, event type)
      - `created_at` (timestamp)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, person name)
      - `content` (text, testimonial text)
      - `video_url` (text, optional video link)
      - `event_type` (text, related event)
      - `date` (date, testimonial date)
      - `created_at` (timestamp)
    
    - `statistics`
      - `id` (uuid, primary key)
      - `label` (text, stat name)
      - `value` (integer, stat number)
      - `updated_at` (timestamp)
    
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, subscriber email)
      - `subscribed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Restrict write access to authenticated users only

  3. Sample Data
    - Insert initial statistics counters
    - Add placeholder events and team members for demonstration
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  venue text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text DEFAULT '',
  registration_link text DEFAULT '',
  is_featured boolean DEFAULT false,
  status text DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  specialization text DEFAULT '',
  photo_url text DEFAULT '',
  hierarchy_level integer DEFAULT 3,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are viewable by everyone"
  ON team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid,
  image_url text NOT NULL,
  caption text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  category text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery is viewable by everyone"
  ON gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert gallery items"
  ON gallery FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery items"
  ON gallery FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery items"
  ON gallery FOR DELETE
  TO authenticated
  USING (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  content text NOT NULL,
  video_url text DEFAULT '',
  event_type text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL UNIQUE,
  value integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Statistics are viewable by everyone"
  ON statistics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert statistics"
  ON statistics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update statistics"
  ON statistics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers are viewable by authenticated users"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial statistics
INSERT INTO statistics (label, value) VALUES
  ('members', 5000),
  ('events_conducted', 250),
  ('people_impacted', 50000)
ON CONFLICT (label) DO NOTHING;

-- Insert sample events
INSERT INTO events (title, date, time, venue, description, category, is_featured, status) VALUES
  ('Ashtanga Yoga Workshop', '2026-03-15', '06:00 AM - 08:00 AM', 'SSF Main Center, Delhi', 'Join us for an immersive Ashtanga Yoga workshop led by experienced practitioners. Learn the traditional eight-limbed path of yoga.', 'Yoga', true, 'upcoming'),
  ('Kundalini Meditation Retreat', '2026-03-22', '09:00 AM - 05:00 PM', 'Rishikesh Ashram', 'Experience the transformative power of Kundalini meditation in the serene environment of Rishikesh.', 'Meditation', true, 'upcoming'),
  ('Bhagavad Gita Discourse', '2026-04-05', '07:00 PM - 09:00 PM', 'Online via Zoom', 'Deep dive into the timeless wisdom of the Bhagavad Gita with our spiritual teacher.', 'Discourse', false, 'upcoming'),
  ('Mahashivratri Celebration', '2026-02-26', '08:00 PM - 06:00 AM', 'SSF Temple Complex', 'Grand celebration of Mahashivratri with all-night kirtan, meditation, and sacred rituals.', 'Festival', false, 'past'),
  ('Char Dham Yatra', '2026-05-10', '05:00 AM', 'Starting from Delhi', 'Sacred pilgrimage to the four holy shrines of Uttarakhand. 15-day spiritual journey.', 'Yatra', false, 'upcoming')
ON CONFLICT DO NOTHING;

-- Insert sample team members
INSERT INTO team_members (name, role, bio, specialization, hierarchy_level, display_order) VALUES
  ('Swami Anandananda', 'Founder & Spiritual Guide', 'With over 30 years of spiritual practice and teaching, Swamiji guides seekers on the path of Sanatan Dharma.', 'Vedanta, Yoga Philosophy, Meditation', 1, 1),
  ('Dr. Priya Sharma', 'Head of Yoga Programs', 'Certified yoga instructor with expertise in Ashtanga and Hatha yoga traditions.', 'Ashtanga Yoga, Pranayama', 2, 2),
  ('Pandit Rajesh Kumar', 'Vedic Scholar', 'Sanskrit scholar specializing in Vedic texts, Upanishads, and ancient scriptures.', 'Sanskrit, Vedic Studies, Rituals', 2, 3),
  ('Meera Patel', 'Community Coordinator', 'Manages community outreach programs and spiritual events across India.', 'Event Management, Community Service', 2, 4)
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO gallery (image_url, caption, date, category) VALUES
  ('https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg', 'Morning Yoga Session at SSF Center', '2026-01-15', 'Yoga'),
  ('https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg', 'Meditation Retreat Participants', '2026-01-20', 'Meditation'),
  ('https://images.pexels.com/photos/6698362/pexels-photo-6698362.jpeg', 'Kirtan and Bhajan Evening', '2026-02-01', 'Festival')
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, content, event_type, date) VALUES
  ('Amit Verma', 'The Kundalini meditation retreat was life-changing. I found inner peace and clarity that I had been seeking for years.', 'Meditation', '2026-01-25'),
  ('Sneha Reddy', 'Attending the Bhagavad Gita discourse helped me understand the deeper meaning of dharma and karma. Truly enlightening!', 'Discourse', '2026-02-10'),
  ('Rahul Singh', 'The yoga workshop improved not just my physical health but also my mental wellbeing. Grateful to SSF!', 'Yoga', '2026-02-15')
ON CONFLICT DO NOTHING;