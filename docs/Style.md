Harika bir soru!  
"**Style**" yani **stil**, web sayfalarının görünümünü tanımlayan kısımdır. Renkler, yazı tipleri, boşluklar, hizalamalar, responsive yapı gibi tüm görsel detaylar style ile yönetilir.

---

## 🎨 Style Nedir?

**Style**, HTML elementlerinin tarayıcıda nasıl görüneceğini belirler.  
CSS, SCSS, TailwindCSS gibi farklı yöntemlerle yazılır.

---

## 🧰 Next.js ile Style Kullanım Yöntemleri

Next.js, stil yönetimi için birçok farklı yaklaşımı destekler. Aşağıda en yaygın yöntemleri bulabilirsin:

---

### 1️⃣ **Global CSS**

Uygulamanın geneli için kullanılan stillerdir. Genellikle `app/globals.css` dosyasına yazılır.

**Kurulum:**

```css
/* app/globals.css */
body {
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  margin: 0;
}
```

**Kullanımı:**

```tsx
// app/layout.tsx
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

---

### 2️⃣ **CSS Modules** – Bileşen özelinde stil

Dosya adı `.module.css` olmalıdır.

```css
/* components/Button.module.css */
.btn {
  background: blue;
  color: white;
  padding: 10px;
}
```

```tsx
// components/Button.tsx
import styles from "./Button.module.css"

export default function Button() {
  return <button className={styles.btn}>Tıkla</button>
}
```

> ✅ Avantajı: CSS çakışmalarını önler.

---

### 3️⃣ **SCSS / SASS Desteği**

```bash
npm install sass
```

Kullanım:

```scss
/* styles/Home.module.scss */
.container {
  padding: 20px;
  color: #333;
}
```

```tsx
import styles from "@/styles/Home.module.scss"

export default function HomePage() {
  return <div className={styles.container}>Merhaba</div>
}
```

> ✅ Daha okunabilir ve güçlü CSS yazımı sağlar (`nesting`, `variables`, `mixins` vs).

---

### 4️⃣ **Tailwind CSS** – Utility-First Yaklaşımı

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Kullanım:

```tsx
export default function Home() {
  return (
    <div className="bg-blue-500 p-4 text-center text-white">
      Merhaba Tailwind!
    </div>
  )
}
```

> ✅ Hızlı geliştirme, responsive yapı ve mobil uyum kolaylığı sağlar.

---

### 5️⃣ **Styled Components (CSS-in-JS)**

```bash
npm install styled-components
npm install -D @types/styled-components babel-plugin-styled-components
```

Kullanım:

```tsx
"use client"
import styled from "styled-components"

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
`

export default function Page() {
  return <Button>Styled Button</Button>
}
```

> ✅ JavaScript içinde stil yazmayı sağlar. Dinamik stiller için çok güçlüdür.

---

## 🧠 Hangi Stil Yöntemi Ne Zaman Kullanılır?

| Yöntem            | Kullanım Durumu                                       |
| ----------------- | ----------------------------------------------------- |
| Global CSS        | Temel gövde stilleri, fontlar                         |
| CSS Modules       | Bileşen bazlı stiller (küçük projelerde iyi)          |
| SCSS              | Gelişmiş tasarımlar, değişkenler kullanmak istiyorsan |
| Tailwind          | Hızlı ve responsive tasarımlar için ideal             |
| Styled Components | Dinamik stil, tema yönetimi, JS içi stil              |

---

## 🎯 Örnek: Basit bir Kart bileşeni

### Tailwind ile:

```tsx
export default function Card() {
  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-bold">Kart Başlığı</h2>
      <p className="text-gray-700">Kart içeriği buraya gelir.</p>
    </div>
  )
}
```

### CSS Module ile:

```tsx
// Card.module.css
.card {
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}
.title {
  font-size: 1.25rem;
  font-weight: bold;
}
```

```tsx
import styles from "./Card.module.css"

export default function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Kart Başlığı</h2>
      <p>Kart içeriği</p>
    </div>
  )
}
```

---

## ✨ Sonuç

- Küçük projelerde CSS Modules idealdir.
- Büyük projelerde SCSS veya Tailwind önerilir.
- UI kütüphaneleriyle (Shadcn, Chakra, MUI) de kolayca entegre olur.
- Performans, okunabilirlik ve ekip alışkanlıklarına göre stil yöntemi seçilmelidir.
