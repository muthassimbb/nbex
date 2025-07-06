# ফোন নম্বর ফরম্যাটার

এটি একটি সহজ ফোন নম্বর ফরম্যাটার অ্যাপ্লিকেশন যা ফোন নম্বর পরিষ্কার করে এবং সংরক্ষণ করতে সাহায্য করে।

## বৈশিষ্ট্য

- ফোন নম্বর থেকে অযাচিত অক্ষর অপসারণ
- অটো-কপি ফাংশন
- ফোন নম্বর ইতিহাস সংরক্ষণ
- ডার্ক মোড সাপোর্ট

## ইনস্টলেশন

1. প্রথমে রিপোজিটরি ক্লোন করুন:

```bash
git clone https://github.com/your-username/phone-formatter.git
cd phone-formatter
```

2. ডিপেন্ডেন্সি ইনস্টল করুন:

```bash
npm install
# অথবা
yarn install
```

3. Supabase সেটআপ:
   - [Supabase](https://supabase.io/) এ একটি নতুন প্রোজেক্ট তৈরি করুন
   - `phone_numbers` নামে একটি টেবিল তৈরি করুন যার কলাম হবে: `id` (uuid, primary key), `number` (text), `created_at` (timestamp)
   - `.env.local` ফাইল তৈরি করুন এবং আপনার Supabase URL এবং ANON KEY যোগ করুন:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## ব্যবহার

ডেভেলপমেন্ট সার্ভার চালু করুন:

```bash
npm run dev
# অথবা
yarn dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) এ যান।

## প্রযুক্তি

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
