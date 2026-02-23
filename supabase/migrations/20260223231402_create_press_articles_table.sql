/*
  # Create Press Articles Table

  1. New Tables
    - `press_articles`
      - `id` (uuid, primary key) - Unique identifier for each press article
      - `title` (text) - Title of the press article
      - `publication` (text) - Name of the publication/media outlet
      - `date` (date) - Publication date of the article
      - `excerpt` (text) - Brief excerpt or summary of the article
      - `url` (text) - Link to the full article
      - `image_url` (text, optional) - URL of the article image/thumbnail
      - `created_at` (timestamptz) - Timestamp of when the record was created
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `press_articles` table
    - Add policy for public read access (press articles are public information)
    - Add policy for authenticated admin insert/update/delete operations
*/

CREATE TABLE IF NOT EXISTS press_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  publication text NOT NULL,
  date date NOT NULL,
  excerpt text NOT NULL,
  url text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Press articles are publicly readable"
  ON press_articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert press articles"
  ON press_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update press articles"
  ON press_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete press articles"
  ON press_articles
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_press_articles_date ON press_articles(date DESC);