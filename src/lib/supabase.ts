import { createClient } from '@supabase/supabase-js'

const createSafeClient = (url: string | undefined, key: string | undefined) => {
  if (!url || !key || url === '' || key === '') {
    return null;
  }
  try {
    return createClient(url, key);
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    return null;
  }
}

// MOSI Interview System Client
export const mosiSupabase = createSafeClient(
  process.env.NEXT_PUBLIC_MOSI_SUPABASE_URL,
  process.env.NEXT_PUBLIC_MOSI_SUPABASE_ANON_KEY
)

// MSME Intelligence Client
export const msmeSupabase = createSafeClient(
  process.env.NEXT_PUBLIC_MSME_SUPABASE_URL,
  process.env.NEXT_PUBLIC_MSME_SUPABASE_ANON_KEY
)

// MSINS Platform Client
export const msinsSupabase = createSafeClient(
  process.env.NEXT_PUBLIC_MSINS_SUPABASE_URL,
  process.env.NEXT_PUBLIC_MSINS_SUPABASE_ANON_KEY
)
