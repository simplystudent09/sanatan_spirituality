/*
  # Fix RLS Security Policies

  1. Security Changes
    - Drop all overly permissive RLS policies that use USING (true) or WITH CHECK (true)
    - Create restrictive policies based on proper authorization
    - Add admin role check function for content management
    - Keep public read access where appropriate
    - Restrict write operations to authorized admins only
    - Allow public submissions for join_registrations and newsletter_subscribers

  2. Important Notes
    - Admin users need to have `is_admin = true` in their auth.users.raw_app_metadata
    - Public can still view content (events, gallery, testimonials, etc.)
    - Only admins can create, update, or delete content
    - Public forms (join, newsletter) remain open for submissions
*/

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
      false
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

-- Create restrictive policies for events
CREATE POLICY "Only admins can insert events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete events"
  ON public.events FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- TEAM_MEMBERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert team members" ON public.team_members;
DROP POLICY IF EXISTS "Authenticated users can update team members" ON public.team_members;
DROP POLICY IF EXISTS "Authenticated users can delete team members" ON public.team_members;

CREATE POLICY "Only admins can insert team members"
  ON public.team_members FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update team members"
  ON public.team_members FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete team members"
  ON public.team_members FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- GALLERY TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can update gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Authenticated users can delete gallery items" ON public.gallery;

CREATE POLICY "Only admins can insert gallery items"
  ON public.gallery FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update gallery items"
  ON public.gallery FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete gallery items"
  ON public.gallery FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- TESTIMONIALS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;

CREATE POLICY "Only admins can insert testimonials"
  ON public.testimonials FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- STATISTICS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert statistics" ON public.statistics;
DROP POLICY IF EXISTS "Authenticated users can update statistics" ON public.statistics;

CREATE POLICY "Only admins can insert statistics"
  ON public.statistics FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update statistics"
  ON public.statistics FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================================
-- PRESS_ARTICLES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert press articles" ON public.press_articles;
DROP POLICY IF EXISTS "Authenticated users can update press articles" ON public.press_articles;
DROP POLICY IF EXISTS "Authenticated users can delete press articles" ON public.press_articles;

CREATE POLICY "Only admins can insert press articles"
  ON public.press_articles FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update press articles"
  ON public.press_articles FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete press articles"
  ON public.press_articles FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- JOIN_REGISTRATIONS TABLE (Public submissions allowed)
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can submit join form" ON public.join_registrations;

-- Allow anonymous users to submit join forms
CREATE POLICY "Public can submit join form"
  ON public.join_registrations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to submit join forms
CREATE POLICY "Authenticated can submit join form"
  ON public.join_registrations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Only admins can view join registrations"
  ON public.join_registrations FOR SELECT
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- NEWSLETTER_SUBSCRIBERS TABLE (Public submissions allowed)
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

-- Allow anonymous users to subscribe
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to subscribe
CREATE POLICY "Authenticated can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can view subscribers
CREATE POLICY "Only admins can view newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (is_admin());
