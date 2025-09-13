/*
  # Add usage instructions to models table

  1. Changes
    - Add `usage_instructions` column to `models` table
    - Allow text content for usage instructions and sample code

  2. Security
    - Maintain existing RLS policies
*/

-- Add usage_instructions column to models table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'usage_instructions'
  ) THEN
    ALTER TABLE models ADD COLUMN usage_instructions text;
  END IF;
END $$;