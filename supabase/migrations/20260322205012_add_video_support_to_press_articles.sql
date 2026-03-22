/*
  # Add Video Support to Press Articles

  1. Changes
    - Add `video_url` column to `press_articles` table to store YouTube, Vimeo, or other video URLs
    - Column is optional (nullable) to maintain backward compatibility
  
  2. Notes
    - Supports embedding videos in press release articles
    - Can be used alongside images for rich media content
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'press_articles' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE press_articles ADD COLUMN video_url text;
  END IF;
END $$;