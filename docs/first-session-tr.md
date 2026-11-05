# İlk oturum: 45–60 dakika
1. README'deki kurulum adımlarını uygula; `npm start` ile uygulamayı aç.
2. Tarayıcıdan iki odalık temizlik rezervasyonu oluştur. Beklenen tutar 1000 TL. İptal et.
3. `docs/test-cases.md` dosyasında TC-02 ve TC-15'i oku. Yeni bir `docs/my-manual-results.md` dosyasında kendi gözlemini, tarihi ve ortamını kaydet.
4. Sunucuyu kapat. `npm test` çalıştır; sınır değeri testlerinin kodlarını incele.
5. BUG-001 raporunu okuyup Postman ile bug mode üzerinde yeniden üret. İşin bitince BUG_MODE değişkenini kaldır.
6. Kendi katkın olarak ad uzunluğu 1 / 2 / 60 / 61 testlerini ekle. Önce beklenen sonucu yaz, sonra çalıştır ve kaydet.

## GitHub'a ekleme
GitHub'da `homecare-qa-portfolio` isimli boş bir repository oluştur. ZIP'i aç ve proje dosyalarını yükle; node_modules klasörünü yükleme. Komut satırı kullanıyorsan proje içinde:
```bash
git init
git add .
git commit -m "Add reproducible QA portfolio demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/homecare-qa-portfolio.git
git push -u origin main
```
YOUR_USERNAME yerine kendi hesabını yaz. Otomatik test için Actions sekmesini kontrol et. Workflow bu paket içinde sağlanmıştır; GitHub üzerinde çalıştığı henüz doğrulanmamıştır.

Bu başlangıç AI desteğiyle hazırlanmıştır. README'de bunu koru; senaryoları anla, kendin çalıştır, kendi sonuçlarını ve yaptığın geliştirmeleri ekle. Mülakatta açıklayamadığın bir çalışmayı kendi başına geliştirmiş gibi sunma.
