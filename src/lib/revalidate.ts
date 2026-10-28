import { revalidatePath } from 'next/cache'

// Rebuild the cached pages after content changes in the admin panel.
// Wrapped in try/catch because the seed script runs outside Next.js.
export const revalidateSite = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* not running inside Next.js (e.g. seed script) */
  }
}
