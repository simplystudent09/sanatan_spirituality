/*
  # Add Full Content to Press Articles

  1. Changes
    - Add `full_content` column to store complete press release text
    - Add `additional_images` jsonb column to store array of additional images
    - Update existing record with full content for the ShivOhum Shiv Mela article
  
  2. Notes
    - full_content will store markdown or HTML formatted content
    - additional_images stores array of image URLs for the article gallery
*/

-- Add full_content column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'press_articles' AND column_name = 'full_content'
  ) THEN
    ALTER TABLE press_articles ADD COLUMN full_content text;
  END IF;
END $$;

-- Add additional_images column for image galleries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'press_articles' AND column_name = 'additional_images'
  ) THEN
    ALTER TABLE press_articles ADD COLUMN additional_images jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Update the existing article with full content
UPDATE press_articles
SET 
  full_content = E'London witnessed a historic gathering as 800 devotees came together for the second edition of ShivOhum Shiv Mela on February 23rd, 2026, marking a significant milestone in the city\'s spiritual landscape.\n\n## A Historic Celebration\n\nThe event featured the city\'s first-ever Shiv Barat, a magnificent procession celebrating Lord Shiva that captured the hearts of devotees and onlookers alike. The grand procession wound through the venue with traditional music, dance, and devotional chants creating an atmosphere of divine celebration.\n\n## Bringing the Community Together\n\nThe celebration brought together families, youth, and spiritual seekers from across the UK, creating an atmosphere of devotion and unity. Over 800 participants joined in the festivities, making it one of the largest spiritual gatherings in London\'s recent history.\n\n## Highlights of the Event\n\n- **Traditional Rituals**: Elaborate puja ceremonies and abhishekam performances\n- **Spiritual Discourses**: Enlightening talks on Sanatan Dharma and Lord Shiva\'s significance\n- **Cultural Performances**: Traditional music, dance, and devotional songs\n- **Shiv Barat Procession**: London\'s first-ever grand procession celebrating Lord Shiva\n- **Community Prasad**: Sacred food offerings distributed to all attendees\n\n## A Milestone for Sanatan Dharma in the UK\n\nThis second edition of ShivOhum Shiv Mela demonstrates the growing presence and vibrancy of Sanatan Dharma in the United Kingdom. The event provided a platform for devotees to connect with their spiritual roots while celebrating the timeless traditions of Hindu culture.\n\nThe success of this event paves the way for future celebrations and strengthens the bonds within the spiritual community across the UK.',
  additional_images = '[]'::jsonb
WHERE title = 'LONDON MAKES HISTORY: 800 DEVOTEES GATHER FOR SECOND SHIVOHUM SHIV MELA; CITY WITNESSES ITS FIRST-EVER SHIV BARAT';