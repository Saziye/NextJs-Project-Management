export type TaskStatus = "progress" | "completed"
export type TaskPriority = "high" | "medium" | "low"
export type TaskCategory = "development" | "design" | "marketing"

export interface TaskUser {
  id: string
  name: string
  avatar: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  dueDate: string
  assignees: TaskUser[]
  createdAt: string
  updatedAt: string
  createdBy: TaskUser
  category?: TaskCategory
  templateId?: string
  parentId?: string
  subTasks?: Task[]
}

export interface TaskTemplate {
  id: string
  name: string
  description: string
  category: TaskCategory
  defaultPriority: TaskPriority
  defaultDuration: number
  defaultAssignees?: TaskUser[]
  subTaskTemplates?: {
    id: string
    name: string
    description: string
    defaultPriority: TaskPriority
    defaultDuration: number
    defaultAssignees?: TaskUser[]
  }[]
}
