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

// Tek bir görevi görüntüle
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Her iki listede de ara
    const progressTask = global.tasks!.progress.find((task) => task.id === id)
    const completedTask = global.tasks!.completed.find((task) => task.id === id)

    const task = progressTask || completedTask

    if (!task) {
      return NextResponse.json(
        { error: `ID: ${id} ile görev bulunamadı` },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Görev getirilirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görev getirilirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Görevi güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()

    // Güncellenmeyecek alanları kontrol et
    if (updates.id) {
      return NextResponse.json(
        { error: "Görev ID'si değiştirilemez" },
        { status: 400 }
      )
    }

    // Güncellenen zaman
    const now = new Date().toISOString()

    // İlk olarak progress listesinde ara
    const progressTaskIndex = global.tasks!.progress.findIndex(
      (task) => task.id === id
    )

    if (progressTaskIndex !== -1) {
      // Görevi güncelle
      const updatedTask = {
        ...global.tasks!.progress[progressTaskIndex],
        ...updates,
        updatedAt: now,
      }

      // Eğer durum değiştiyse, doğru listeye taşı
      if (updates.status === "completed") {
        global.tasks!.progress.splice(progressTaskIndex, 1)
        global.tasks!.completed.push(updatedTask)
      } else {
        global.tasks!.progress[progressTaskIndex] = updatedTask
      }

      return NextResponse.json(updatedTask)
    }

    // Eğer progress listesinde bulunamazsa, completed listesinde ara
    const completedTaskIndex = global.tasks!.completed.findIndex(
      (task) => task.id === id
    )

    if (completedTaskIndex !== -1) {
      // Görevi güncelle
      const updatedTask = {
        ...global.tasks!.completed[completedTaskIndex],
        ...updates,
        updatedAt: now,
      }

      // Eğer durum değiştiyse, doğru listeye taşı
      if (updates.status === "progress") {
        global.tasks!.completed.splice(completedTaskIndex, 1)
        global.tasks!.progress.push(updatedTask)
      } else {
        global.tasks!.completed[completedTaskIndex] = updatedTask
      }

      return NextResponse.json(updatedTask)
    }

    return NextResponse.json(
      { error: `ID: ${id} ile görev bulunamadı` },
      { status: 404 }
    )
  } catch (error) {
    console.error("Görev güncellenirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görev güncellenirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

// Görevi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // İlk olarak progress listesinde ara
    const progressTaskIndex = global.tasks!.progress.findIndex(
      (task) => task.id === id
    )

    if (progressTaskIndex !== -1) {
      // Görevi sil
      global.tasks!.progress.splice(progressTaskIndex, 1)
      return new NextResponse(null, { status: 204 })
    }

    // Eğer progress listesinde bulunamazsa, completed listesinde ara
    const completedTaskIndex = global.tasks!.completed.findIndex(
      (task) => task.id === id
    )

    if (completedTaskIndex !== -1) {
      // Görevi sil
      global.tasks!.completed.splice(completedTaskIndex, 1)
      return new NextResponse(null, { status: 204 })
    }

    return NextResponse.json(
      { error: `ID: ${id} ile görev bulunamadı` },
      { status: 404 }
    )
  } catch (error) {
    console.error("Görev silinirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Görev silinirken bir hata oluştu" },
      { status: 500 }
    )
  }
}
