"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Login sayfası tasarımı",
    description: "Kullanıcı girişi için modern bir arayüz tasarlanacak",
    status: "todo",
  },
  {
    id: "2",
    title: "API entegrasyonu",
    description: "Backend servisleri ile bağlantı kurulacak",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Test yazımı",
    description: "Birim testleri ve entegrasyon testleri yazılacak",
    status: "done",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "todo")

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(userStr))
  }, [router])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const updatedTasks = Array.from(tasks)
    const [movedTask] = updatedTasks.splice(source.index, 1)

    // Status değişikliği
    if (source.droppableId !== destination.droppableId) {
      movedTask.status = destination.droppableId as "todo" | "in-progress" | "done"
    }

    // Yeni pozisyon
    updatedTasks.splice(destination.index, 0, movedTask)
    setTasks(updatedTasks)
  }

  if (!user) return null

  const renderTodoList = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-6">
        {["todo", "in-progress", "done"].map((status) => (
          <div key={status} className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 text-lg font-medium capitalize">
              {status === "todo"
                ? "Yapılacaklar"
                : status === "in-progress"
                ? "Devam Edenler"
                : "Tamamlananlar"}
            </h3>
            <Droppable droppableId={status}>
              {(provided: DroppableProvided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided: DraggableProvided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="rounded-md bg-white p-4 shadow"
                          >
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">
                              {task.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )

  const renderBoard = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {["todo", "in-progress", "done"].map((status) => (
        <div key={status} className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-4 text-lg font-medium capitalize">
            {status === "todo"
              ? "Yapılacaklar"
              : status === "in-progress"
              ? "Devam Edenler"
              : "Tamamlananlar"}
          </h3>
          <div className="space-y-2">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  className="rounded-md bg-white p-4 shadow"
                >
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderCalendar = () => (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 grid grid-cols-7 gap-2">
        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded border p-2 text-center hover:bg-gray-50"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-60">
        <div className="p-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/dashboard" className="flex items-center hover:text-gray-900">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="capitalize">{activeTab}</span>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <nav className="-mb-px flex space-x-8">
              {["todo", "board", "calendar"].map((tab) => (
                <Link
                  key={tab}
                  href={`/dashboard?tab=${tab}`}
                  className={cn(
                    "border-b-2 px-1 pb-4 text-sm font-medium",
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {tab === "todo"
                    ? "Todo List"
                    : tab === "board"
                    ? "Board"
                    : "Takvim"}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "todo" && renderTodoList()}
            {activeTab === "board" && renderBoard()}
            {activeTab === "calendar" && renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  )
}
