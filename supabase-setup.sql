-- টেবিল তৈরি করুন (যদি আগে থেকে না থাকে)
CREATE TABLE IF NOT EXISTS phone_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ইনডেক্স তৈরি করুন
CREATE INDEX IF NOT EXISTS phone_numbers_number_idx ON phone_numbers(number);

-- RLS (Row Level Security) এনাবল করুন
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;

-- আগের পলিসিগুলি মুছে ফেলুন (যদি থাকে)
DROP POLICY IF EXISTS "Anyone can insert phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Anyone can view phone numbers" ON phone_numbers;

-- সবার জন্য INSERT অনুমতি দিন
CREATE POLICY "Anyone can insert phone numbers"
  ON phone_numbers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- সবার জন্য SELECT অনুমতি দিন
CREATE POLICY "Anyone can view phone numbers"
  ON phone_numbers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- টেবিল পাবলিক করুন (অপশনাল)
GRANT SELECT, INSERT ON phone_numbers TO anon, authenticated; 