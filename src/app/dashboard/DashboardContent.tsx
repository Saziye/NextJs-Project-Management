"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ChevronRight,
  Users,
  Calendar,
  LayoutDashboard,
  Trello,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"

import { TaskList } from "@/components/organisms/TaskList/TaskList"
import { AvatarGroup } from "@/components/molecules/AvatarGroup/AvatarGroup"
import { Button } from "@/components/atoms/Button/Button"
import { useTasks } from "@/hooks/useTasks"
import { Task } from "@/types/task"

interface DashboardContentProps {
  initialTasks: Task[]
  initialCompletedTasks: Task[]
}

export default function DashboardContent({ initialTasks, initialCompletedTasks }: DashboardContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams?.get("tab") || "todo"
  const [refreshKey, setRefreshKey] = useState(0); // Yenileme tetikleyici

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
    initialCompletedTasks,
  })

  // Debug için görevleri konsola yaz
  useEffect(() => {
    console.log("Mevcut görevler:", tasks);
    console.log("Tamamlanan görevler:", completedTasksList);
  }, [tasks, completedTasksList]);

  // Görev ekleme işlemi debug wrapper'ı
  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">) => {
    console.log("DashboardContent - Görev eklenecek:", taskData);
    
    try {
      // Görevi ekle
      addTask(taskData);
      
      // Yenileme tetikle
      setRefreshKey(prev => prev + 1);
      
      // Başarılı bir şekilde eklendiğini bildir
      toast.success("Görev başarıyla eklendi!");
    } catch (error) {
      console.error("Görev eklenirken hata oluştu:", error);
      toast.error("Görev eklenirken bir hata oluştu!");
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      if (!userStr) {
        router.push("/auth/login")
      }
    }
  }, [router])

  return (
    <div className="p-6">
      {/* Proje Başlığı ve Bilgileri */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <span className="rounded-md bg-indigo-100 p-1.5 text-indigo-600">
              <Trello className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-semibold text-gray-800">
              Web App HR
            </h1>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Aktif
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-indigo-600">
              Projeler
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>Web App HR</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5">
            <span className="mr-2 text-sm font-medium text-gray-500">
              Başlangıç:
            </span>
            <span className="text-sm font-medium text-gray-800">
              01.03.2023
            </span>
          </div>
          <div className="flex items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5">
            <span className="mr-2 text-sm font-medium text-gray-500">
              Bitiş:
            </span>
            <span className="text-sm font-medium text-gray-800">
              01.09.2023
            </span>
          </div>
          <AvatarGroup
            users={[
              {
                id: "1",
                name: "Ali Yılmaz",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              {
                id: "2",
                name: "Ayşe Demir",
                avatar: "https://i.pravatar.cc/150?img=2",
              },
              {
                id: "3",
                name: "Mehmet Can",
                avatar: "https://i.pravatar.cc/150?img=3",
              },
            ]}
          />
          <Button
            variant="primary"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Users className="mr-1.5 h-4 w-4" />
            Üye Ekle
          </Button>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {[
            { id: "todo", label: "Görevler", icon: LayoutDashboard },
            { id: "board", label: "Pano", icon: Trello },
            { id: "calendar", label: "Takvim", icon: Calendar },
          ].map((tab) => (
            <Link
              key={tab.id}
              href={`/dashboard?tab=${tab.id}`}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* İçerik */}
      <div className="space-y-6">
        {activeTab === "todo" ? (
          <div className="grid grid-cols-1 gap-6">
            <TaskList
              title="İlerleme"
              tasks={tasks}
              count={tasks.length}
              expandedTasks={expandedTasks}
              onToggleExpand={toggleTaskExpansion}
              onCreateTask={handleAddTask}
              onUpdateTask={updateTask}
              onMoveTask={moveTaskToCompleted}
              onDeleteTask={deleteTask}
            />
            <TaskList
              title="Tamamlanan"
              tasks={completedTasksList}
              count={completedTasksList.length}
              isCompleted
              expandedTasks={expandedTasks}
              onToggleExpand={toggleTaskExpansion}
              onDeleteTask={deleteCompletedTask}
            />
          </div>
        ) : activeTab === "board" ? (
          <div className="min-h-[400px] rounded-xl bg-white p-6 shadow-sm">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Trello className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-800">
                  Pano Görünümü
                </h3>
                <p className="mt-1 text-gray-500">
                  Bu özellik yakında eklenecek
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[400px] rounded-xl bg-white p-6 shadow-sm">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-800">
                  Takvim Görünümü
                </h3>
                <p className="mt-1 text-gray-500">
                  Bu özellik yakında eklenecek
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 