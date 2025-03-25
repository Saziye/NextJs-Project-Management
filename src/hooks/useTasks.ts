import { useState, useEffect } from "react"
import { Task } from "@/types/task"

interface UseTasksProps {
  initialTasks: Task[]
  initialCompletedTasks: Task[]
}

const STORAGE_KEYS = {
  TASKS: "tasks",
  COMPLETED_TASKS: "completedTasks",
  EXPANDED_TASKS: "expandedTasks",
}

// Tarayıcı ortamında olup olmadığımızı kontrol eden yardımcı fonksiyon
const isBrowser = typeof window !== "undefined"

// localStorage'a güvenli erişim için yardımcı fonksiyonlar
const getStorageItem = (key: string) => {
  if (!isBrowser) return null
  return localStorage.getItem(key)
}

const setStorageItem = (key: string, value: string) => {
  if (!isBrowser) return
  localStorage.setItem(key, value)
}

const removeStorageItem = (key: string) => {
  if (!isBrowser) return
  localStorage.removeItem(key)
}

export const useTasks = ({
  initialTasks,
  initialCompletedTasks,
}: UseTasksProps) => {
  // localStorage'dan verileri al veya varsayılan değerleri kullan
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = getStorageItem(STORAGE_KEYS.TASKS)
    return savedTasks ? JSON.parse(savedTasks) : initialTasks
  })

  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const savedCompletedTasks = getStorageItem(STORAGE_KEYS.COMPLETED_TASKS)
    return savedCompletedTasks
      ? JSON.parse(savedCompletedTasks)
      : initialCompletedTasks
  })

  const [expandedTasks, setExpandedTasks] = useState<{
    [key: string]: boolean
  }>(() => {
    const savedExpandedTasks = getStorageItem(STORAGE_KEYS.EXPANDED_TASKS)
    return savedExpandedTasks ? JSON.parse(savedExpandedTasks) : {}
  })

  // Değişiklikleri localStorage'a kaydet
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify(completedTasks))
  }, [completedTasks])

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.EXPANDED_TASKS, JSON.stringify(expandedTasks))
  }, [expandedTasks])

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const addTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">
  ) => {
    try {
      const now = new Date().toISOString()
      const taskId = Math.random().toString(36).substr(2, 9);
      const createdBy = {
        id: "1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      }

      // Alt görevleri ana görevin subTasks özelliğine ekle
      const subTasks = taskData.subTasks?.map((subTask) => ({
        ...subTask,
        id: Math.random().toString(36).substr(2, 9),
        status: "progress" as const,
        createdAt: now,
        updatedAt: now,
        createdBy,
      })) as Task[] | undefined

      const newTask: Task = {
        ...taskData,
        id: taskId,
        status: "progress",
        createdAt: now,
        updatedAt: now,
        createdBy,
        subTasks,
      }

      console.log("useTasks addTask: yeni görev oluşturuldu:", newTask);

      // Yeni görevi ekledikten sonra otomatik olarak genişlet
      setExpandedTasks((prev) => {
        const updated = {
          ...prev,
          [newTask.id]: true,
        };
        console.log("Expanded tasks güncellendi:", updated);
        return updated;
      })

      // Görevleri güncelle
      setTasks((prevTasks) => {
        const updated = [...prevTasks, newTask];
        console.log("Görevler güncellendi:", updated);
        return updated;
      })
      
      console.log("Görev eklendi:", newTask); // Debug için
      return newTask;
    } catch (error) {
      console.error("Görev eklenirken hata oluştu:", error);
      throw error;
    }
  }

  const updateTask = (taskId: string, data: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // Alt görevleri kontrol et
        if (task.subTasks?.some((subTask) => subTask.id === taskId)) {
          // Alt görev güncelleniyor
          return {
            ...task,
            subTasks: task.subTasks.map((subTask) =>
              subTask.id === taskId ? { ...subTask, ...data } : subTask
            ),
            updatedAt: new Date().toISOString(),
          }
        }

        // Ana görev güncelleniyor
        if (task.id === taskId) {
          return { ...task, ...data }
        }

        return task
      })
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => {
      return prevTasks
        .map((task) => {
          // Alt görevleri kontrol et
          if (task.subTasks?.some((subTask) => subTask.id === taskId)) {
            // Alt görev siliniyorsa, ana görevin alt görevlerini güncelle
            return {
              ...task,
              subTasks: task.subTasks.filter(
                (subTask) => subTask.id !== taskId
              ),
              updatedAt: new Date().toISOString(),
            }
          }

          // Ana görev siliniyorsa
          if (task.id === taskId) {
            return null
          }

          return task
        })
        .filter((task): task is Task => task !== null)
    })
  }

  const moveTaskToCompleted = (taskId: string) => {
    const taskToMove = tasks.find((task) => task.id === taskId)
    if (taskToMove) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      setCompletedTasks((prevCompleted) => [
        ...prevCompleted,
        { ...taskToMove, status: "completed" },
      ])
    }
  }

  const deleteCompletedTask = (taskId: string) => {
    setCompletedTasks((prevCompleted) =>
      prevCompleted.filter((task) => task.id !== taskId)
    )
  }

  const clearStorage = () => {
    removeStorageItem(STORAGE_KEYS.TASKS)
    removeStorageItem(STORAGE_KEYS.COMPLETED_TASKS)
    removeStorageItem(STORAGE_KEYS.EXPANDED_TASKS)
    setTasks(initialTasks)
    setCompletedTasks(initialCompletedTasks)
    setExpandedTasks({})
  }

  return {
    tasks,
    completedTasks,
    expandedTasks,
    toggleTaskExpansion,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToCompleted,
    deleteCompletedTask,
    clearStorage,
  }
}
