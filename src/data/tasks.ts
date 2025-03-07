import { Task } from "@/types/task"

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Wireframe Admin",
    description: "Design system for admin dashboard",
    status: "progress",
    assignees: [
      {
        id: "user1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "user2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "user3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "user4",
        name: "Zeynep Şahin",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    ],
    startDate: "2024-11-14",
    dueDate: "2024-11-24",
    priority: "high",
    expanded: true,
    subTasks: [
      {
        id: "1-1",
        title: "Employee Page",
        description: "Create employee management interface",
        status: "progress",
        assignees: [
          {
            id: "user1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "user2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
        startDate: "2024-11-20",
        dueDate: "2024-11-25",
        priority: "medium",
      },
      {
        id: "1-2",
        title: "Detail Employee Page",
        description: "Design detailed employee profile view",
        status: "progress",
        assignees: [
          {
            id: "user1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "user2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: "user3",
            name: "Mehmet Kaya",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
        ],
        startDate: "2024-11-22",
        dueDate: "2024-11-28",
        priority: "low",
      },
      {
        id: "1-3",
        title: "Profile Page",
        description: "User profile page design",
        status: "progress",
        assignees: [
          {
            id: "user1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "user2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
        startDate: "2024-11-23",
        dueDate: "2024-11-30",
        priority: "medium",
      },
    ],
  },
  {
    id: "2",
    title: "High-Fidelity User",
    description: "Create high-fidelity mockups",
    status: "progress",
    assignees: [
      {
        id: "user1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "user2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "user3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "user4",
        name: "Zeynep Şahin",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    ],
    startDate: "2024-11-16",
    dueDate: "2024-11-26",
    priority: "high",
  },
  {
    id: "3",
    title: "Design System",
    description: "Develop comprehensive design system",
    status: "progress",
    assignees: [
      {
        id: "user1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "user2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "user3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ],
    startDate: "2024-11-20",
    dueDate: "2024-11-28",
    priority: "medium",
  },
]

export const completedTasks: Task[] = [
  {
    id: "4",
    title: "Wireframe Admin",
    description: "Initial wireframe designs",
    status: "completed",
    assignees: [
      {
        id: "user1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "user2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "user3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "user4",
        name: "Zeynep Şahin",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    ],
    startDate: "2024-11-14",
    dueDate: "2024-11-24",
    priority: "high",
    subTasks: [
      {
        id: "4-1",
        title: "Home Page",
        description: "Homepage layout and design",
        status: "completed",
        assignees: [
          {
            id: "user1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "user2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
        startDate: "2024-11-14",
        dueDate: "2024-11-15",
        priority: "high",
      },
      {
        id: "4-2",
        title: "Analytics Page",
        description: "Analytics dashboard design",
        status: "completed",
        assignees: [
          {
            id: "user1",
            name: "Ali Yılmaz",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "user2",
            name: "Ayşe Demir",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
        startDate: "2024-11-16",
        dueDate: "2024-11-17",
        priority: "medium",
      },
    ],
  },
  {
    id: "5",
    title: "High-Fidelity User",
    description: "User interface high-fidelity designs",
    status: "completed",
    assignees: [
      {
        id: "user1",
        name: "Ali Yılmaz",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "user2",
        name: "Ayşe Demir",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: "user3",
        name: "Mehmet Kaya",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ],
    startDate: "2024-11-16",
    dueDate: "2024-11-28",
    priority: "high",
  },
]
