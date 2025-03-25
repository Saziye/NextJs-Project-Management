## ⚙️ 1. CSR (Client-Side Rendering)

**Nedir?**  
Sayfa yüklendikten sonra içerik **tarayıcıda (istemci tarafında)** JavaScript ile oluşturulur.

**Ne zaman kullanılır?**

- Verilerin kullanıcıya özel olduğu durumlarda (örneğin: kullanıcı paneli).
- API’den gelen veri sayfa açıldıktan sonra çekiliyorsa.

### ✅ Artıları:

- Hızlı sayfa geçişi.
- Kullanıcı etkileşimleri için ideal.

### ❌ Eksileri:

- SEO için kötü (çünkü içerik ilk başta boş gelir).
- İlk yükleme biraz gecikebilir.

### 🔧 Örnek:

```tsx
// Sayfa yüklendikten sonra veri çekilir
"use client"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData)
  }, [])

  return <div>{data ? data.message : "Yükleniyor..."}</div>
}
```

---

## ⚙️ 2. SSR (Server-Side Rendering)

**Nedir?**  
Kullanıcı sayfayı ziyaret ettiğinde, içerik **her seferinde sunucuda oluşturulur** ve tarayıcıya tam HTML gönderilir.

**Ne zaman kullanılır?**

- SEO önemliyse (ör: blog, haber sayfası)
- Kullanıcıya özel içerik her zaman güncel olmalıysa

### ✅ Artıları:

- SEO dostu.
- İçerik hemen yüklenir.

### ❌ Eksileri:

- Sunucu yükü artar.
- Her istekte sayfa yeniden oluşturulur.

### 🔧 Örnek:

```tsx
// pages/index.tsx
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data")
  const data = await res.json()

  return { props: { data } }
}

export default function Page({ data }) {
  return <div>{data.message}</div>
}
```

---

## ⚙️ 3. SSG (Static Site Generation)

**Nedir?**  
Sayfa **build (yayına alma)** sırasında oluşturulur ve CDN üzerinden servis edilir.

**Ne zaman kullanılır?**

- İçeriğin sık değişmediği, herkese aynı olduğu sayfalarda (ör: hakkımızda, blog).

### ✅ Artıları:

- Çok hızlı yüklenir (HTML hazırdır).
- SEO dostu.
- Sunucu yükü yok.

### ❌ Eksileri:

- İçerik değişirse build tekrar gerekir.

### 🔧 Örnek:

```tsx
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/data")
  const data = await res.json()

  return { props: { data } }
}
```

---

## ⚙️ 4. ISR (Incremental Static Regeneration)

**Nedir?**  
SSG gibi çalışır ama içeriği belirli aralıklarla otomatik günceller.

**Ne zaman kullanılır?**

- İçeriğin bazen güncellendiği, ama her zaman SSR kadar dinamik olması gerekmediği durumlarda (ör: ürün listesi).

### ✅ Artıları:

- SSG kadar hızlı.
- SSR kadar güncel.
- SEO dostu.

### ❌ Eksileri:

- Güncellenme süresi kontrol altında tutulmalı (`revalidate` süresi ayarlanmalı).

### 🔧 Örnek:

```tsx
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/products")
  const data = await res.json()

  return {
    props: { data },
    revalidate: 60, // 60 saniyede bir sayfa yeniden oluşturulur
  }
}
```

---

## 🧠 Özet Karşılaştırma Tablosu

| Yöntem  | Oluşturma Zamanı          | SEO | Hız  | Dinamizm |
| ------- | ------------------------- | --- | ---- | -------- |
| **CSR** | Tarayıcıda                | ❌  | Orta | ✅       |
| **SSR** | Her istekte sunucu        | ✅  | Orta | ✅✅     |
| **SSG** | Build time                | ✅  | ✅   | ❌       |
| **ISR** | Build + süreli güncelleme | ✅  | ✅   | ✅       |

---

## 🎯 Ne Zaman Hangisini Kullanmalı?

| Durum                               | Yöntem       |
| ----------------------------------- | ------------ |
| Blog sayfası, SEO önemli            | SSG veya ISR |
| Kullanıcıya özel dashboard          | CSR          |
| Güncel fiyatlar, sipariş durumu     | SSR          |
| Ürün listesi ama çok sık değişmiyor | ISR          |
| Hakkımızda, iletişim sayfası        | SSG          |
