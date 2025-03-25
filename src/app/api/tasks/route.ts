import { NextRequest, NextResponse } from "next/server"
import { initialTasks, completedTasks } from "@/data/tasks"
import { Task } from "@/types/task"

// Global namespace tanımlaması
declare global {
  var tasks: {
    progress: Task[]
    completed: Task[]
  }
}

// Bellek içinde görevleri saklamak için (gerçek uygulamada bir veritabanı kullanılır)
if (!global.tasks) {
  global.tasks = {
    progress: [...initialTasks],
    completed: [...completedTasks],
  }
}

// Tüm görevleri veya filtrelenmiş görevleri getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    if (status) {
      if (status !== "progress" && status !== "completed") {
        return NextResponse.json(
          { error: "Geçersiz durum. 'progress' veya 'completed' olmalıdır." },
          { status: 400 }
        )
      }

      return NextResponse.json(global.tasks[status])
    }

    // Status belirtilmediyse tüm görevleri döndür
    return NextResponse.json([
      ...global.tasks.progress,
      ...global.tasks.completed,
    ])
  } catch (error) {
    console.error("Görevler getirilirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görevler getirilirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Yeni görev oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Gerekli alanların kontrolü
    if (!body.title || !body.description || !body.priority || !body.status) {
      return NextResponse.json(
        {
          error: "Eksik bilgi. Başlık, açıklama, öncelik ve durum gereklidir.",
        },
        { status: 400 }
      )
    }

    // Yeni görev için benzersiz ID oluştur
    const id = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Yaratıcı kullanıcı bilgisi
    const createdBy = {
      id: "user1",
      name: "Ali Yılmaz",
      avatar: "https://i.pravatar.cc/150?img=1",
    }

    // Şimdiki zaman
    const now = new Date().toISOString()

    // Yeni görev nesnesi oluştur
    const newTask: Task = {
      id,
      ...body,
      createdAt: now,
      updatedAt: now,
      createdBy,
    }

    // Görevi uygun listeye ekle
    if (newTask.status === "completed") {
      global.tasks.completed.push(newTask)
    } else {
      global.tasks.progress.push(newTask)
    }

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("Görev oluşturulurken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görev oluşturulurken bir hata oluştu" },
      { status: 500 }
    )
  }
}
