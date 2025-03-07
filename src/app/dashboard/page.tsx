"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import { ChevronRight, Home, Share2, Settings2, MoreHorizontal, Eye, Trash2, ChevronDown, Menu, Flag } from "lucide-react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  title: string
  description: string
  status: "progress" | "completed"
  subTasks?: Task[]
  assignees: Array<{
    id: string
    name: string
    avatar: string
  }>
  startDate: string
  dueDate: string
  priority: "high" | "medium" | "low"
  expanded?: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Wireframe Admin",
    description: "Design system for admin dashboard",
    status: "progress",
    assignees: [
      { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: "user4", name: "Zeynep Şahin", avatar: "https://i.pravatar.cc/150?img=4" }
    ],
    startDate: "2024-11-14",
    dueDate: "2024-11-24",
    priority: "high",
    expanded: true,
    subTasks: [
      {
        id: "1-1",
        title: "Employee Page",
        description: "Create employee management interface",
        status: "progress",
        assignees: [
          { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
          { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" }
        ],
        startDate: "2024-11-20",
        dueDate: "2024-11-25",
        priority: "medium"
      },
      {
        id: "1-2",
        title: "Detail Employee Page",
        description: "Design detailed employee profile view",
        status: "progress",
        assignees: [
          { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
          { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
          { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" }
        ],
        startDate: "2024-11-22",
        dueDate: "2024-11-28",
        priority: "low"
      },
      {
        id: "1-3",
        title: "Profile Page",
        description: "User profile page design",
        status: "progress",
        assignees: [
          { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
          { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" }
        ],
        startDate: "2024-11-23",
        dueDate: "2024-11-30",
        priority: "medium"
      }
    ]
  },
  {
    id: "2",
    title: "High-Fidelity User",
    description: "Create high-fidelity mockups",
    status: "progress",
    assignees: [
      { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: "user4", name: "Zeynep Şahin", avatar: "https://i.pravatar.cc/150?img=4" }
    ],
    startDate: "2024-11-16",
    dueDate: "2024-11-26",
    priority: "high"
  },
  {
    id: "3",
    title: "Design System",
    description: "Develop comprehensive design system",
    status: "progress",
    assignees: [
      { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" }
    ],
    startDate: "2024-11-20",
    dueDate: "2024-11-28",
    priority: "medium"
  }
]

const completedTasks: Task[] = [
  {
    id: "4",
    title: "Wireframe Admin",
    description: "Initial wireframe designs",
    status: "completed",
    assignees: [
      { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: "user4", name: "Zeynep Şahin", avatar: "https://i.pravatar.cc/150?img=4" }
    ],
    startDate: "2024-11-14",
    dueDate: "2024-11-24",
    priority: "high",
    subTasks: [
      {
        id: "4-1",
        title: "Home Page",
        description: "Homepage layout and design",
        status: "completed",
        assignees: [
          { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
          { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" }
        ],
        startDate: "2024-11-14",
        dueDate: "2024-11-15",
        priority: "high"
      },
      {
        id: "4-2",
        title: "Analytics Page",
        description: "Analytics dashboard design",
        status: "completed",
        assignees: [
          { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
          { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" }
        ],
        startDate: "2024-11-16",
        dueDate: "2024-11-17",
        priority: "medium"
      }
    ]
  },
  {
    id: "5",
    title: "High-Fidelity User",
    description: "User interface high-fidelity designs",
    status: "completed",
    assignees: [
      { id: "user1", name: "Ali Yılmaz", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: "user2", name: "Ayşe Demir", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: "user3", name: "Mehmet Kaya", avatar: "https://i.pravatar.cc/150?img=3" }
    ],
    startDate: "2024-11-16",
    dueDate: "2024-11-28",
    priority: "high"
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "todo")
  const [completedTasksList, setCompletedTasksList] = useState<Task[]>(completedTasks)
  const [expandedTasks, setExpandedTasks] = useState<{ [key: string]: boolean }>({})

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

    if (source.droppableId !== destination.droppableId) {
      movedTask.status = destination.droppableId as "progress" | "completed"
    }

    updatedTasks.splice(destination.index, 0, movedTask)
    setTasks(updatedTasks)
  }

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const handleDeleteTask = (taskId: string) => {
    setCompletedTasksList((prev) => prev.filter((task) => task.id !== taskId))
  }

  if (!user) return null

  const renderTaskSection = (title: string, tasks: Task[], count: number, isCompleted: boolean = false) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "h-2.5 w-2.5 rounded-full",
            isCompleted ? "bg-green-500" : "bg-blue-500"
          )} />
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">{count} Task</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
            + Add task
          </button>
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm font-medium text-gray-500">
              <th className="pb-4 pl-4">Name Task</th>
              <th className="pb-4">Assigne To</th>
              <th className="pb-4">Start Date</th>
              <th className="pb-4">Priority</th>
              <th className="pb-4">Due Date</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <>
                <tr key={task.id} className="group">
                  <td className="py-4 pl-4">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => toggleTaskExpansion(task.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedTasks[task.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <Menu className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{task.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex -space-x-2">
                      {task.assignees.map((user) => (
                        <div
                          key={user.id}
                          className="group/avatar relative h-8 w-8"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full rounded-full border-2 border-white object-cover"
                          />
                          <div className="absolute left-1/2 top-full z-50 mt-1 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover/avatar:block">
                            {user.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {new Date(task.startDate).toLocaleDateString('tr-TR', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium",
                        task.priority === "high"
                          ? "bg-red-50 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700"
                      )}
                    >
                      <Flag className="h-3.5 w-3.5" />
                      {task.priority === "high"
                        ? "High Priority"
                        : task.priority === "medium"
                        ? "Mid Priority"
                        : "Low Priority"}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {new Date(task.dueDate).toLocaleDateString('tr-TR', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-full p-2 text-red-400 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {task.subTasks && expandedTasks[task.id] && task.subTasks.map((subTask) => (
                  <tr key={subTask.id} className="border-t border-gray-50 bg-gray-50/50">
                    <td className="py-4 pl-12">
                      <div className="flex items-center space-x-3">
                        <Menu className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{subTask.title}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex -space-x-2">
                        {subTask.assignees.map((user) => (
                          <div
                            key={user.id}
                            className="group/avatar relative h-8 w-8"
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-full w-full rounded-full border-2 border-white object-cover"
                            />
                            <div className="absolute left-1/2 top-full z-50 mt-1 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover/avatar:block">
                              {user.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(subTask.startDate).toLocaleDateString('tr-TR', { 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium",
                          subTask.priority === "high"
                            ? "bg-red-50 text-red-700"
                            : subTask.priority === "medium"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                        )}
                      >
                        <Flag className="h-3.5 w-3.5" />
                        {subTask.priority === "high"
                          ? "High Priority"
                          : subTask.priority === "medium"
                          ? "Mid Priority"
                          : "Low Priority"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(subTask.dueDate).toLocaleDateString('tr-TR', { 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-1">
                        <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-red-400 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 pl-60">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Web App HR</h1>
              <div className="mt-1 flex items-center space-x-1 text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-gray-900">
                  Project
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>Web App HR</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((user) => (
                  <div
                    key={user}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
              </div>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                + Invite People
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-4">
              {["todo", "board", "calendar"].map((tab) => (
                <Link
                  key={tab}
                  href={`/dashboard?tab=${tab}`}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium",
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-500 hover:bg-white hover:text-gray-900"
                  )}
                >
                  {tab === "todo"
                    ? "To Do List"
                    : tab === "board"
                    ? "Board"
                    : "Calendar"}
                </Link>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-8">
            {activeTab === "todo" ? (
              <>
                {renderTaskSection("Progress", initialTasks, 16)}
                {renderTaskSection("Completed", completedTasksList, completedTasksList.length, true)}
              </>
            ) : activeTab === "board" ? (
              <div>Board View</div>
            ) : (
              <div>Calendar View</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
