import { PrimaryButton } from '@/components/ui/PrimaryButton'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-black px-6 pt-40 text-center text-white">
      <div>
        <p className="font-display text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8">
          <PrimaryButton href="/">Back to Home</PrimaryButton>
        </div>
      </div>
    </section>
  )
}
