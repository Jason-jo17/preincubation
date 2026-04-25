function getEnv(key: string, fallback?: string): string {
  const val = process.env[key];
  if (!val && !fallback) {
    if (typeof window === 'undefined') {
      console.warn(`⚠️  Missing env var: ${key}`);
    }
    return '';
  }
  return val || fallback || '';
}

export const env = {
  DATABASE_URL: getEnv('DATABASE_URL'),
  NEXTAUTH_SECRET: getEnv('NEXTAUTH_SECRET', 'dev-secret-change-in-production'),
  NEXTAUTH_URL: getEnv('NEXTAUTH_URL', 'http://localhost:3000'),
  NEXT_PUBLIC_SUPABASE_URL: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
};
