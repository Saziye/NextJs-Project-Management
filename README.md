# Proje Yönetim Sistemi

Modern ve kullanıcı dostu bir proje yönetim sistemi. Görev takibi, ekip yönetimi ve proje ilerlemesi için kapsamlı bir çözüm.

## 📋 Proje Yapısı

Proje, modern web geliştirme yaklaşımlarını kullanan bir Next.js uygulamasıdır. Aşağıda projenin temel yapısı ve organizasyonu açıklanmıştır:

```
📂 src/
├── 📂 app/           # Next.js App Router yapısı
│   ├── 📂 api/      # API Route Handlers
│   ├── 📂 dashboard/ # Dashboard sayfası
│   └── 📄 layout.tsx # Ana layout bileşeni
├── 📂 components/    # Yeniden kullanılabilir bileşenler
│   ├── 📂 atoms/     # Atom bileşenler (Button, Avatar, vs.)
│   ├── 📂 molecules/ # Molekül bileşenler (TaskCard, TaskForm, vs.)
│   ├── 📂 organisms/ # Organizma bileşenler (TaskList, vs.)
│   └── 📂 layout/    # Layout bileşenleri (Sidebar, Header, vs.)
├── 📂 data/          # Mock veri ve veri yönetimi
├── 📂 hooks/         # Özel React hook'ları
├── 📂 lib/           # Yardımcı fonksiyonlar ve utility'ler
└── 📂 types/         # TypeScript tip tanımlamaları
```

### 🔄 Mimari Yaklaşım

Bu proje, [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) prensiplerini temel alan bir bileşen yapısı kullanmaktadır:

- **Atomlar**: En küçük bileşenler (Button, Avatar, Input)
- **Moleküller**: Atomlardan oluşan orta düzey bileşenler (TaskCard, TaskForm, TaskModal)
- **Organizmalar**: Moleküller ve atomları bir araya getiren karmaşık bileşenler (TaskList)
- **Layout**: Sayfaların genel yapısını oluşturan bileşenler (Sidebar, Header)

## 🚀 Özellikler

- 📋 Görev yönetimi ve organizasyonu
- 👥 Ekip üyeleri atama ve yönetimi
- 🎯 Öncelik seviyeli görev takibi
- 📅 Başlangıç ve bitiş tarihi planlaması
- 🌤️ Hava durumu entegrasyonu
- 📱 Mobil uyumlu tasarım
- 🔄 Sürükle-bırak görev düzenleme
- 🎨 Modern ve minimalist arayüz

## 🛠️ Teknolojiler

### Frontend Teknolojileri

- **Framework**: [Next.js 14](https://nextjs.org/) (React tabanlı)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first yaklaşım)
- **UI Kütüphanesi**: Özel tasarlanmış bileşenler
- **Durum Yönetimi**: [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- **Form Yönetimi**: [React Hook Form](https://react-hook-form.com/)
- **Veri Doğrulama**: [Zod](https://github.com/colinhacks/zod)
- **Sürükle-Bırak**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **İkonlar**: [Lucide React](https://lucide.dev/)

### Backend ve Veri Yönetimi

- **API Routes**: Next.js API Route Handlers
- **HTTP İstekleri**: [Axios](https://axios-http.com/)
- **API Veri Yönetimi**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Veri Saklama**: Geçici olarak bellek içi depolama (ileride veritabanı eklenebilir)

### Geliştirme Araçları

- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Kod Formatlaması**: [Prettier](https://prettier.io/)
- **Derleme & Build**: Next.js Build Sistemi

## ⚙️ Uygulama Özellikleri ve Akışı

### Görev Yönetimi

1. **Görev Oluşturma**:

   - Form tabanlı görev oluşturma
   - Başlangıç ve bitiş tarihi seçimi
   - Öncelik belirleme (Yüksek, Orta, Düşük)
   - Atanan kişileri belirleme
   - Alt görevler oluşturma

2. **Görev Görüntüleme**:

   - Liste görünümü
   - Detaylı görev bilgileri
   - İlerleme durumu izleme
   - Alt görev yönetimi

3. **Görev Güncelleme**:

   - Görev detaylarını düzenleme
   - Durum değiştirme (Devam Ediyor / Tamamlandı)
   - Drag-and-drop ile düzenleme

4. **Görev Filtreleme**:
   - Önceliğe göre filtreleme
   - Tarihe göre filtreleme
   - Atanan kişiye göre filtreleme

### Veri Akışı

1. UI bileşenleri → React state ve prop'lar
2. API istekleri → TanStack Query hooks
3. Form verisi → React Hook Form + Zod validasyon
4. API yanıtları → TanStack Query önbelleği → UI güncellemeleri

## 📦 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/your-username/project-management.git
cd project-management
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

3. `.env.local` dosyasını oluşturun:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

5. Tarayıcınızda http://localhost:3000 adresini açın

## 🔧 Kod Standartları ve Yapılandırma

- **Bileşen Yapısı**: Her bileşen kendi klasöründe, TypeScript ile yazılmış
- **Stil Yaklaşımı**: Tailwind CSS ile utility-first yaklaşım
- **Kod Kalitesi**: ESLint ve Prettier ile standartlaştırılmış
- **Tip Güvenliği**: TypeScript ile tam tip kontrolü
- **Server/Client Ayrımı**: Next.js 'use client' ve 'use server' direktifleri

### Dosya İsimlendirme Kuralları

- Bileşenler: PascalCase (`TaskCard.tsx`)
- Yardımcı fonksiyonlar: camelCase (`formatDate.ts`)
- Tip tanımlamaları: interface veya type ile (`task.ts`)

## 🌟 Yapılabilecek Geliştirmeler

### Kimlik Doğrulama ve Yetkilendirme

- [ ] JWT tabanlı kimlik doğrulama sistemi
- [ ] Rol tabanlı yetkilendirme (Admin, Takım Lideri, Üye)
- [ ] OAuth entegrasyonu (Google, GitHub)

### Görev Yönetimi

- [ ] Görev şablonları oluşturma
- [ ] Tekrarlanan görevler için otomasyon
- [ ] Görev bağımlılıkları ve ilişkileri
- [ ] Görev etiketleme sistemi
- [ ] Dosya ekleme ve yönetimi

### Ekip İşbirliği

- [ ] Gerçek zamanlı bildirimler
- [ ] Görev yorumları ve tartışmalar
- [ ] Ekip üyeleri arasında mesajlaşma
- [ ] Görev aktivite geçmişi

### Raporlama ve Analitik

- [ ] Görev tamamlanma istatistikleri
- [ ] Ekip performans metrikleri
- [ ] Zaman takibi ve raporlama
- [ ] Özelleştirilebilir dashboard'lar

### Kullanıcı Deneyimi

- [ ] Karanlık mod desteği
- [ ] Özelleştirilebilir tema seçenekleri
- [ ] Klavye kısayolları
- [ ] Offline çalışma desteği
- [ ] Daha gelişmiş filtreleme ve arama özellikleri

### Entegrasyonlar

- [ ] Calendar entegrasyonu (Google Calendar, Outlook)
- [ ] Slack/Discord entegrasyonu
- [ ] Email bildirimleri
- [ ] CI/CD pipeline entegrasyonu

### Performans ve Ölçeklendirme

- [ ] Server-side rendering optimizasyonu
- [ ] Image optimizasyonu
- [ ] Code splitting ve lazy loading
- [ ] API önbellekleme stratejileri

### Güvenlik

- [ ] Rate limiting
- [ ] Input validasyonu ve sanitizasyonu
- [ ] CSRF koruması
- [ ] Güvenli oturum yönetimi

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## 👥 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun
