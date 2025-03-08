import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Task, TaskPriority, TaskStatus, TaskUser } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"

const taskSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  description: z.string().min(1, "Açıklama zorunludur"),
  priority: z.enum(["high", "medium", "low"] as const),
  startDate: z.string(),
  dueDate: z.string(),
  assignees: z.array(z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string()
  }))
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  task?: Task
  users: TaskUser[]
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
}

export const TaskForm = ({ task, users, onSubmit, onCancel }: TaskFormProps) => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ? {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      dueDate: task.dueDate,
      assignees: task.assignees
    } : {
      title: "",
      description: "",
      priority: "medium" as TaskPriority,
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      assignees: []
    }
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Başlık
        </label>
        <input
          {...form.register("title")}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {form.formState.errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Açıklama
        </label>
        <textarea
          {...form.register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Öncelik
        </label>
        <select
          {...form.register("priority")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="high">Yüksek</option>
          <option value="medium">Orta</option>
          <option value="low">Düşük</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Başlangıç Tarihi
          </label>
          <input
            {...form.register("startDate")}
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Bitiş Tarihi
          </label>
          <input
            {...form.register("dueDate")}
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Atanan Kişiler
        </label>
        <div className="mt-2 space-y-2">
          {users.map((user) => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={user.id}
                checked={form.getValues("assignees").some(a => a.id === user.id)}
                onChange={(e) => {
                  const assignees = form.getValues("assignees")
                  if (e.target.checked) {
                    form.setValue("assignees", [...assignees, user])
                  } else {
                    form.setValue(
                      "assignees",
                      assignees.filter((a) => a.id !== user.id)
                    )
                  }
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{user.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" variant="primary">
          {task ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  )
} 