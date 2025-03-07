import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/atoms/Button/Button"
import { TaskCard } from "@/components/molecules/TaskCard/TaskCard"
import { Task } from "@/types/task"
import { cn } from "@/lib/utils"

interface TaskListProps {
  title: string
  tasks: Task[]
  count: number
  isCompleted?: boolean
  expandedTasks: { [key: string]: boolean }
  onToggleExpand: (taskId: string) => void
  onDeleteTask?: (taskId: string) => void
  className?: string
}

export const TaskList = ({
  title,
  tasks,
  count,
  isCompleted = false,
  expandedTasks,
  onToggleExpand,
  onDeleteTask,
  className,
}: TaskListProps) => {
  return (
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
          <Button variant="secondary">+ Add task</Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
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
                <tr key={task.id}>
                  <td colSpan={6}>
                    <TaskCard
                      task={task}
                      isExpanded={expandedTasks[task.id]}
                      onToggleExpand={onToggleExpand}
                      onDelete={onDeleteTask}
                    />
                  </td>
                </tr>
                {task.subTasks &&
                  expandedTasks[task.id] &&
                  task.subTasks.map((subTask) => (
                    <tr key={subTask.id} className="bg-gray-50/50">
                      <td colSpan={6}>
                        <TaskCard
                          task={subTask}
                          isExpanded={false}
                          onToggleExpand={() => {}}
                          className="pl-8"
                        />
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
}
