"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Check, AlertCircle } from "lucide-react"
import { TaskUser, Task, TaskPriority } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"
import Image from "next/image"
// Zod şeması ile form validasyonu
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(100, "Başlık en fazla 100 karakter olmalıdır"),
  description: z
    .string()
    .min(5, "Açıklama en az 5 karakter olmalıdır")
    .max(500, "Açıklama en fazla 500 karakter olmalıdır"),
  startDate: z.string().refine((date) => {
    return !isNaN(new Date(date).getTime())
  }, "Geçerli bir başlangıç tarihi giriniz"),
  dueDate: z.string().refine((date) => {
    return !isNaN(new Date(date).getTime())
  }, "Geçerli bir bitiş tarihi giriniz"),
  priority: z.enum(["high", "medium", "low"]),
  assignees: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
      })
    )
    .min(1, "En az bir kişi atanmalıdır"),
  category: z.enum(["development", "design", "marketing"]).optional(),
})

// Form değerleri tipi
export type TaskFormValues = z.infer<typeof taskSchema>

interface TaskFormProps {
  task?: Task
  users: TaskUser[]
  onSubmit: (data: TaskFormValues) => void
  onCancel: () => void
}

export const TaskForm = ({
  task,
  users,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Zod resolver ile form konfigürasyonu
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting },
    reset,
    watch,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          startDate: task.startDate,
          dueDate: task.dueDate,
          priority: task.priority,
          assignees: task.assignees,
          category: task.category,
        }
      : {
          title: "",
          description: "",
          startDate: new Date().toISOString().split("T")[0],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          priority: "medium" as TaskPriority,
          assignees: [],
          category: "development",
        },
  })

  // Form açıldığında veya task değiştiğinde formu sıfırla
  useEffect(() => {
    console.log("TaskForm useEffect tetiklendi, form sıfırlanıyor...");
    if (task) {
      console.log("Düzenleme modu: form verilerle dolduruluyor", task);
      reset({
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        dueDate: task.dueDate,
        priority: task.priority,
        assignees: task.assignees || [],
        category: task.category || "development",
      });
    } else {
      console.log("Yeni görev modu: form sıfırlanıyor");
      reset({
        title: "",
        description: "",
        startDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        priority: "medium" as TaskPriority,
        assignees: [],
        category: "development",
      });
    }
    setErrors({});
  }, [task, reset]);

  // Form gönderme işlemi
  const handleFormSubmit = async (data: TaskFormValues) => {
    try {
      console.log("Form gönderiliyor:", data); // Debug için

      // Tarihleri kontrol et
      const startDate = new Date(data.startDate)
      const dueDate = new Date(data.dueDate)

      if (dueDate < startDate) {
        setErrors({ dueDate: "Bitiş tarihi başlangıç tarihinden önce olamaz" })
        return
      }
      
      // Assign ettiğimiz kullanıcıları tekrar kontrol et
      if (!data.assignees || data.assignees.length === 0) {
        setErrors({ assignees: "En az bir kişi atanmalıdır" })
        return
      }

      // Submit işlemi
      console.log("Form onSubmit çağrılıyor", data);
      onSubmit(data)
      
      // Form sıfırlama
      console.log("Form reset ediliyor");
      reset({
        title: "",
        description: "",
        startDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        priority: "medium" as TaskPriority,
        assignees: [],
        category: "development",
      });
      setErrors({});
      
    } catch (error) {
      console.error("Form gönderimi sırasında hata oluştu:", error)
    }
  }

  // Hata mesajlarını göster
  const getErrorMessage = (field: keyof TaskFormValues) => {
    return (formErrors[field]?.message as string) || errors[field]
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Başlık */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Görev Başlığı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            className={cn(
              "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
              formErrors.title &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Görev başlığı giriniz"
          />
          {getErrorMessage("title") && (
            <p className="mt-1 flex items-center text-xs text-red-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              {getErrorMessage("title")}
            </p>
          )}
        </div>

        {/* Açıklama */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Açıklama <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className={cn(
              "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
              formErrors.description &&
                "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Görevin açıklamasını giriniz"
          />
          {getErrorMessage("description") && (
            <p className="mt-1 flex items-center text-xs text-red-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              {getErrorMessage("description")}
            </p>
          )}
        </div>

        {/* Tarihler */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Başlangıç Tarihi */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Başlangıç Tarihi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("startDate")}
                className={cn(
                  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
                  formErrors.startDate &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {getErrorMessage("startDate") && (
              <p className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 h-3 w-3" />
                {getErrorMessage("startDate")}
              </p>
            )}
          </div>

          {/* Bitiş Tarihi */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Bitiş Tarihi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("dueDate")}
                className={cn(
                  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
                  (formErrors.dueDate || errors.dueDate) &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {(getErrorMessage("dueDate") || errors.dueDate) && (
              <p className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 h-3 w-3" />
                {getErrorMessage("dueDate") || errors.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Öncelik */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Öncelik <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                value: "low",
                label: "Düşük",
                color: "bg-green-100 text-green-800 border-green-200",
              },
              {
                value: "medium",
                label: "Orta",
                color: "bg-amber-100 text-amber-800 border-amber-200",
              },
              {
                value: "high",
                label: "Yüksek",
                color: "bg-red-100 text-red-800 border-red-200",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium",
                  watch("priority") === option.value
                    ? `${option.color} border-2`
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={option.value}
                  {...register("priority")}
                />
                {watch("priority") === option.value && (
                  <Check className="mr-1 h-3 w-3" />
                )}
                {option.label}
              </label>
            ))}
          </div>
          {getErrorMessage("priority") && (
            <p className="mt-1 flex items-center text-xs text-red-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              {getErrorMessage("priority")}
            </p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            {...register("category")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="development">Geliştirme</option>
            <option value="design">Tasarım</option>
            <option value="marketing">Pazarlama</option>
          </select>
        </div>

        {/* Atananlar */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Atananlar <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="assignees"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {users.map((user) => {
                    const isChecked = field.value.some((a) => a.id === user.id);
                    console.log(`User ${user.name} checked:`, isChecked); // Debug için
                    return (
                      <label
                        key={user.id}
                        className={cn(
                          "flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 px-3 py-2 text-sm",
                          isChecked
                            ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => {
                            console.log("Checkbox state before change:", field.value); // Debug için
                            if (isChecked) {
                              const newValue = field.value.filter((a) => a.id !== user.id);
                              console.log("Removing user, new value:", newValue); // Debug için
                              field.onChange(newValue);
                            } else {
                              const newValue = [...field.value, user];
                              console.log("Adding user, new value:", newValue); // Debug için
                              field.onChange(newValue);
                            }
                          }}
                        />
                        <Image
                          width={32}
                          height={32}
                          src={user.avatar}
                          alt={user.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <span>{user.name}</span>
                        {isChecked && (
                          <Check className="h-4 w-4 text-indigo-600" />
                        )}
                      </label>
                    );
                  })}
                </div>
                {getErrorMessage("assignees") && (
                  <p className="flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {getErrorMessage("assignees")}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex space-x-3">
        <Button
          type="submit"
          variant="primary"
          className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Kaydediliyor..." : task ? "Güncelle" : "Oluştur"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={onCancel}
        >
          İptal
        </Button>
      </div>
    </form>
  )
}
