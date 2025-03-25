import { TaskTemplate } from "@/types/task"

export const taskTemplates: TaskTemplate[] = [
  {
    id: "1",
    name: "Web Sitesi Geliştirme",
    description: "Yeni bir web sitesi geliştirme projesi için temel görevler",
    category: "development",
    defaultPriority: "high",
    defaultDuration: 14,
    defaultAssignees: [
      {
        id: "1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    ],
    subTaskTemplates: [
      {
        id: "1-1",
        name: "Tasarım Dönüştürme",
        description: "Figma tasarımını HTML/CSS'e dönüştürme",
        defaultPriority: "high",
        defaultDuration: 5,
        defaultAssignees: [
          {
            id: "2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
      {
        id: "1-2",
        name: "Backend Entegrasyonu",
        description: "API entegrasyonu ve veri yönetimi",
        defaultPriority: "medium",
        defaultDuration: 7,
        defaultAssignees: [
          {
            id: "1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "UI/UX Tasarım",
    description: "Kullanıcı arayüzü ve deneyimi tasarım süreci",
    category: "design",
    defaultPriority: "medium",
    defaultDuration: 10,
    defaultAssignees: [
      {
        id: "2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    ],
    subTaskTemplates: [
      {
        id: "2-1",
        name: "Wireframe Hazırlama",
        description: "Temel sayfa yapılarının wireframe'lerini oluşturma",
        defaultPriority: "high",
        defaultDuration: 3,
        defaultAssignees: [
          {
            id: "2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
      {
        id: "2-2",
        name: "UI Kit Oluşturma",
        description: "Tutarlı bir tasarım sistemi için UI kit hazırlama",
        defaultPriority: "medium",
        defaultDuration: 4,
        defaultAssignees: [
          {
            id: "2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Sosyal Medya Kampanyası",
    description: "Sosyal medya platformları için içerik ve reklam kampanyası",
    category: "marketing",
    defaultPriority: "medium",
    defaultDuration: 7,
    defaultAssignees: [
      {
        id: "3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ],
    subTaskTemplates: [
      {
        id: "3-1",
        name: "İçerik Planı",
        description: "Haftalık içerik planı ve takvimi oluşturma",
        defaultPriority: "high",
        defaultDuration: 2,
        defaultAssignees: [
          {
            id: "3",
            name: "Mehmet Kaya",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
        ],
      },
      {
        id: "3-2",
        name: "Görsel Tasarımlar",
        description: "Sosyal medya görselleri ve banner tasarımları",
        defaultPriority: "medium",
        defaultDuration: 3,
        defaultAssignees: [
          {
            id: "2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
    ],
  },
]
