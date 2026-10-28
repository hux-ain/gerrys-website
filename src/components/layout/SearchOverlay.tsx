'use client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Close, Mic, Search } from '../ui/Icons'

/* Minimal typing for the browser Speech Recognition API (Chrome, Edge, Safari) */
type SpeechRec = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}
type SpeechCtor = new () => SpeechRec

const getSpeech = (): SpeechCtor | null => {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { SpeechRecognition?: SpeechCtor; webkitSpeechRecognition?: SpeechCtor }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

export function useVoiceSearch(onText: (t: string) => void) {
  const [listening, setListening] = useState(false)
  const [error, setError] = useState('')
  const recRef = useRef<SpeechRec | null>(null)

  const start = useCallback(() => {
    const Ctor = getSpeech()
    if (!Ctor) {
      setError('Voice search works in Chrome, Edge and Safari. Please type instead.')
      return
    }
    setError('')
    const rec = new Ctor()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript || ''
      if (text) onText(text)
    }
    rec.onerror = (e) => setError(e.error === 'not-allowed' ? 'Please allow microphone access to use voice search.' : 'Could not hear you, please try again.')
    rec.onend = () => setListening(false)
    recRef.current = rec
    setListening(true)
    rec.start()
  }, [onText])

  const stop = useCallback(() => recRef.current?.stop(), [])
  return { listening, error, start, stop }
}

export function SearchOverlay({ open, onClose, startWithVoice }: { open: boolean; onClose: () => void; startWithVoice?: boolean }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const go = useCallback(
    (text: string) => {
      const t = text.trim()
      if (!t) return
      onClose()
      router.push(`/search?q=${encodeURIComponent(t)}`)
    },
    [onClose, router],
  )

  const voice = useVoiceSearch(
    useCallback(
      (t: string) => {
        setQ(t)
        go(t)
      },
      [go],
    ),
  )

  useEffect(() => {
    if (!open) return
    setTimeout(() => inputRef.current?.focus(), 50)
    if (startWithVoice) voice.start()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label="Search the website" className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm animate-[rise_0.3s_ease_both]">
      <div className="mx-auto mt-[18vh] max-w-3xl px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            go(q)
          }}
          className="flex items-center gap-3 rounded-full bg-white p-2 pl-6 shadow-2xl"
        >
          <Search width={22} height={22} className="shrink-0 text-black/50" />
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            id="site-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={voice.listening ? 'Listening… speak now' : 'Search services, blogs, news…'}
            className="min-w-0 flex-1 bg-transparent py-3 text-lg outline-none"
          />
          <button
            type="button"
            onClick={voice.listening ? voice.stop : voice.start}
            aria-label={voice.listening ? 'Stop voice search' : 'Search by voice'}
            aria-pressed={voice.listening}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${voice.listening ? 'animate-pulse bg-red-500 text-white' : 'bg-black/5 hover:bg-primary'}`}
          >
            <Mic width={22} height={22} />
          </button>
          <button type="submit" className="h-12 shrink-0 rounded-full bg-primary px-6 font-display font-bold">
            Search
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white/80" aria-live="polite">
          {voice.error || (voice.listening ? '🎙️ Listening… say what you are looking for' : 'Tip: press the microphone and speak, e.g. “dark fiber” or “Avaya”.')}
        </p>
        <button type="button" onClick={onClose} aria-label="Close search" className="mx-auto mt-8 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <Close />
        </button>
      </div>
    </div>
  )
}
