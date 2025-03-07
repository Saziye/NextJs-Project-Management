import { Avatar } from "@/components/atoms/Avatar/Avatar"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  avatar: string
}

interface AvatarGroupProps {
  users: User[]
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export const AvatarGroup = ({
  users,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps) => {
  const visibleUsers = users.slice(0, max)
  const remainingCount = users.length - max

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleUsers.map((user) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={user.name}
          size={size}
          showTooltip
          tooltipText={user.name}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full border-2 border-white bg-gray-200 font-medium text-gray-600",
            size === "sm"
              ? "h-6 w-6 text-xs"
              : size === "md"
                ? "h-8 w-8 text-sm"
                : "h-10 w-10 text-base"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
