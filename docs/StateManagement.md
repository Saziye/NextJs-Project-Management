## 📘 Next.js ile State Management: Detaylı Rehber

### 🔹 State Management Nedir?

State management, bir uygulamadaki verilerin (kullanıcı bilgisi, filtreleme seçenekleri, alışveriş sepeti verisi vb.) yönetilmesidir. Bu veriler farklı bileşenler arasında paylaştırılabilir, güncellenebilir ve saklanabilir olmalıdır.

---

## 🧩 Next.js'te State Management Nerelerde Kullanılır?

- **Küçük ve yerel state’ler** için (örneğin form verileri): React `useState`, `useReducer`
- **Orta büyüklükte state’ler** için (örneğin: filtreler, modallar): Context API veya Zustand
- **Global state ve veri eşitlemesi** için (örneğin: oturum yönetimi, ürün listesi, auth): Zustand, Redux, Recoil
- **Sunucu verisi senkronizasyonu** için (örneğin: API'den gelen veri): React Query, SWR

---

## 🧠 Temel Terimler

| Terim            | Açıklama                                                        |
| ---------------- | --------------------------------------------------------------- |
| Local State      | Bileşene özgü state (`useState`)                                |
| Global State     | Birden fazla bileşen tarafından paylaşılan state                |
| Persistent State | Sayfa yenilendiğinde bile korunan state (localStorage, cookies) |
| Server State     | API'den gelen ve UI ile eşleşen veri                            |

---

## ✅ Basit Durumlar için: `useState`, `useReducer`

```tsx
// örnek: bileşen içi toggle
const [isOpen, setIsOpen] = useState(false)
```

`useReducer`, karmaşık form state yönetimi gibi durumlarda idealdir:

```tsx
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload }
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, { name: "" })
```

---

## 🌍 Global State için: Context API

```tsx
// context/UserContext.tsx
const UserContext = createContext(null)
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
```

Kullanımı:

```tsx
const { user } = useContext(UserContext)
```

> ❗️ Context API büyük state'ler için ideal değildir, performans düşüşüne yol açabilir.

---

## 🧪 Daha Etkili ve Performanslı Alternatifler

### 1. ✅ **Zustand** – Hafif ve modern

Kurulum:

```bash
npm install zustand
```

Kullanım:

```ts
// store/useStore.ts
import { create } from "zustand"

type State = {
  count: number
  increase: () => void
}

export const useStore = create<State>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}))
```

Bileşende:

```tsx
const count = useStore((state) => state.count)
const increase = useStore((state) => state.increase)
```

> ✅ Selector desteği sayesinde re-render optimizasyonu sağlar.

---

### 2. 📦 **Redux Toolkit** – Kapsamlı yapı ve büyük projeler için ideal

Kurulum:

```bash
npm install @reduxjs/toolkit react-redux
```

Dosya yapısı önerisi:

```
store/
  index.ts
  slices/
    userSlice.ts
    cartSlice.ts
```

Store tanımı:

```ts
// store/index.ts
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: { user: userReducer },
})
```

Next.js ile `Provider` kullanımı (app/layout.tsx):

```tsx
<Provider store={store}>{children}</Provider>
```

---

### 3. 📬 **React Query** veya **SWR** – Sunucu verisi için en iyi çözüm

Sunucudan gelen veriyi senkronize tutmak için:

```bash
npm install @tanstack/react-query
```

Kullanım:

```ts
const { data, isLoading } = useQuery(["products"], fetchProducts)
```

> React Query **cache**, **retry**, **background fetch**, **pagination** gibi gelişmiş özelliklerle gelir.

---

## 📐 En İyi Uygulamalar

✅ **Modüler yapı kur**: `store/`, `contexts/`, `hooks/`, `api/` gibi klasörlerle böl.

✅ **Global state’i sade tut**: UI state'lerini (modallar, toggle'lar) local state'te bırak.

✅ **Memoization kullan**: `useMemo`, `useCallback`, `React.memo` ile performansı artır.

✅ **TypeScript kullan**: State yapını tipleyerek hataları önle.

✅ **Server state'i karıştırma**: API'den gelen veri için React Query / SWR kullan.

---

## 🔧 Kullanabileceğin Kütüphaneler

| Kütüphane     | Kullanım Amacı                 | Avantajı                   |
| ------------- | ------------------------------ | -------------------------- |
| Zustand       | Global UI + iş verisi yönetimi | Kolay, performanslı        |
| Redux Toolkit | Karmaşık büyük projeler        | TypeScript dostu, kapsamlı |
| Recoil        | Graph tabanlı state yönetimi   | Atom yapısı ile modülerlik |
| Jotai         | Minimal, atom-temelli yapı     | Basitlik ve esneklik       |
| React Query   | Server state yönetimi          | Otomatik caching, refetch  |
| SWR           | Server veri çekimi             | Çok hafif ve sade          |

---

## 🎯 Örnek Senaryolar ve Tercihler

| Senaryo                    | Kullanım Önerisi         |
| -------------------------- | ------------------------ |
| Kullanıcı oturumu          | Zustand / Redux          |
| Tema değişimi              | Context API veya Zustand |
| API'den gelen ürün listesi | React Query              |
| Sepet yönetimi             | Zustand veya Redux       |
| Modal açık/kapalı durumu   | useState / Zustand       |

---

## 💡 Sonuç

- Küçük uygulamalar için `useState` ve `Context` yeterlidir.
- Orta-büyük uygulamalar için **Zustand** önerilir.
- Çok büyük, modüler yapılar için **Redux Toolkit** değerlendirilebilir.
- API verileri için mutlaka **React Query** gibi bir çözüm tercih edilmelidir.

Kesinlikle! Aşağıda **Zustand** kullanarak bir **Next.js projesinde global state yönetimi** nasıl yapılır, adım adım ve örnek kodlarla açıklıyorum.

---

## 🐻 Zustand Nedir?

Zustand, küçük ama güçlü bir state management kütüphanesidir. Context API'ye göre çok daha performanslıdır ve Redux’a göre çok daha az boilerplate kodla çalışır.

---

## 📦 Kurulum

```bash
npm install zustand
```

---

## 🧱 Temel Yapı

### 🔹 1. Basit bir store tanımı

```ts
// store/useCounterStore.ts
import { create } from "zustand"

type CounterState = {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

---

### 🔹 2. Bileşende kullanımı

```tsx
// components/Counter.tsx
"use client" // Next.js 13+ için

import { useCounterStore } from "@/store/useCounterStore"

export default function Counter() {
  const count = useCounterStore((state) => state.count)
  const increase = useCounterStore((state) => state.increase)
  const decrease = useCounterStore((state) => state.decrease)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div>
      <h1>Sayaç: {count}</h1>
      <button onClick={increase}>Artır</button>
      <button onClick={decrease}>Azalt</button>
      <button onClick={reset}>Sıfırla</button>
    </div>
  )
}
```

> ✅ `useStore((state) => state.count)` kullanımı sayesinde sadece `count` değiştiğinde bileşen tekrar render edilir, bu da performans için idealdir.

---

## ⚙️ Daha Gelişmiş: Persist (localStorage desteği)

```bash
npm install zustand/middleware
```

```ts
// store/useUserStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserState = {
  name: string
  setName: (name: string) => void
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      name: "",
      setName: (name) => set({ name }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
)
```

---

### Kullanımı:

```tsx
const name = useUserStore((state) => state.name)
const setName = useUserStore((state) => state.setName)
```

> ✅ Sayfa yenilense bile `name` değeri kaybolmaz, çünkü localStorage ile saklanır.

---

## 🧪 Selector + Shallow Kullanımı (Performance Boost)

```ts
import { useCounterStore } from "@/store/useCounterStore"
import shallow from "zustand/shallow"

const Component = () => {
  const { count, increase } = useCounterStore(
    (state) => ({ count: state.count, increase: state.increase }),
    shallow
  )
}
```

> ✅ `shallow` kullanarak sadece değişen değerler için render olur.

---

## 🧱 Dosya Yapısı Önerisi

```
store/
  useCounterStore.ts
  useUserStore.ts
  useCartStore.ts
```

---

## 🧠 Ne Tür Durumlarda Kullanılır?

| Durum                         | Zustand ile uygun mu?           |
| ----------------------------- | ------------------------------- |
| Tema yönetimi                 | ✅ Evet                         |
| Sepet yönetimi                | ✅ Evet                         |
| Auth bilgisi                  | ✅ Evet (persist ile)           |
| Modal açık/kapalı durumu      | ✅ Evet                         |
| Server verisi (API'den gelen) | 🚫 Hayır (React Query önerilir) |

---

## 🤖 Ekstra: TypeScript + Zustand Tips

```ts
type Product = { id: number; name: string }

type CartState = {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (id: number) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}))
```

---

## 🏁 Sonuç

**Zustand**, Next.js projelerinde:

- Global state için sade ve güçlü bir çözüm sunar.
- Selector ile performans dostudur.
- localStorage entegrasyonu ile kalıcı state sağlar.
- TypeScript ile çok iyi çalışır.

## 🗂️ Senaryo: Task List

### Özellikler:

- Görev ekleme
- Görev silme
- Görevi tamamlandı olarak işaretleme
- Zustand ile state yönetimi

---

## 🧱 Proje Yapısı

```
/store
  useTaskStore.ts
/components
  TaskForm.tsx
  TaskList.tsx
  TaskItem.tsx
/app
  page.tsx
```

---

## 1️⃣ Zustand Store – `useTaskStore.ts`

```ts
// store/useTaskStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Task = {
  id: string
  title: string
  completed: boolean
}

type TaskState = {
  tasks: Task[]
  addTask: (title: string) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
            },
          ],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    { name: "task-storage" }
  )
)
```

---

## 2️⃣ Görev Ekleme Formu – `TaskForm.tsx`

```tsx
"use client"

import { useState } from "react"
import { useTaskStore } from "@/store/useTaskStore"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni görev..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 rounded border p-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Ekle
      </button>
    </form>
  )
}
```

---

## 3️⃣ Görev Listeleme – `TaskList.tsx`

```tsx
"use client"

import { useTaskStore } from "@/store/useTaskStore"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)

  if (tasks.length === 0) return <p>Henüz görev yok.</p>

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
```

---

## 4️⃣ Tekil Görev Bileşeni – `TaskItem.tsx`

```tsx
"use client"

import { Task, useTaskStore } from "@/store/useTaskStore"

type Props = { task: Task }

export default function TaskItem({ task }: Props) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const removeTask = useTaskStore((state) => state.removeTask)

  return (
    <li className="flex items-center justify-between rounded border p-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className={task.completed ? "text-gray-500 line-through" : ""}>
          {task.title}
        </span>
      </label>
      <button onClick={() => removeTask(task.id)} className="text-red-500">
        Sil
      </button>
    </li>
  )
}
```

---

## 5️⃣ Ana Sayfa – `app/page.tsx`

```tsx
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"

export default function Home() {
  return (
    <main className="mx-auto mt-10 max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">Görev Listesi</h1>
      <TaskForm />
      <TaskList />
    </main>
  )
}
```

---

## ✨ Bonus: Styling (Tailwind ile)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`globals.css` içinde:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ Özellik Özeti

| Özellik               | Kullanım                            |
| --------------------- | ----------------------------------- |
| Global task state     | Zustand                             |
| Görevlerin kalıcılığı | `persist` middleware (localStorage) |
| Performans            | Selector kullanımı                  |
| Modülerlik            | Store ve bileşenler ayrı dosyada    |
