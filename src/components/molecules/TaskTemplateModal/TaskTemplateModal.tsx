"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { TaskTemplate } from "@/types/task"
import { Button } from "@/components/atoms/Button/Button"
import { cn } from "@/lib/utils"

interface TaskTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  templates: TaskTemplate[]
  onSelectTemplate: (template: TaskTemplate) => void
}

export const TaskTemplateModal = ({
  isOpen,
  onClose,
  templates,
  onSelectTemplate,
}: TaskTemplateModalProps) => {
  const getCategoryColor = (category: TaskTemplate["category"]) => {
    switch (category) {
      case "development":
        return "bg-blue-100 text-blue-700"
      case "design":
        return "bg-purple-100 text-purple-700"
      case "marketing":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryText = (category: TaskTemplate["category"]) => {
    switch (category) {
      case "development":
        return "Geliştirme"
      case "design":
        return "Tasarım"
      case "marketing":
        return "Pazarlama"
      default:
        return "Diğer"
    }
  }

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-medium">
                    Görev Şablonu Seç
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:shadow-sm"
                      onClick={() => onSelectTemplate(template)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {template.name}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            getCategoryColor(template.category)
                          )}
                        >
                          {getCategoryText(template.category)}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-gray-600">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex -space-x-2">
                            {template.defaultAssignees?.map((user) => (
                              <img
                                key={user.id}
                                src={user.avatar}
                                alt={user.name}
                                className="h-8 w-8 rounded-full border-2 border-white"
                                title={user.name}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {template.defaultDuration} gün
                          </span>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectTemplate(template)
                          }}
                        >
                          Şablonu Kullan
                        </Button>
                      </div>
                      {template.subTaskTemplates &&
                        template.subTaskTemplates.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="mb-2 text-sm font-medium">
                              Alt Görevler
                            </h4>
                            <ul className="space-y-2">
                              {template.subTaskTemplates.map((subTask) => (
                                <li
                                  key={subTask.id}
                                  className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
                                >
                                  <span>{subTask.name}</span>
                                  <span className="text-gray-500">
                                    {subTask.defaultDuration} gün
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
