import { NextRequest, NextResponse } from "next/server"
import { Task } from "@/types/task"

// TypeScript için global interface genişletme
declare global {
  // eslint-disable-next-line no-var
  var tasks: {
    progress: Task[]
    completed: Task[]
  } | undefined
}

// Görev durumunu güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { status } = await request.json()

    // Durum doğrulaması
    if (status !== "progress" && status !== "completed") {
      return NextResponse.json(
        { error: "Geçersiz durum. 'progress' veya 'completed' olmalıdır." },
        { status: 400 }
      )
    }

    // Güncellenen zaman
    const now = new Date().toISOString()

    // Progress listesinde ara
    const progressTaskIndex = global.tasks!.progress.findIndex(
      (task) => task.id === id
    )

    if (progressTaskIndex !== -1) {
      const task = global.tasks!.progress[progressTaskIndex]

      // Eğer durum zaten aynıysa, sadece güncelleme tarihini değiştir
      if (task.status === status) {
        task.updatedAt = now
        return NextResponse.json(task)
      }

      // Durumu değiştir ve tamamlanmış listesine taşı
      task.status = status
      task.updatedAt = now

      // Listeyi güncelle
      global.tasks!.progress.splice(progressTaskIndex, 1)
      global.tasks!.completed.push(task)

      return NextResponse.json(task)
    }

    // Completed listesinde ara
    const completedTaskIndex = global.tasks!.completed.findIndex(
      (task) => task.id === id
    )

    if (completedTaskIndex !== -1) {
      const task = global.tasks!.completed[completedTaskIndex]

      // Eğer durum zaten aynıysa, sadece güncelleme tarihini değiştir
      if (task.status === status) {
        task.updatedAt = now
        return NextResponse.json(task)
      }

      // Durumu değiştir ve progress listesine taşı
      task.status = status
      task.updatedAt = now

      // Listeyi güncelle
      global.tasks!.completed.splice(completedTaskIndex, 1)
      global.tasks!.progress.push(task)

      return NextResponse.json(task)
    }

    return NextResponse.json(
      { error: `ID: ${id} ile görev bulunamadı` },
      { status: 404 }
    )
  } catch (error) {
    console.error("Görev durumu güncellenirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görev durumu güncellenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}
