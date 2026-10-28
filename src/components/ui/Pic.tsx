import Image from 'next/image'
import type { Img } from '@/content/types'

type Props = {
  img?: Img
  sizes: string
  className?: string
  priority?: boolean
  /** Fill the parent box (parent must be position:relative and have a size). */
  fill?: boolean
  width?: number
  height?: number
}

/** next/image wrapper: WebP/AVIF, lazy loading and correct sizes automatically. SVG files are passed through. */
export function Pic({ img, sizes, className, priority, fill = true, width, height }: Props) {
  if (!img?.url) return null
  const svg = img.url.split('?')[0].toLowerCase().endsWith('.svg')
  if (fill) {
    return <Image src={img.url} alt={img.alt || ''} fill sizes={sizes} className={className} priority={priority} unoptimized={svg} />
  }
  return (
    <Image
      src={img.url}
      alt={img.alt || ''}
      width={width ?? img.width ?? 800}
      height={height ?? img.height ?? 600}
      sizes={sizes}
      className={className}
      priority={priority}
      unoptimized={svg}
    />
  )
}
