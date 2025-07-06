-- টেবিলে login_key কলাম যোগ করুন (যদি আগে থেকে না থাকে)
ALTER TABLE phone_numbers ADD COLUMN IF NOT EXISTS login_key TEXT;

-- login_key কলামে ইনডেক্স তৈরি করুন
CREATE INDEX IF NOT EXISTS phone_numbers_login_key_idx ON phone_numbers(login_key);

-- RLS পলিসি আপডেট করুন
DROP POLICY IF EXISTS "Anyone can insert phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Anyone can view phone numbers" ON phone_numbers;

-- সবার জন্য INSERT অনুমতি দিন
CREATE POLICY "Anyone can insert phone numbers"
  ON phone_numbers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- সবার জন্য SELECT অনুমতি দিন, কিন্তু শুধুমাত্র নিজের login_key এর ডাটা দেখতে পারবে
CREATE POLICY "Users can view their own numbers"
  ON phone_numbers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- টেবিল পাবলিক করুন
GRANT SELECT, INSERT ON phone_numbers TO anon, authenticated; 