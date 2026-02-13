import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import './flickerUnderline.css'

type FlickerUnderlineColor = 'green' | 'lime' | 'emerald'

type FlickerUnderlineProps = {
  children: ReactNode
  color?: FlickerUnderlineColor
  alwaysOn?: boolean
  className?: string
}

const palette: Record<
  FlickerUnderlineColor,
  {
    hue: [number, number]
    saturation: [number, number]
    lightness: [number, number]
  }
> = {
  green: { hue: [130, 160], saturation: [60, 100], lightness: [30, 65] },
  lime: { hue: [135, 160], saturation: [70, 100], lightness: [45, 70] },
  emerald: { hue: [130, 150], saturation: [55, 90], lightness: [25, 55] },
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function FlickerUnderline({
  children,
  color = 'green',
  alwaysOn = false,
  className,
}: FlickerUnderlineProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const host = hostRef.current
    const underline = underlineRef.current
    if (!host || !underline) return undefined

    const ranges = palette[color]
    let lastWidth = -1

    const buildSquares = () => {
      const width = host.getBoundingClientRect().width
      if (!Number.isFinite(width) || width <= 0) {
        return
      }

      if (Math.abs(width - lastWidth) < 0.5) {
        return
      }

      lastWidth = width

      const approxCell = 3.2
      const gap = 0.75
      const count = Math.max(1, Math.floor((width + gap) / (approxCell + gap)))
      const cellWidth = Math.max(2, (width - gap * (count - 1)) / count)

      underline.style.setProperty('--cell-gap', `${gap}px`)
      underline.innerHTML = ''

      const fragment = document.createDocumentFragment()

      for (let index = 0; index < count; index += 1) {
        const square = document.createElement('span')
        square.className = 'flicker-square'

        const hue = randomBetween(ranges.hue[0], ranges.hue[1])
        const saturation = randomBetween(
          ranges.saturation[0],
          ranges.saturation[1],
        )
        const lightness = randomBetween(
          ranges.lightness[0],
          ranges.lightness[1],
        )

        square.style.width = `${cellWidth.toFixed(2)}px`
        square.style.height = `${Math.round(randomBetween(2, 4))}px`
        square.style.setProperty(
          '--g',
          `hsl(${hue.toFixed(0)}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`,
        )
        square.style.setProperty(
          '--d',
          `${randomBetween(1.2, 2.7).toFixed(2)}s`,
        )
        square.style.setProperty(
          '--delay',
          `${-randomBetween(0.15, 1.95).toFixed(2)}s`,
        )
        square.style.setProperty('--o', randomBetween(0.35, 0.9).toFixed(2))

        fragment.appendChild(square)
      }

      underline.appendChild(fragment)
    }

    buildSquares()

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => buildSquares())
      observer.observe(host)

      return () => {
        observer.disconnect()
      }
    }

    return undefined
  }, [color])

  return (
    <span
      className={`flicker-link${alwaysOn ? ' is-active' : ''}${className ? ` ${className}` : ''}`}
      ref={hostRef}
      data-variant={color}
    >
      <span className="flicker-link__content">{children}</span>
      <span
        className="flicker-underline"
        aria-hidden="true"
        ref={underlineRef}
      />
    </span>
  )
}

export { FlickerUnderline }
