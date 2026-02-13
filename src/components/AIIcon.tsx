import { useId } from 'react'
import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'

type AIIconProps = {
  icon: LucideIcon
  size?: number
  strokeWidth?: number
  className?: string
}

function AIIcon({
  icon: Icon,
  size = 18,
  strokeWidth = 1.7,
  className,
}: AIIconProps) {
  const maskId = useId()

  return (
    <span
      className={`ai-icon${className ? ` ${className}` : ''}`}
      style={{ '--ai-icon-size': `${size}px` } as CSSProperties}
    >
      <Icon
        aria-hidden="true"
        className="ai-icon__stroke"
        size={size}
        strokeWidth={strokeWidth}
      />
      <svg
        aria-hidden="true"
        className="ai-icon__gradient-svg"
        viewBox="0 0 24 24"
      >
        <defs>
          <mask
            id={maskId}
            x="0"
            y="0"
            width="24"
            height="24"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <Icon color="white" size={24} strokeWidth={strokeWidth} />
          </mask>
        </defs>
        <foreignObject
          x="0"
          y="0"
          width="24"
          height="24"
          mask={`url(#${maskId})`}
        >
          <div className="ai-icon__gradient" />
        </foreignObject>
      </svg>
    </span>
  )
}

export { AIIcon }
