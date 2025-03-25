## 🎯 1. React Hook Form Nedir?

**React Hook Form**, React projelerinde form verilerini yönetmek için kullanılan hafif, performanslı ve kolay bir kütüphanedir.

### ✅ Ne İşe Yarar?

- Form inputlarını `useState`’e ihtiyaç duymadan yönetir.
- Her input ayrı ayrı takip edilir, performanslıdır.
- Form submit işlemini kolaylaştırır.
- Validasyon kütüphaneleriyle (Zod, Yup) kolayca entegre olur.

---

### 🧪 Basit Kullanım Örneği:

```tsx
import { useForm } from "react-hook-form"

type FormData = {
  name: string
}

export default function MyForm() {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data) // { name: "Kullanıcı adı" }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Adınızı girin" />
      <button type="submit">Gönder</button>
    </form>
  )
}
```

---

## 🧠 2. Zod Nedir?

**Zod**, JavaScript ve TypeScript için schema tabanlı bir **validasyon (doğrulama) kütüphanesidir**. Form verilerinin doğruluğunu kontrol etmek için kullanılır.

### ✅ Ne İşe Yarar?

- Gelen verilerin doğru formatta olup olmadığını kontrol eder.
- `string`, `number`, `boolean`, `object`, `array`, `enum` gibi veri türlerini doğrular.
- Form validasyonunda yaygın olarak kullanılır (özellikle React Hook Form ile birlikte).

---

### 🧪 Zod Kullanım Örneği

```ts
import { z } from "zod"

// Basit bir şema:
const userSchema = z.object({
  name: z.string().min(3, "En az 3 karakter olmalı"),
  age: z.number().min(18, "18 yaşından küçük olamaz"),
})

// Geçerli veri
userSchema.parse({ name: "Ahmet", age: 25 }) // ✅ çalışır

// Geçersiz veri
userSchema.parse({ name: "A", age: 12 }) // ❌ hata verir
```

---

## 🪄 React Hook Form + Zod Entegrasyonu

```tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
})

type FormData = z.infer<typeof schema>

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email")} placeholder="E-posta" />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Gönder</button>
    </form>
  )
}
```

---

## 📝 Özetle:

| Özellik       | React Hook Form                             | Zod                                  |
| ------------- | ------------------------------------------- | ------------------------------------ |
| Amaç          | Form state yönetimi                         | Veri doğrulama                       |
| Kullanım yeri | Input'lar, form submit işlemi               | Girilen veriyi kontrol etmek         |
| Avantaj       | Hızlı, sade, minimal yeniden render         | TypeScript uyumlu, güçlü şema tanımı |
| Entegrasyon   | `@hookform/resolvers/zod` paketiyle entegre |

## 🎯 Hedef

- `React Hook Form` ile formu yöneteceğiz.
- `Zod` ile validasyon kuralları yazacağız.
- `@hookform/resolvers` paketiyle `Zod`’u form’a bağlayacağız.

---

## 🔧 Gerekli Kurulumlar

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## 🧱 Güncellenmiş Form: `TaskForm.tsx`

```tsx
"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTaskStore } from "@/store/useTaskStore"

// 🎯 Zod ile validasyon şeması
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Görev en az 3 karakter olmalıdır")
    .max(100, "Görev 100 karakteri geçmemelidir"),
})

type TaskFormData = z.infer<typeof taskSchema>

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = (data: TaskFormData) => {
    addTask(data.title)
    reset() // formu temizle
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input
        {...register("title")}
        type="text"
        placeholder="Görev girin..."
        className="w-full rounded border p-2"
      />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Görev Ekle
      </button>
    </form>
  )
}
```

---

## 🧪 Açıklama

| Kısım                                     | Açıklama                                      |
| ----------------------------------------- | --------------------------------------------- |
| `z.object(...)`                           | Zod ile form kurallarını tanımladık.          |
| `useForm({ resolver: zodResolver(...) })` | Zod validasyonunu React Hook Form’a bağladık. |
| `register('title')`                       | input’un form state ile bağlanmasını sağladı. |
| `errors.title.message`                    | Hata mesajını Zod üzerinden gösterdi.         |

---

## ✨ Artık Ne Kazandık?

- Formu tek satırda sıfırlayabiliyoruz (`reset()`).
- Gelişmiş validasyon ve detaylı hata mesajları.
- Genişletilebilirlik: Daha sonra e-posta, tarih, dropdown gibi alanlar ekleyebiliriz.
- Zod sayesinde hem client-side hem server-side doğrulama uyumu.

---

## 🔄 Bonus Geliştirme Fikirleri

- 🔍 Zod ile checkbox, dropdown ve radio input validasyonları
- 📅 Tarih seçimi (Zod `z.date()` ile)
- 🗃️ Görev kategorisi gibi alanlar (Zod `z.enum()` ile)
- 🌐 Çoklu dil desteği için hata mesajlarını özelleştirme
