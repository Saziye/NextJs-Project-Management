"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

import Sidebar from "@/components/layout/Sidebar"
import { TaskList } from "@/components/organisms/TaskList/TaskList"
import { AvatarGroup } from "@/components/molecules/AvatarGroup/AvatarGroup"
import { Button } from "@/components/atoms/Button/Button"
import { useTasks } from "@/hooks/useTasks"
import { Task } from "@/types/task"

const initialTasks: Task[] = []
const completedTasks: Task[] = []

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "todo"

  const {
    tasks,
    completedTasks: completedTasksList,
    expandedTasks,
    toggleTaskExpansion,
    addTask,
    updateTask,
    moveTaskToCompleted,
    deleteCompletedTask,
    deleteTask,
  } = useTasks({
    initialTasks,
    initialCompletedTasks: completedTasks,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      if (!userStr) {
        router.push("/auth/login")
      }
    }
  }, [router])

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
              <AvatarGroup
                users={[
                  {
                    id: "1",
                    name: "User 1",
                    avatar: "https://i.pravatar.cc/150?img=1",
                  },
                  {
                    id: "2",
                    name: "User 2",
                    avatar: "https://i.pravatar.cc/150?img=2",
                  },
                  {
                    id: "3",
                    name: "User 3",
                    avatar: "https://i.pravatar.cc/150?img=3",
                  },
                ]}
              />
              <Button variant="primary">+ Invite People</Button>
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
              <div className="grid grid-cols-1 gap-6">
                <TaskList
                  title="Progress"
                  tasks={tasks}
                  count={tasks.length}
                  expandedTasks={expandedTasks}
                  onToggleExpand={toggleTaskExpansion}
                  onCreateTask={addTask}
                  onUpdateTask={updateTask}
                  onMoveTask={moveTaskToCompleted}
                  onDeleteTask={deleteTask}
                />
                <TaskList
                  title="Completed"
                  tasks={completedTasksList}
                  count={completedTasksList.length}
                  isCompleted
                  expandedTasks={expandedTasks}
                  onToggleExpand={toggleTaskExpansion}
                  onDeleteTask={deleteCompletedTask}
                />
              </div>
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
