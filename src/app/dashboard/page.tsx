'use client';

import { Suspense } from "react"
import Layout from "@/components/layout/Layout"
import DashboardContent from "./DashboardContent"
import { Task } from "@/types/task"

const initialTasks: Task[] = []
const completedTasks: Task[] = []

// Ana sayfa bileşeni - Server Component olarak çalışacak
export default function DashboardPage() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-6">Yükleniyor...</div>}>
        <DashboardContent 
          initialTasks={initialTasks} 
          initialCompletedTasks={completedTasks} 
        />
      </Suspense>
    </Layout>
  )
}
