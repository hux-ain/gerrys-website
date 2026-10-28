import type { Faq } from './types'

// Copied from gerrys.net/faq (October 2026)
export const faqDefaults: Faq[] = [
  {
    question: 'What is CIR, and how does it differ from standard corporate broadband?',
    answer:
      'CIR internet connection means your bandwidth is 100% dedicated to your business with a 1:1 contention ratio—the speed you pay for is guaranteed 24/7, completely bypassing local network congestion.',
  },
  {
    question: 'Does your CIR Internet provide symmetrical speeds?',
    answer:
      'Yes. Unlike broadband (which offers fast downloads but slow uploads), our Dedicated Internet Access (DIA) provides identical upload and download speeds. This is critical for businesses running video conferencing, uploading massive files to cloud storage, or hosting on-premise servers.',
  },
  {
    question: 'What kind of Service Level Agreement (SLA) do you offer?',
    answer:
      'We back our enterprise CIR lines with a comprehensive SLA that guarantees 99.9% to 99.99% uptime. The SLA also outlines strict contractual metrics for latency, packet loss, and a Mean Time to Repair (MTTR) window—typically under 4 hours for priority corporate links.',
  },
  {
    question: 'Can we migrate our existing on-premise Avaya PBX to a hybrid or cloud setup?',
    answer:
      'Absolutely. We specialize in updating legacy Avaya systems. We can implement hybrid architectures that connect your existing on-premise Avaya hardware to cloud collaboration tools, or fully migrate your setup to a modern cloud communication platform without losing your current extensions or direct inward dialing (DID) configurations.',
  },
  {
    question: 'Does your Avaya infrastructure support remote and hybrid teams?',
    answer:
      'Yes. Using the Avaya apps for desktop and mobile, your employees can make and receive corporate voice calls, join video meetings, and access team chats from anywhere with an active internet connection, mirroring their physical desk phone capabilities entirely.',
  },
  {
    question: 'How do you ensure voice quality over the network?',
    answer:
      'We configure Quality of Service (QoS) protocols across your data network. This ensures that voice and video packets from your Avaya system are automatically prioritized over standard web traffic, eliminating call drops, choppy audio, or lag.',
  },
  {
    question: 'Do you provide managed hardware (routers, switches, firewalls) with your services?',
    answer:
      "We offer both options. We can provide and manage enterprise-grade hardware (such as Cisco, Fortinet, or Avaya endpoints) as a fully managed service, handling all configurations and security updates. Alternatively, we can hand off the connection directly to your internal IT team's existing infrastructure.",
  },
]
