import {
  ChevronDown,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { Task } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  isExpanded: boolean
  onToggleExpand: (taskId: string) => void
  onDelete?: (taskId: string) => void
  onMove?: (taskId: string, newStatus: "progress" | "completed") => void
  onEdit?: (task: Task) => void
  className?: string
}

export const TaskCard = ({
  task,
  isExpanded,
  onToggleExpand,
  onDelete,
  onMove,
  onEdit,
  className,
}: TaskCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const hasSubTasks = task.subTasks && task.subTasks.length > 0

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center">
        <button
          onClick={() => hasSubTasks && onToggleExpand(task.id)}
          className={cn(
            "w-[40px] text-gray-500 hover:text-gray-700",
            !hasSubTasks && "invisible"
          )}
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>

        <div className="w-[calc(40%-40px)]">
          <div className="flex items-center space-x-4">
            <h3 className="font-medium">{task.title}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        </div>

        <div className="w-[15%]">
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.map((assignee) => (
                <img
                  key={assignee.id}
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  title={assignee.name}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-[12%] text-sm text-gray-500">
          {formatDate(task.startDate)}
        </div>

        <div className="w-[10%]">
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs font-medium",
              task.priority === "high"
                ? "bg-red-100 text-red-700"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            )}
          >
            {task.priority === "high"
              ? "Yüksek"
              : task.priority === "medium"
                ? "Orta"
                : "Düşük"}
          </span>
        </div>

        <div className="w-[12%] text-sm text-gray-500">
          {formatDate(task.dueDate)}
        </div>

        <div className="w-[11%] flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit?.(task)}>
            <Eye className="h-5 w-5" />
          </Button>
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
          {onMove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(task.id, task.status === "progress" ? "completed" : "progress")}
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Alt görevler */}
      {hasSubTasks && isExpanded && task.subTasks && (
        <div className="ml-9 space-y-2 border-l border-gray-200 pl-4">
          {task.subTasks.map((subTask) => (
            <div key={subTask.id} className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center">
                <div className="w-[40px]" />

                <div className="w-[calc(40%-40px)]">
                  <div className="flex items-center space-x-4">
                    <h4 className="font-medium">{subTask.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{subTask.description}</p>
                </div>

                <div className="w-[15%]">
                  {subTask.assignees && subTask.assignees.length > 0 && (
                    <div className="flex -space-x-2">
                      {subTask.assignees.map((assignee) => (
                        <img
                          key={assignee.id}
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="h-6 w-6 rounded-full border-2 border-white"
                          title={assignee.name}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-[12%] text-sm text-gray-500">
                  {formatDate(subTask.startDate)}
                </div>

                <div className="w-[10%]">
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      subTask.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : subTask.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    )}
                  >
                    {subTask.priority === "high"
                      ? "Yüksek"
                      : subTask.priority === "medium"
                        ? "Orta"
                        : "Düşük"}
                  </span>
                </div>

                <div className="w-[12%] text-sm text-gray-500">
                  {formatDate(subTask.dueDate)}
                </div>

                <div className="w-[11%] flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit?.(subTask)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(subTask.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  {onMove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMove(subTask.id, subTask.status === "progress" ? "completed" : "progress")}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
