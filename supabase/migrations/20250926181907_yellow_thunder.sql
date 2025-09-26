/*
  # Add likes functionality to models table

  1. Changes
    - Add `likes_count` column to models table with default value of 0
    - Add index on likes_count for sorting by popularity
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add likes_count column to models table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'models' AND column_name = 'likes_count'
  ) THEN
    ALTER TABLE models ADD COLUMN likes_count integer DEFAULT 0 NOT NULL;
  END IF;
END $$;

-- Add index for sorting by likes
CREATE INDEX IF NOT EXISTS idx_models_likes_count ON models(likes_count DESC);