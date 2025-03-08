"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/atoms/Button/Button"
import { TaskCard } from "@/components/molecules/TaskCard/TaskCard"
import { TaskModal } from "@/components/molecules/TaskModal/TaskModal"
import { TaskTemplateModal } from "@/components/molecules/TaskTemplateModal/TaskTemplateModal"
import { Task, TaskTemplate, TaskUser } from "@/types/task"
import { taskTemplates } from "@/data/taskTemplates"
import { cn } from "@/lib/utils"

interface TaskListProps {
  title: string
  tasks: Task[]
  count: number
  isCompleted?: boolean
  expandedTasks: { [key: string]: boolean }
  onToggleExpand: (taskId: string) => void
  onCreateTask?: (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">) => void
  onUpdateTask?: (taskId: string, data: Partial<Task>) => void
  onDeleteTask?: (taskId: string) => void
  onMoveTask?: (taskId: string, newStatus: "progress" | "completed") => void
  className?: string
}

const users: TaskUser[] = [
  { id: "1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "Zeynep Şahin", avatar: "https://i.pravatar.cc/150?img=4" },
]

export const TaskList = ({
  title,
  tasks,
  count,
  isCompleted = false,
  expandedTasks,
  onToggleExpand,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onMoveTask,
  className,
}: TaskListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()

  const deleteTask = (taskId: string) => {
    onDeleteTask?.(taskId)
  }

  const handleOpenModal = (task?: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedTask(undefined)
    setIsModalOpen(false)
  }

  const handleSubmit = (data: any) => {
    if (selectedTask) {
      onUpdateTask?.(selectedTask.id, {
        ...data,
        status: selectedTask.status,
        createdAt: selectedTask.createdAt,
        updatedAt: new Date().toISOString(),
        createdBy: selectedTask.createdBy
      })
    } else {
      onCreateTask?.(data)
    }
    handleCloseModal()
  }

  const handleSelectTemplate = (template: TaskTemplate) => {
    const startDate = new Date().toISOString().split("T")[0]
    const dueDate = new Date(Date.now() + template.defaultDuration * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]

    const subTasks = template.subTaskTemplates?.map((subTemplate) => ({
      title: subTemplate.name,
      description: subTemplate.description,
      status: "progress" as const,
      priority: subTemplate.defaultPriority,
      startDate,
      dueDate: new Date(Date.now() + subTemplate.defaultDuration * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      assignees: subTemplate.defaultAssignees || []
    }))

    const newTask: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy"> = {
      title: template.name,
      description: template.description,
      status: "progress",
      priority: template.defaultPriority,
      startDate,
      dueDate,
      assignees: template.defaultAssignees || [],
      category: template.category,
      templateId: template.id,
      subTasks: subTasks as Task[] | undefined
    }

    onCreateTask?.(newTask)
    setIsTemplateModalOpen(false)
  }

  return (
    <>
      <div className={cn("rounded-2xl bg-white p-6 shadow-sm", className)}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isCompleted ? "bg-green-500" : "bg-blue-500"
              )}
            />
            <h2 className="text-lg font-medium">{title}</h2>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
              {count} Task
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {!isCompleted && (
              <>
                <Button variant="secondary" onClick={() => setIsTemplateModalOpen(true)}>
                  Şablondan Oluştur
                </Button>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                  + Yeni Görev
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-gray-500">
                <th className="w-[40%] pb-4 pl-4">Görev Adı</th>
                <th className="w-[15%] pb-4">Atananlar</th>
                <th className="w-[12%] pb-4">Başlangıç</th>
                <th className="w-[10%] pb-4">Öncelik</th>
                <th className="w-[12%] pb-4">Bitiş</th>
                <th className="w-[11%] pb-4">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td colSpan={6} className="px-0 py-2">
                    <TaskCard
                      task={task}
                      isExpanded={expandedTasks[task.id]}
                      onToggleExpand={onToggleExpand}
                      onDelete={onDeleteTask}
                      onMove={onMoveTask}
                      onEdit={handleOpenModal}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        users={users}
        onSubmit={handleSubmit}
      />

      <TaskTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        templates={taskTemplates}
        onSelectTemplate={handleSelectTemplate}
      />
    </>
  )
}
