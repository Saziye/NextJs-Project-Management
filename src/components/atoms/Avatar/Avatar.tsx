import { cn } from "@/lib/utils"

interface AvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
  showTooltip?: boolean
  tooltipText?: string
}

export const Avatar = ({
  src,
  alt,
  size = "md",
  className,
  showTooltip = false,
  tooltipText,
}: AvatarProps) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <div className={cn("group/avatar relative", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          sizes[size],
          "rounded-full border-2 border-white object-cover"
        )}
      />
      {showTooltip && tooltipText && (
        <div className="absolute left-1/2 top-full z-50 mt-1 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover/avatar:block">
          {tooltipText}
        </div>
      )}
    </div>
  )
}
