import { useState } from "react"
import { Task } from "@/types/task"

interface UseTasksProps {
  initialTasks: Task[]
  initialCompletedTasks: Task[]
}

export const useTasks = ({
  initialTasks,
  initialCompletedTasks,
}: UseTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [completedTasks, setCompletedTasks] = useState<Task[]>(
    initialCompletedTasks
  )
  const [expandedTasks, setExpandedTasks] = useState<{
    [key: string]: boolean
  }>({})

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const moveTaskToCompleted = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
      setCompletedTasks((prev) => [...prev, { ...task, status: "completed" }])
    }
  }

  const deleteCompletedTask = (taskId: string) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== taskId))
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
  }
}
