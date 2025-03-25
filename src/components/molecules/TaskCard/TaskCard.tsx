import {
  ChevronDown,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Trash2,
  GripVertical,
  Clock,
  CalendarDays,
  UserCheck,
  Badge,
  CheckCircle2,
} from "lucide-react"
import { Task } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
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
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Sunucu tarafında ve istemci tarafında uyum sağlamak için
  useEffect(() => {
    setIsClient(true);
    console.log('TASK**', task)
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const hasSubTasks = task.subTasks && task.subTasks.length > 0
  const completedSubTasks =
    task.subTasks?.filter((st) => st.status === "completed").length || 0
  const totalSubTasks = task.subTasks?.length || 0
  const progress = totalSubTasks
    ? Math.round((completedSubTasks / totalSubTasks) * 100)
    : 0

  // Sürükle bırak için gerekli olay işleyicileri
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id)
    e.dataTransfer.effectAllowed = "move"
    setTimeout(() => setIsDragging(true), 0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Hidrasyon hatalarını önlemek için istemci tarafında olana kadar basit yapı göster
  if (!isClient) {
    return (
      <div className={cn("space-y-2 transition-all duration-200", className)}>
        <div className="group relative flex items-center rounded-lg border border-transparent p-2 transition-all">
          {/* Görev içeriği olmayan basit bir yapı */}
          <div className="w-full">
            <div className="animate-pulse">
              <div className="h-4 w-[40%] rounded bg-gray-200"></div>
              <div className="mt-2 h-3 w-[80%] rounded bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "space-y-2 transition-all duration-200",
        isDragging && "opacity-50",
        className
      )}
    >
      <div
        ref={dragRef}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={cn(
          "group relative flex items-center rounded-lg border border-transparent p-2 transition-all hover:border-gray-200 hover:bg-gray-50",
          task.status === "completed" && "bg-gray-50"
        )}
      >
        {/* Sürükle tutamacı */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => hasSubTasks && onToggleExpand(task.id)}
          className={cn(
            "w-[40px] text-gray-400 transition-colors hover:text-gray-700",
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
          <div className="flex items-center space-x-2">
            {task.status === "completed" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <Badge className="h-4 w-4 text-indigo-500" />
            )}
            <h3
              className={cn(
                "font-medium text-gray-800",
                task.status === "completed" && "text-gray-500 line-through"
              )}
            >
              {task.title}
            </h3>
            {task.category && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {task.category}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
            {task.description}
          </p>

          {hasSubTasks && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="h-1.5 flex-grow rounded-full bg-gray-100">
                <div
                  className="h-1.5 rounded-full bg-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500">
                {completedSubTasks}/{totalSubTasks}
              </span>
            </div>
          )}
        </div>

        <div className="w-[15%]">
          {task.assignees && task.assignees.length > 0 && (
            <div className="group flex items-center">
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((assignee) => (
                  <Image
                    width={32}
                    height={32}
                    key={assignee.id}
                    src={assignee.avatar}
                    alt={assignee.name}
                    className="h-8 w-8 rounded-full border-2 border-white shadow-sm ring-2 ring-transparent transition-all hover:z-10 hover:ring-indigo-200"
                    title={assignee.name}
                  />
                ))}
              </div>
              {task.assignees.length > 3 && (
                <span className="ml-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  +{task.assignees.length - 3}
                </span>
              )}
              <UserCheck className="ml-2 h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          )}
        </div>

        <div className="flex w-[12%] items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4 text-gray-400" />
          {formatDate(task.startDate)}
        </div>

        <div className="w-[10%]">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              task.priority === "high"
                ? "border border-red-200 bg-red-50 text-red-700"
                : task.priority === "medium"
                  ? "border border-amber-200 bg-amber-50 text-amber-700"
                  : "border border-green-200 bg-green-50 text-green-700"
            )}
          >
            {task.priority === "high"
              ? "Yüksek"
              : task.priority === "medium"
                ? "Orta"
                : "Düşük"}
          </span>
        </div>

        <div className="flex w-[12%] items-center text-sm text-gray-500">
          <CalendarDays className="mr-1 h-4 w-4 text-gray-400" />
          {formatDate(task.dueDate)}
        </div>

        <div className="flex w-[11%] items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(task)}
            className="rounded-full transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {onMove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onMove(
                  task.id,
                  task.status === "progress" ? "completed" : "progress"
                )
              }
              className="rounded-full transition-colors hover:bg-green-50 hover:text-green-600"
            >
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Alt görevler */}
      {hasSubTasks && isExpanded && task.subTasks && (
        <div className="relative ml-9 space-y-2 border-l-2 border-indigo-100 pb-1 pl-6 pt-2">
          {task.subTasks.map((subTask) => (
            <div
              key={subTask.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", subTask.id)
                e.dataTransfer.effectAllowed = "move"
              }}
              className="group relative rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
            >
              {/* Alt görev için sürükle tutamacı */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {subTask.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Badge className="h-4 w-4 text-indigo-500" />
                  )}
                  <h4
                    className={cn(
                      "font-medium text-gray-700",
                      subTask.status === "completed" &&
                        "text-gray-500 line-through"
                    )}
                  >
                    {subTask.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-3">
                  {subTask.assignees && subTask.assignees.length > 0 && (
                    <div className="flex -space-x-1">
                      {subTask.assignees.slice(0, 2).map((assignee) => (
                        <Image
                          width={32}
                          height={32}
                          key={assignee.id}
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="h-6 w-6 rounded-full border border-white shadow-sm"
                          title={assignee.name}
                        />
                      ))}
                      {subTask.assignees.length > 2 && (
                        <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                          +{subTask.assignees.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-1 text-xs font-medium",
                        subTask.priority === "high"
                          ? "bg-red-50 text-red-700"
                          : subTask.priority === "medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-green-50 text-green-700"
                      )}
                    >
                      {subTask.priority === "high"
                        ? "Yüksek"
                        : subTask.priority === "medium"
                          ? "Orta"
                          : "Düşük"}
                    </span>

                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="mr-1 h-3 w-3 text-gray-400" />
                      {formatDate(subTask.dueDate)}
                    </div>
                  </div>

                  <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {subTask.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
