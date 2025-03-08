"use client"

import { Fragment, useState, useEffect, forwardRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X, Trash2 } from "lucide-react"
import { Task, TaskUser } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import DatePicker, { registerLocale } from "react-datepicker"
import { tr } from "date-fns/locale"
import "react-datepicker/dist/react-datepicker.css"

const taskSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  description: z.string().min(1, "Açıklama zorunludur"),
  priority: z.enum(["high", "medium", "low"] as const),
  startDate: z.string(),
  dueDate: z.string().refine((date) => {
    return new Date(date) >= new Date(new Date().toISOString().split("T")[0])
  }, "Bitiş tarihi bugünden önce olamaz"),
  assignees: z.array(z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string()
  })).min(1, "En az bir kişi atanmalıdır"),
  subTasks: z.array(z.object({
    title: z.string().min(1, "Alt görev başlığı zorunludur"),
    description: z.string().min(1, "Alt görev açıklaması zorunludur"),
    priority: z.enum(["high", "medium", "low"] as const),
    startDate: z.string(),
    dueDate: z.string().refine((date) => {
      return new Date(date) >= new Date(new Date().toISOString().split("T")[0])
    }, "Bitiş tarihi bugünden önce olamaz"),
    assignees: z.array(z.object({
      id: z.string(),
      name: z.string(),
      avatar: z.string()
    })).min(1, "En az bir kişi atanmalıdır")
  })).optional()
})

type TaskFormData = z.infer<typeof taskSchema> & {
  id?: string
}

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task
  users: TaskUser[]
  onSubmit: (data: TaskFormData) => void
}

registerLocale("tr", tr)

const CustomInput = forwardRef(({ value, onClick, className }: any, ref: any) => (
  <button
    type="button"
    className={`${className} w-full rounded-md border border-gray-300 px-3 py-2 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
))

export const TaskModal = ({
  isOpen,
  onClose,
  task,
  users,
  onSubmit
}: TaskModalProps) => {
  const [subTasks, setSubTasks] = useState<any[]>(task?.subTasks || [])

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task ? {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      dueDate: task.dueDate,
      assignees: task.assignees,
      subTasks: task.subTasks || []
    } : {
      title: "",
      description: "",
      priority: "medium",
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      assignees: [],
      subTasks: []
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (task) {
        form.reset({
          title: task.title,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          dueDate: task.dueDate,
          assignees: task.assignees,
          subTasks: task.subTasks || []
        })
        setSubTasks(task.subTasks || [])
      } else {
        form.reset({
          title: "",
          description: "",
          priority: "medium",
          startDate: new Date().toISOString().split("T")[0],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          assignees: [],
          subTasks: []
        })
        setSubTasks([])
      }
    }
  }, [isOpen, task, form])

  const handleClose = () => {
    form.reset()
    setSubTasks([])
    onClose()
  }

  const handleSubmit = (data: TaskFormData) => {
    if (task) {
      // Eğer mevcut bir görevi düzenliyorsak, id'yi ekleyelim
      onSubmit({ ...data, id: task.id })
    } else {
      onSubmit(data)
    }
    handleClose()
  }

  const addSubTask = () => {
    const newSubTask = {
      title: "",
      description: "",
      priority: "medium" as const,
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      assignees: []
    }
    setSubTasks([...subTasks, newSubTask])
    const currentSubTasks = form.getValues("subTasks") || []
    form.setValue("subTasks", [...currentSubTasks, newSubTask])
  }

  const removeSubTask = (index: number) => {
    const newSubTasks = subTasks.filter((_, i) => i !== index)
    setSubTasks(newSubTasks)
    form.setValue("subTasks", newSubTasks)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-medium">
                    {task ? "Görevi Düzenle" : "Yeni Görev"}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 space-y-4">
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
                      <DatePicker
                        selected={form.watch("startDate") ? new Date(form.watch("startDate")) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            form.setValue("startDate", date.toISOString().split("T")[0], { shouldValidate: true })
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        locale="tr"
                        customInput={<CustomInput />}
                        minDate={new Date()}
                        placeholderText="Başlangıç tarihi seçin"
                        showPopperArrow={false}
                        className="mt-1 block w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Bitiş Tarihi
                      </label>
                      <DatePicker
                        selected={form.watch("dueDate") ? new Date(form.watch("dueDate")) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            form.setValue("dueDate", date.toISOString().split("T")[0], { shouldValidate: true })
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        locale="tr"
                        customInput={<CustomInput />}
                        minDate={new Date(form.watch("startDate") || new Date())}
                        placeholderText="Bitiş tarihi seçin"
                        showPopperArrow={false}
                        className="mt-1 block w-full"
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
                            checked={form.watch("assignees", []).some(a => a.id === user.id)}
                            onChange={(e) => {
                              const assignees = form.watch("assignees") || []
                              if (e.target.checked) {
                                form.setValue("assignees", [...assignees, user], { shouldValidate: true })
                              } else {
                                form.setValue(
                                  "assignees",
                                  assignees.filter((a) => a.id !== user.id),
                                  { shouldValidate: true }
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

                  {/* Alt Görevler Bölümü */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Alt Görevler
                      </label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addSubTask}
                      >
                        + Alt Görev Ekle
                      </Button>
                    </div>

                    {subTasks.map((_, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Alt Görev #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubTask(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Başlık
                            </label>
                            <input
                              {...form.register(`subTasks.${index}.title`)}
                              type="text"
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            />
                            {form.formState.errors.subTasks?.[index]?.title && (
                              <p className="mt-1 text-sm text-red-600">
                                {form.formState.errors.subTasks[index]?.title?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Açıklama
                            </label>
                            <textarea
                              {...form.register(`subTasks.${index}.description`)}
                              rows={2}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            />
                            {form.formState.errors.subTasks?.[index]?.description && (
                              <p className="mt-1 text-sm text-red-600">
                                {form.formState.errors.subTasks[index]?.description?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Öncelik
                            </label>
                            <select
                              {...form.register(`subTasks.${index}.priority`)}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            >
                              <option value="high">Yüksek</option>
                              <option value="medium">Orta</option>
                              <option value="low">Düşük</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Başlangıç Tarihi
                              </label>
                              <DatePicker
                                selected={form.watch(`subTasks.${index}.startDate`) ? new Date(form.watch(`subTasks.${index}.startDate`)) : null}
                                onChange={(date: Date | null) => {
                                  if (date) {
                                    form.setValue(`subTasks.${index}.startDate`, date.toISOString().split("T")[0], { shouldValidate: true })
                                  }
                                }}
                                dateFormat="dd/MM/yyyy"
                                locale="tr"
                                customInput={<CustomInput />}
                                minDate={new Date()}
                                placeholderText="Başlangıç tarihi seçin"
                                showPopperArrow={false}
                                className="mt-1 block w-full"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Bitiş Tarihi
                              </label>
                              <DatePicker
                                selected={form.watch(`subTasks.${index}.dueDate`) ? new Date(form.watch(`subTasks.${index}.dueDate`)) : null}
                                onChange={(date: Date | null) => {
                                  if (date) {
                                    form.setValue(`subTasks.${index}.dueDate`, date.toISOString().split("T")[0], { shouldValidate: true })
                                  }
                                }}
                                dateFormat="dd/MM/yyyy"
                                locale="tr"
                                customInput={<CustomInput />}
                                minDate={new Date(form.watch(`subTasks.${index}.startDate`) || new Date())}
                                placeholderText="Bitiş tarihi seçin"
                                showPopperArrow={false}
                                className="mt-1 block w-full"
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
                                    checked={form.watch(`subTasks.${index}.assignees`, []).some(a => a.id === user.id)}
                                    onChange={(e) => {
                                      const assignees = form.watch(`subTasks.${index}.assignees`) || []
                                      if (e.target.checked) {
                                        form.setValue(`subTasks.${index}.assignees`, [...assignees, user], { shouldValidate: true })
                                      } else {
                                        form.setValue(
                                          `subTasks.${index}.assignees`,
                                          assignees.filter((a) => a.id !== user.id),
                                          { shouldValidate: true }
                                        )
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{user.name}</span>
                                </label>
                              ))}
                            </div>
                            {form.formState.errors.subTasks?.[index]?.assignees && (
                              <p className="mt-1 text-sm text-red-600">
                                {form.formState.errors.subTasks[index]?.assignees?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>
                      İptal
                    </Button>
                    <Button type="submit" variant="primary">
                      {task ? "Güncelle" : "Oluştur"}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 