/*
  # Add likes functionality and user features

  1. New Tables
    - `likes` table for user likes on models
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `model_id` (uuid, references models)
      - `created_at` (timestamp)
      - Unique constraint on (user_id, model_id)

  2. Table Updates
    - Add `uploaded_by` column to models table
    - Add OS-specific instruction columns (mac_instructions, windows_instructions, linux_instructions)

  3. Security
    - Enable RLS on likes table
    - Add policies for authenticated users to manage their likes
    - Update existing model policies if needed
*/

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  model_id uuid REFERENCES models(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, model_id)
);

-- Enable RLS on likes table
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Add policies for likes table
CREATE POLICY "Users can view all likes"
  ON likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add uploaded_by column to models table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'uploaded_by'
  ) THEN
    ALTER TABLE models ADD COLUMN uploaded_by uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Add OS-specific instruction columns to models table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'mac_instructions'
  ) THEN
    ALTER TABLE models ADD COLUMN mac_instructions text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'windows_instructions'
  ) THEN
    ALTER TABLE models ADD COLUMN windows_instructions text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'linux_instructions'
  ) THEN
    ALTER TABLE models ADD COLUMN linux_instructions text;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_model_id ON likes(model_id);
CREATE INDEX IF NOT EXISTS idx_models_uploaded_by ON models(uploaded_by);

-- Create a function to get like count for a model
CREATE OR REPLACE FUNCTION get_model_like_count(model_uuid uuid)
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::integer FROM likes WHERE model_id = model_uuid;
$$;

-- Create a function to check if user liked a model
CREATE OR REPLACE FUNCTION user_liked_model(model_uuid uuid, user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS(SELECT 1 FROM likes WHERE model_id = model_uuid AND user_id = user_uuid);
$$;