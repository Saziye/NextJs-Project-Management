"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { X } from "lucide-react"
import { TaskForm } from "@/components/molecules/TaskForm/TaskForm"
import { Task, TaskUser } from "@/types/task"
import type { TaskFormValues } from "@/components/molecules/TaskForm/TaskForm"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task
  users: TaskUser[]
  onSubmit: (data: TaskFormValues) => void
}

export const TaskModal = ({
  isOpen,
  onClose,
  task,
  users,
  onSubmit,
}: TaskModalProps) => {
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    // Modal açıldığında formu sıfırla
    if (isOpen) {
      console.log("TaskModal açıldı, form sıfırlanacak", { task });
      // Form bileşenini yeniden oluşturmak için key değerini değiştir
      setFormKey(prev => prev + 1);
    }
  }, [isOpen, task]);

  // Form gönderildiğinde
  const handleSubmit = (data: TaskFormValues) => {
    console.log("TaskModal - form gönderildi:", data);
    onSubmit(data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mb-5 flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {task ? "Görevi Düzenle" : "Yeni Görev Oluştur"}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <TaskForm
                  key={formKey}
                  task={task}
                  users={users}
                  onSubmit={handleSubmit}
                  onCancel={onClose}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
