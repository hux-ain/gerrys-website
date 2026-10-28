import { WhatsApp } from '../ui/Icons'

export function WhatsAppButton({ number }: { number: string }) {
  const href = `https://api.whatsapp.com/send/?phone=${encodeURIComponent(number)}&text=${encodeURIComponent("Tell me more about Gerry's ?")}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="wa-pulse fixed bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
    >
      <WhatsApp width={30} height={30} />
    </a>
  )
}
