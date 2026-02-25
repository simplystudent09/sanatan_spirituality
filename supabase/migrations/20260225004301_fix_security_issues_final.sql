/*
  # Fix Security Issues

  ## Changes Made

  1. **Multiple Permissive Policies**
     - Remove duplicate/conflicting SELECT policies on `join_registrations`
     - Remove duplicate/conflicting SELECT policies on `newsletter_subscribers`
     - Implement single, clear policies for each action

  2. **RLS Policy Always True**
     - Fix INSERT policies on `join_registrations` to add proper validation
     - Fix INSERT policies on `newsletter_subscribers` to add proper validation
     - Ensure policies validate data integrity (e.g., required fields, email format)

  3. **Function Search Path**
     - Replace `is_admin` function to have immutable search_path using CASCADE

  ## Security Notes
  - All policies now have meaningful checks instead of USING (true) or WITH CHECK (true)
  - Duplicate policies removed to avoid confusion
  - Admin access properly controlled
  - Public submissions validated for data integrity
*/

-- Drop all existing policies on join_registrations
DROP POLICY IF EXISTS "Anyone can submit join form" ON join_registrations;
DROP POLICY IF EXISTS "Public can submit join form" ON join_registrations;
DROP POLICY IF EXISTS "Authenticated can submit join form" ON join_registrations;
DROP POLICY IF EXISTS "Authenticated users can view join registrations" ON join_registrations;
DROP POLICY IF EXISTS "Only admins can view join registrations" ON join_registrations;
DROP POLICY IF EXISTS "Admins can view all join registrations" ON join_registrations;

-- Drop all existing policies on newsletter_subscribers
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Authenticated can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers are viewable by authenticated users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Only admins can view newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all newsletter subscribers" ON newsletter_subscribers;

-- Recreate is_admin function with proper search_path security (CASCADE to update dependent policies)
DROP FUNCTION IF EXISTS is_admin() CASCADE;
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin',
      false
    )
  );
END;
$$;

-- Recreate all the admin policies that were dropped by CASCADE
-- Events table
CREATE POLICY "Only admins can insert events"
  ON events FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update events"
  ON events FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete events"
  ON events FOR DELETE TO authenticated
  USING (is_admin());

-- Team members table
CREATE POLICY "Only admins can insert team members"
  ON team_members FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update team members"
  ON team_members FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete team members"
  ON team_members FOR DELETE TO authenticated
  USING (is_admin());

-- Gallery table
CREATE POLICY "Only admins can insert gallery items"
  ON gallery FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update gallery items"
  ON gallery FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete gallery items"
  ON gallery FOR DELETE TO authenticated
  USING (is_admin());

-- Testimonials table
CREATE POLICY "Only admins can insert testimonials"
  ON testimonials FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update testimonials"
  ON testimonials FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete testimonials"
  ON testimonials FOR DELETE TO authenticated
  USING (is_admin());

-- Statistics table
CREATE POLICY "Only admins can insert statistics"
  ON statistics FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update statistics"
  ON statistics FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Press articles table
CREATE POLICY "Only admins can insert press articles"
  ON press_articles FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update press articles"
  ON press_articles FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete press articles"
  ON press_articles FOR DELETE TO authenticated
  USING (is_admin());

-- Create new secure policies for join_registrations
-- SELECT: Only admins can view
CREATE POLICY "Admins can view join registrations"
  ON join_registrations
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- INSERT: Anyone can submit but with validation (no USING clause for INSERT)
CREATE POLICY "Anyone can submit join form with valid data"
  ON join_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate required fields are not empty
    name IS NOT NULL AND 
    trim(name) != '' AND
    contact_number IS NOT NULL AND 
    trim(contact_number) != '' AND
    length(trim(name)) >= 2 AND
    length(trim(contact_number)) >= 10
  );

-- UPDATE: Only admins
CREATE POLICY "Admins can update join registrations"
  ON join_registrations
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- DELETE: Only admins
CREATE POLICY "Admins can delete join registrations"
  ON join_registrations
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Create new secure policies for newsletter_subscribers
-- SELECT: Only admins can view
CREATE POLICY "Admins can view newsletter subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- INSERT: Anyone can subscribe but with validation (no USING clause for INSERT)
CREATE POLICY "Anyone can subscribe with valid email"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate email is not empty and has correct format
    email IS NOT NULL AND 
    trim(email) != '' AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    length(trim(email)) >= 5
  );

-- UPDATE: Only admins
CREATE POLICY "Admins can update newsletter subscribers"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- DELETE: Only admins
CREATE POLICY "Admins can delete newsletter subscribers"
  ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (is_admin());
