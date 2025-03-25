Muhteşem bir istek! 🎯  
Aşağıda, **Next.js** ile profesyonel bir geliştirme sürecinde karşımıza çıkan tüm temel soruların cevabını net, sade ve örnekli şekilde tek bir rehberde topluyorum:

---

# 🚀 Next.js Geliştirme Rehberi

---

## 📌 1. Next.js Geliştirme Adımları

### 1️⃣ Proje Başlatma

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 2️⃣ Yapılandırma

- `app/` veya `pages/` yapısını seç
- `typescript` ile geliştirmeye başla
- `eslint`, `prettier`, `husky` gibi araçlarla kod kalitesini güvence altına al

### 3️⃣ UI Yapısı

- `components/`: UI parçaları
- `sections/` veya `widgets/`: Bölümler
- `layouts/`: Sayfa şablonları
- `store/`: State yönetimi (Zustand, Redux vs.)
- `lib/`: API istekleri, yardımcı fonksiyonlar
- `hooks/`: Custom hook'lar
- `types/`: TypeScript tipleri

---

## 🧱 2. Hangi Projeye Hangi Design Pattern?

| Proje Türü              | Kullanılacak Yapı / Pattern                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| Blog / İçerik sitesi    | **SSG / ISR**, Folder-based routing, API fetch via `getStaticProps`          |
| Dashboard / Admin Panel | **CSR + Zustand / Context**, Component Composition, Layout Pattern           |
| E-Ticaret               | **ISR + SSR** karışık, Redux/Zustand, Factory Pattern, Observer Pattern      |
| SaaS                    | **Modular Architecture**, Adapter Pattern, Role-based layout yapısı          |
| Büyük ölçekli proje     | **Clean Architecture**, Layered structure, Repository pattern, Service Layer |

---

## 📡 3. API Oluşturma ve Kullanımı

### ✅ API Oluşturma

Next.js ile kendi **RESTful API endpoint**'lerini yazabilirsin:

```ts
// app/api/products/route.ts
export async function GET() {
  const data = await fetchProductsFromDB()
  return Response.json(data)
}
```

> `app/api` dizini kullanılır. GET, POST, DELETE gibi methodlar ayrı fonksiyonlardır.

---

### 🔗 API’ye Bağlanma

#### 1. `fetch`

```ts
const res = await fetch("/api/products")
const data = await res.json()
```

#### 2. `axios`

```ts
import axios from "axios"
const res = await axios.get("/api/products")
```

#### 3. `React Query` (cache + auto refetch):

```ts
import { useQuery } from "@tanstack/react-query"

const { data } = useQuery(["products"], fetchProducts)
```

---

## 🔄 4. RESTful vs GraphQL

| Özellik        | RESTful             | GraphQL                          |
| -------------- | ------------------- | -------------------------------- |
| Veri yapısı    | Sabit endpoint      | Tek endpoint, dinamik veri       |
| Gereksiz veri  | Fazla olabilir      | Yalnızca istenen alan gelir      |
| Öğrenme eğrisi | Kolay               | Orta-zor                         |
| Kullanım yeri  | Basit CRUD işlemler | Karmaşık ilişkili veri modelleri |

✅ Küçük ve orta projelerde REST  
✅ API tüketimini optimize etmek isteyen, mobil uygulama entegrasyonları olan projelerde GraphQL

---

## 🧠 5. Kod Geliştirirken Dikkat Edilmesi Gerekenler

- **Component'ler tek sorumluluk taşımalı (SRP)**
- **UI ile veri mantığını ayır** (hooks veya services içine taşı)
- **Kod tekrarını önle** (`components`, `utils`, `hooks`)
- **Tür güvenliğini sağla** (TypeScript kullan)
- **State yönetimini sade tut** (Zustand veya Context)
- **Dosya yapısını büyüklüğe göre katmanla**

---

## 🧩 6. Component Nasıl Oluşturulmalı?

**İyi bir component** şu özelliklere sahip olmalı:

```tsx
// Button.tsx
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
}

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-4 py-2 ${
        variant === "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      {children}
    </button>
  )
}
```

> ✅ Reusable  
> ✅ Props ile kontrol edilebilir  
> ✅ Tailwind veya CSS Module uyumlu

---

## 💡 7. Neden Next.js?

| Avantaj                                                     | Açıklama                               |
| ----------------------------------------------------------- | -------------------------------------- |
| ✅ SSR + SSG desteği                                        | SEO + performans                       |
| ✅ Route sistemi                                            | Dosya tabanlı, config gerekmez         |
| ✅ API Route desteği                                        | Backend ihtiyacı olmadan veri sağlama  |
| ✅ App Router (Yeni)                                        | Layout paylaşımı, server komponentleri |
| ✅ Tam TypeScript desteği                                   | Hata azaltır                           |
| ✅ React tabanlı                                            | Ekosistem çok büyük                    |
| ✅ Edge functions, Middleware, ISR gibi gelişmiş özellikler | Performans ve ölçeklenebilirlik sağlar |

---

## 🧠 Kapanış

Next.js ile profesyonel bir proje geliştirirken şunlara dikkat et:

✅ **İyi planlanmış dosya yapısı**  
✅ **Tutarlı component tasarımı ve stil kullanımı**  
✅ **Veriyi doğru yöntemle render etme (CSR / SSR / ISR)**  
✅ **Uygun state management**  
✅ **Temiz kod ve TypeScript ile geliştirme**
