/*
  # Create Media Inquiries Table

  1. New Tables
    - `media_inquiries`
      - `id` (uuid, primary key)
      - `name` (text) - Contact person's full name
      - `email` (text) - Contact email address
      - `organization` (text, nullable) - Publication or organization name
      - `message` (text) - Inquiry message
      - `created_at` (timestamptz) - Timestamp of inquiry submission

  2. Security
    - Enable RLS on `media_inquiries` table
    - Add policy for anyone to submit inquiries (insert only)
    - Add policy for authenticated admins to view inquiries
*/

CREATE TABLE IF NOT EXISTS media_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit media inquiries"
  ON media_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view media inquiries"
  ON media_inquiries
  FOR SELECT
  TO authenticated
  USING (true);