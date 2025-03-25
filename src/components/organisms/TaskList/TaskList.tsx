"use client"

import { useState, useEffect } from "react"
import React from "react"
import {
  MoreHorizontal,
  Plus,
  Inbox,
  Calendar,
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Badge,
  Clock,
  CalendarDays,
  Eye,
  Trash2,
} from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/atoms/Button/Button"
import { TaskModal } from "@/components/molecules/TaskModal/TaskModal"
import { TaskTemplateModal } from "@/components/molecules/TaskTemplateModal/TaskTemplateModal"
import { Task, TaskTemplate, TaskUser } from "@/types/task"
import { taskTemplates } from "@/data/taskTemplates"
import { cn } from "@/lib/utils"
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { TaskFormValues } from "@/components/molecules/TaskForm/TaskForm"

// API fonksiyonları
const api = {
  getTasks: async (status?: string): Promise<Task[]> => {
    // Gerçek bir API çağrısı olacak şekilde düzenlenebilir
    const response = await axios.get(
      `/api/tasks${status ? `?status=${status}` : ""}`
    )
    return response.data
  },

  createTask: async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<Task> => {
    const response = await axios.post("/api/tasks", task)
    return response.data
  },

  updateTask: async ({
    id,
    ...data
  }: { id: string } & Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`/api/tasks/${id}`, data)
    return response.data
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`/api/tasks/${id}`)
  },

  moveTask: async (
    id: string,
    newStatus: "progress" | "completed"
  ): Promise<Task> => {
    const response = await axios.patch(`/api/tasks/${id}/status`, {
      status: newStatus,
    })
    return response.data
  },
}

interface TaskListProps {
  title: string
  tasks: Task[]
  count: number
  isCompleted?: boolean
  expandedTasks: { [key: string]: boolean }
  onToggleExpand: (taskId: string) => void
  className?: string
  onCreateTask?: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">) => void
  onUpdateTask?: (taskId: string, data: Partial<Task>) => void 
  onMoveTask?: (taskId: string) => void
  onDeleteTask?: (taskId: string) => void
}

const users: TaskUser[] = [
  { id: "1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", name: "Zeynep Şahin", avatar: "https://i.pravatar.cc/150?img=4" },
]

export const TaskList = ({
  title,
  tasks: initialTasks,
  count: initialCount,
  isCompleted = false,
  expandedTasks,
  onToggleExpand,
  className,
  onCreateTask,
  onUpdateTask,
  onMoveTask,
  onDeleteTask,
}: TaskListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()
  const [filterVisible, setFilterVisible] = useState(false)

  const queryClient = useQueryClient()

  // Görevleri getir
  const { data: tasks = initialTasks, isLoading } = useQuery({
    queryKey: ["tasks", isCompleted ? "completed" : "progress"],
    queryFn: () => api.getTasks(isCompleted ? "completed" : "progress"),
    initialData: initialTasks,
    // Veri 5 dakika boyunca güncel kabul edilir
    staleTime: 1000 * 60 * 5,
   
  })

  // Görev oluştur
  const createTaskMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      // Görev listesini tekrar getir
      queryClient.invalidateQueries({
        queryKey: ["tasks", isCompleted ? "completed" : "progress"],
      })
      toast.success("Görev başarıyla oluşturuldu!")
    },
  })

  // Görev güncelle
  const updateTaskMutation = useMutation({
    mutationFn: api.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Görev başarıyla güncellendi!")
    },
  })

  // Görev sil
  const deleteTaskMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Görev başarıyla silindi!")
    },
  })

  // Görev durumunu değiştir
  const moveTaskMutation = useMutation({
    mutationFn: ({
      id,
      newStatus,
    }: {
      id: string
      newStatus: "progress" | "completed"
    }) => api.moveTask(id, newStatus),
    onSuccess: () => {
      // Her iki durumda da görevleri güncelle
      queryClient.invalidateQueries({ queryKey: ["tasks", "progress"] })
      queryClient.invalidateQueries({ queryKey: ["tasks", "completed"] })
      toast.success("Görev başarıyla taşındı!")
    },
    onError: () => {
      toast.error("Görev taşınırken hata oluştu!")
    },
  })

  const handleOpenModal = (task?: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedTask(undefined)
    setIsModalOpen(false)
  }

  const handleSubmit = (data: TaskFormValues) => {
    console.log("TaskList - Form gönderildi:", data); // Debug için
    
    try {
      if (selectedTask) {
        if (onUpdateTask) {
          console.log("TaskList - Görev güncelleniyor:", selectedTask.id, data); // Debug için
          onUpdateTask(selectedTask.id, data);
          toast.success("Görev başarıyla güncellendi!");
        } else {
          updateTaskMutation.mutate({
            id: selectedTask.id,
            ...data,
          });
        }
      } else {
        if (onCreateTask) {
          console.log("TaskList - Yeni görev oluşturuluyor:", data); // Debug için
          onCreateTask({
            ...data,
            status: "progress"
          });
          toast.success("Görev başarıyla oluşturuldu!");
        } else {
          createTaskMutation.mutate({
            ...data,
            status: "progress"
          });
        }
      }
      
      // Modal'ı kapat
      handleCloseModal();
    } catch (error) {
      console.error("Görev işlemi sırasında hata oluştu:", error);
      toast.error("İşlem sırasında bir hata oluştu!");
    }
  }

  const handleMoveTask = (
    taskId: string,
    newStatus: "progress" | "completed"
  ) => {
    if (onMoveTask && newStatus === "completed") {
      onMoveTask(taskId);
    } else {
      moveTaskMutation.mutate({ id: taskId, newStatus });
    }
  }

  const handleSelectTemplate = (template: TaskTemplate) => {
    const startDate = new Date().toISOString().split("T")[0]
    const dueDate = new Date(
      Date.now() + template.defaultDuration * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0]

    const subTasks = template.subTaskTemplates?.map((subTemplate) => ({
      title: subTemplate.name,
      description: subTemplate.description,
      status: "progress" as const,
      priority: subTemplate.defaultPriority,
      startDate,
      dueDate: new Date(
        Date.now() + subTemplate.defaultDuration * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      assignees: subTemplate.defaultAssignees || [],
    }))

    const newTask: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy"> =
      {
        title: template.name,
        description: template.description,
        status: "progress",
        priority: template.defaultPriority,
        startDate,
        dueDate,
        assignees: template.defaultAssignees || [],
        category: template.category,
        templateId: template.id,
        subTasks: subTasks as Task[] | undefined,
      }

    if (onCreateTask) {
      onCreateTask(newTask);
    } else {
      createTaskMutation.mutate(newTask);
    }
    setIsTemplateModalOpen(false)
  }

  // Hidrasyon hatasını önlemek için, istemci tarafında uygulamanın yüklenmesini bekle
  const [isClient, setIsClient] = useState(false)

  // useEffect yalnızca istemci tarafında çalışır
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Görevleri durumlara göre filtreleme
  const progressTasks = tasks.filter((task) => task.status === "progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  const onDragEnd = (result: {
    destination: { droppableId: string; index: number } | null
    source: { droppableId: string; index: number }
    draggableId: string
  }) => {
    const { destination, source, draggableId } = result

    // Eğer geçerli bir hedef yoksa işlemi iptal et
    if (!destination) return

    // Aynı liste içinde aynı pozisyona taşınıyorsa işlemi iptal et
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Farklı bir liste durumuna taşınıyor
    if (destination.droppableId !== source.droppableId) {
      const newStatus =
        destination.droppableId === "droppable-progress"
          ? "progress"
          : "completed"

      handleMoveTask(draggableId, newStatus)
    }
  }

  const handleDeleteTask = (taskId: string) => {
    if (onDeleteTask) {
      onDeleteTask(taskId);
    } else {
      deleteTaskMutation.mutate(taskId);
    }
  }

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg",
          className
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                isCompleted ? "bg-emerald-500" : "bg-indigo-500"
              )}
            />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <span
              suppressHydrationWarning
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
            >
              {isClient ? tasks?.length || 0 : initialCount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {!isCompleted && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterVisible(!filterVisible)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <Filter className="mr-1 h-4 w-4" />
                  Filtrele
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="border border-gray-200 bg-white hover:bg-gray-50"
                >
                  <Inbox className="mr-1 h-4 w-4" />
                  Şablondan
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleOpenModal()}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Yeni Görev
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {filterVisible && !isCompleted && (
          <div className="animate-fadeIn mb-4 flex flex-wrap gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
            <Button
              variant="ghost"
              size="sm"
              className="border border-gray-200 bg-white text-xs hover:bg-gray-50"
            >
              Tümü
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border border-gray-200 bg-white text-xs hover:bg-gray-50"
            >
              Yüksek Öncelik
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border border-gray-200 bg-white text-xs hover:bg-gray-50"
            >
              <Calendar className="mr-1 h-3 w-3" />
              Bu Hafta
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border border-gray-200 bg-white text-xs hover:bg-gray-50"
            >
              Bana Atanan
            </Button>
          </div>
        )}

        <div className="overflow-hidden">
          <div className="overflow-hidden rounded-lg border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                  <th className="w-[40%] py-3 pl-4">Görev Adı</th>
                  <th className="w-[15%] py-3">Atananlar</th>
                  <th className="w-[12%] py-3">Başlangıç</th>
                  <th className="w-[10%] py-3">Öncelik</th>
                  <th className="w-[12%] py-3">Bitiş</th>
                  <th className="w-[11%] py-3">İşlemler</th>
                </tr>
              </thead>
              {isLoading ? (
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 flex flex-col items-center">
                        <span className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></span>
                        <p className="mt-2">Yükleniyor...</p>
                    </td>
                  </tr>
                </tbody>
              ) : tasks.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <tbody className="divide-y divide-gray-100">
                    <Droppable
                      droppableId={
                        isCompleted
                          ? "droppable-completed"
                          : "droppable-progress"
                      }
                    >
                      {(provided) => (
                        <React.Fragment>
                          <tr style={{ display: "none" }}>
                            <td
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            ></td>
                          </tr>
                          {(isCompleted ? completedTasks : progressTasks).map(
                            (task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(dragProvided, dragSnapshot) => (
                                  <tr
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    {...dragProvided.dragHandleProps}
                                    className={`${dragSnapshot.isDragging ? "opacity-60" : ""}`}
                                  >
                                    <td className="w-[40%] py-3 pl-4 flex items-center space-x-2">
                                        <button
                                          onClick={() =>
                                            task.subTasks &&
                                            task.subTasks.length > 0 &&
                                            onToggleExpand(task.id)
                                          }
                                          className={`text-gray-400 transition-colors hover:text-gray-700 ${!(task.subTasks && task.subTasks.length > 0) && "invisible"}`}
                                        >
                                          {expandedTasks[task.id] ? (
                                            <ChevronDown className="h-5 w-5" />
                                          ) : (
                                            <ChevronRight className="h-5 w-5" />
                                          )}
                                        </button>
                                        <span>
                                          <span className="flex items-center space-x-2">
                                            {task.status === "completed" ? (
                                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            ) : (
                                              <Badge className="h-4 w-4 text-indigo-500" />
                                            )}
                                            <h3
                                              className={cn(
                                                "font-medium text-gray-800",
                                                task.status === "completed" &&
                                                  "text-gray-500 line-through"
                                              )}
                                            >
                                              {task.title}
                                            </h3>
                                            {task.category && (
                                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                {task.category}
                                              </span>
                                            )}
                                          </span>
                                          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                                            {task.description}
                                          </p>
                                        </span>
                                    </td>
                                    <td className="w-[15%] py-3">
                                      {task.assignees &&
                                        task.assignees.length > 0 && (
                                          <span className="group flex items-center">
                                            <span className="flex -space-x-2">
                                              {task.assignees
                                                .slice(0, 3)
                                                .map((assignee) => (
                                                  <Image
                                                    key={assignee.id}
                                                    width={32}
                                                    height={32}
                                                    src={assignee.avatar}
                                                    alt={assignee.name}
                                                    className="h-8 w-8 rounded-full border-2 border-white shadow-sm ring-2 ring-transparent transition-all hover:z-10 hover:ring-indigo-200"
                                                    title={assignee.name}
                                                  />
                                                ))}
                                            </span>
                                            {task.assignees.length > 3 && (
                                              <span className="ml-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                +{task.assignees.length - 3}
                                              </span>
                                            )}
                                          </span>
                                        )}
                                    </td>
                                    <td className="w-[12%] py-3 text-sm text-gray-500">
                                      <span className="flex items-center">
                                        <Clock className="mr-1 h-4 w-4 text-gray-400" />
                                        {new Date(
                                          task.startDate
                                        ).toLocaleDateString("tr-TR")}
                                      </span>
                                    </td>
                                    <td className="w-[10%] py-3">
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
                                    </td>
                                    <td className="w-[12%] py-3 text-sm text-gray-500">
                                      <span className="flex items-center">
                                        <CalendarDays className="mr-1 h-4 w-4 text-gray-400" />
                                        {new Date(
                                          task.dueDate
                                        ).toLocaleDateString("tr-TR")}
                                      </span>
                                    </td>
                                    <td className="w-[11%] py-3">
                                      <span className="flex items-center space-x-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleOpenModal(task)}
                                          className="rounded-full transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteTask(task.id)}
                                          className="rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleMoveTask(
                                              task.id,
                                              task.status === "progress"
                                                ? "completed"
                                                : "progress"
                                            )
                                          }
                                          className="rounded-full transition-colors hover:bg-green-50 hover:text-green-600"
                                        >
                                          <CheckCircle2 className="h-4 w-4" />
                                        </Button>
                                      </span>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            )
                          )}
                          <tr style={{ display: "none" }}>
                            <td>{provided.placeholder}</td>
                          </tr>
                        </React.Fragment>
                      )}
                    </Droppable>
                  </tbody>
                </DragDropContext>
              ) : (
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 flex flex-col items-center">
                        <Inbox className="mb-2 h-12 w-12 text-gray-300" />
                        <p>Henüz görev bulunmuyor</p>
                        {!isCompleted && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleOpenModal()}
                            className="mt-3 bg-indigo-600 text-white hover:bg-indigo-700"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Görev Ekle
                          </Button>
                        )}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
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
