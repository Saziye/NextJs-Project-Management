export interface Task {
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
