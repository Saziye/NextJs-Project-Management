# Proje Yönetim Sistemi

Modern ve kullanıcı dostu bir proje yönetim sistemi. Görev takibi, ekip yönetimi ve proje ilerlemesi için kapsamlı bir çözüm.

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

- **Frontend Framework:** Next.js 14
- **Stil Kütüphanesi:** Tailwind CSS
- **Durum Yönetimi:** React Hooks
- **Form Yönetimi:** React Hook Form
- **Veri Doğrulama:** Zod
- **Sürükle-Bırak:** @hello-pangea/dnd
- **İkonlar:** Lucide React
- **HTTP İstekleri:** Axios
- **API Yönetimi:** TanStack Query
- **Tip Güvenliği:** TypeScript

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

## 🔧 Yapılandırma

- **ESLint:** JavaScript/TypeScript kod kalitesi kontrolü
- **Prettier:** Kod formatlaması
- **Tailwind:** UI bileşenleri ve stil yönetimi
- **TypeScript:** Tip güvenliği ve geliştirici deneyimi

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
