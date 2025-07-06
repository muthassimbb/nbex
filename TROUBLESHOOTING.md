# সমস্যা সমাধান নির্দেশিকা

## Supabase কানেকশন সমস্যা

যদি আপনার ডাটা ডাটাবেসে যোগ না হয়, নিম্নলিখিত পদক্ষেপগুলি চেক করুন:

### 1. `.env.local` ফাইল সঠিকভাবে সেট আপ করা হয়েছে কিনা

আপনার `.env.local` ফাইলে নিম্নলিখিত লাইনগুলি থাকতে হবে:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

সঠিক URL এবং ANON KEY পেতে:

1. Supabase ড্যাশবোর্ডে যান
2. আপনার প্রজেক্টে ক্লিক করুন
3. বাম দিকে "Settings" > "API" মেনুতে যান
4. "Project URL" এবং "anon" কী কপি করুন

### 2. সার্ভার রিস্টার্ট করুন

`.env.local` ফাইল পরিবর্তন করার পর, আপনার ডেভেলপমেন্ট সার্ভার রিস্টার্ট করতে হবে:

```bash
npm run dev
```

### 3. RLS (Row Level Security) সেটিংস চেক করুন

Supabase ডিফল্টভাবে সব টেবিলে RLS এনাবল করে, যা ডাটা ইনসার্ট বাধা দিতে পারে। RLS সঠিকভাবে কনফিগার করতে:

1. Supabase ড্যাশবোর্ডে যান
2. বাম দিকে "Authentication" > "Policies" মেনুতে যান
3. "phone_numbers" টেবিল খুঁজুন
4. নিশ্চিত করুন যে "INSERT" এবং "SELECT" অপারেশনের জন্য পলিসি আছে
5. যদি না থাকে, নিম্নলিখিত SQL কোড চালান:

```sql
-- RLS এনাবল করুন
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;

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
```

### 4. টেস্ট পেজ ব্যবহার করুন

আমরা একটি টেস্ট পেজ তৈরি করেছি যা Supabase কানেকশন এবং ডাটা ইনসার্শন টেস্ট করতে সাহায্য করবে:

1. `/test-connection` পেজে যান (উদাহরণ: http://localhost:3000/test-connection)
2. "কানেকশন স্ট্যাটাস" চেক করুন - এটি "সংযোগ সফল" দেখাতে হবে
3. "ডাটা ইনসার্ট টেস্ট" সেকশনে একটি টেস্ট নম্বর লিখুন এবং "ইনসার্ট টেস্ট" বাটনে ক্লিক করুন
4. যদি কোন এরর দেখায়, এরর মেসেজ পড়ুন এবং সমস্যা অনুযায়ী সমাধান করুন

### 5. ব্রাউজার কনসোল চেক করুন

ডেভেলপার টুলস (F12) খুলুন এবং কনসোল ট্যাবে যেকোনো এরর মেসেজ চেক করুন। এই এরর মেসেজগুলি সমস্যা সনাক্ত করতে সাহায্য করবে।

### 6. Supabase লগ চেক করুন

1. Supabase ড্যাশবোর্ডে যান
2. "Database" > "Logs" মেনুতে যান
3. সাম্প্রতিক লগ চেক করুন যেকোনো এরর মেসেজের জন্য

### 7. সাধারণ সমস্যা

#### CORS সমস্যা

যদি আপনি CORS সংক্রান্ত এরর দেখেন, Supabase প্রজেক্টের সেটিংসে আপনার ডোমেইন যোগ করুন:

1. Supabase ড্যাশবোর্ডে যান
2. "Authentication" > "URL Configuration" মেনুতে যান
3. "Additional Redirect URLs" এ `http://localhost:3000` যোগ করুন

#### RPC সমস্যা

যদি আপনি RPC সংক্রান্ত এরর দেখেন, আপনার Supabase URL এবং কী চেক করুন।

#### "relation phone_numbers_id_seq does not exist" এরর

এই এররটি দেখা দিতে পারে কারণ আমরা UUID টাইপ ব্যবহার করেছি যা সিকোয়েন্স ব্যবহার করে না। এই সমস্যা সমাধানের জন্য:

1. Supabase SQL এডিটরে যান
2. নিম্নলিখিত SQL কোড রান করুন:

```sql
-- টেবিল পাবলিক করুন (অপশনাল)
GRANT SELECT, INSERT ON phone_numbers TO anon, authenticated;
-- সিকোয়েন্স রেফারেন্স অপসারণ করুন
```

#### টেবিল স্ট্রাকচার সমস্যা

টেবিল সঠিকভাবে তৈরি করা হয়েছে কিনা নিশ্চিত করুন:

1. Supabase ড্যাশবোর্ডে যান
2. "Table Editor" মেনুতে যান
3. "phone_numbers" টেবিল খুলুন
4. নিশ্চিত করুন যে টেবিলের কলামগুলি সঠিকভাবে সেট করা আছে:
   - `id` (UUID, Primary Key)
   - `number` (Text, Not Null)
   - `created_at` (Timestamp with time zone)
