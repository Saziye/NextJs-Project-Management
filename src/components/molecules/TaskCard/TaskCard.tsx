import {
  ChevronDown,
  ChevronRight,
  Eye,
  Flag,
  Menu,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/atoms/Button/Button"
import { AvatarGroup } from "@/components/molecules/AvatarGroup/AvatarGroup"
import { cn } from "@/lib/utils"
import { Task } from "@/types/task"

interface TaskCardProps {
  task: Task
  isExpanded: boolean
  onToggleExpand: (taskId: string) => void
  onDelete?: (taskId: string) => void
  className?: string
}

export const TaskCard = ({
  task,
  isExpanded,
  onToggleExpand,
  onDelete,
  className,
}: TaskCardProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700"
      case "medium":
        return "bg-yellow-50 text-yellow-700"
      case "low":
        return "bg-green-50 text-green-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  return (
    <div className={cn("flex items-center space-x-3 py-4", className)}>
      <button
        onClick={() => onToggleExpand(task.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      <Menu className="h-4 w-4 text-gray-400" />
      <span className="flex-1 font-medium">{task.title}</span>

      <AvatarGroup users={task.assignees} />

      <div className="text-sm text-gray-600">
        {new Date(task.startDate).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium",
          getPriorityStyles(task.priority)
        )}
      >
        <Flag className="h-3.5 w-3.5" />
        {task.priority === "high"
          ? "High Priority"
          : task.priority === "medium"
            ? "Mid Priority"
            : "Low Priority"}
      </span>

      <div className="text-sm text-gray-600">
        {new Date(task.dueDate).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
        {onDelete && (
          <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
