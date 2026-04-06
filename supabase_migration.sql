-- Run this in Supabase → SQL Editor
-- Cleans up user_onboarding to match the new questionnaire

-- 1. Add missing columns
ALTER TABLE user_onboarding
  ADD COLUMN IF NOT EXISTS topics               text,
  ADD COLUMN IF NOT EXISTS time_investment      text,
  ADD COLUMN IF NOT EXISTS book_think_grow_rich boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS book_alchemist       boolean DEFAULT false;

-- 2. Remove old columns that are no longer needed
ALTER TABLE user_onboarding
  DROP COLUMN IF EXISTS life_stage,
  DROP COLUMN IF EXISTS what_brought_you,
  DROP COLUMN IF EXISTS current_situation,
  DROP COLUMN IF EXISTS future_vision,
  DROP COLUMN IF EXISTS content_preference,
  DROP COLUMN IF EXISTS learning_frustration,
  DROP COLUMN IF EXISTS finance_rating,
  DROP COLUMN IF EXISTS career_rating,
  DROP COLUMN IF EXISTS health_rating,
  DROP COLUMN IF EXISTS relationships_rating,
  DROP COLUMN IF EXISTS confidence_rating,
  DROP COLUMN IF EXISTS change_one_thing,
  DROP COLUMN IF EXISTS goal_ranking,
  DROP COLUMN IF EXISTS consistency_help,
  DROP COLUMN IF EXISTS consistency_help_other,
  DROP COLUMN IF EXISTS book_power_of_habit,
  DROP COLUMN IF EXISTS book_monk_who_sold_ferrari;
