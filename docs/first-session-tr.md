# Çalışma rehberi

Proje artık GitHub deposunda takip edilir: https://github.com/gnurm7/homecare-qa-portfolio

1. Kök dizinde README kurulum adımlarını uygula. PowerShell npm betiğini engellerse `npm.cmd` ve `npx.cmd` kullan.
2. `npm.cmd start` ile uygulamayı aç. İki odalık temizlik için 1000 TL ve iptal akışını incele.
3. [Kaydedilmiş altı manuel kontrolü](my-manual-results.md) oku. Yeni oturumları ayrı tarih, ortam, beklenen ve gözlenen sonuçlarla ekle; eski kayıtları değiştirme.
4. `npm.cmd test` ve kurulumdan sonra `npm.cmd run test:ui` çalıştır. [Güncel ve geçmiş kanıtları](../evidence/summary.md) karşılaştır.
5. [BUG-001](BUG-001.md) kasıtlı eğitim hatasıdır. Bug mode ile denedikten sonra `Remove-Item Env:BUG_MODE` çalıştır.
6. Tek karakterli isim testi eklenmiştir. Kalan sınırlar 2/60/61, eksik alanlar, TC-20, klavye kullanımı ve sunucu hata mesajlarıdır. Denemeden başarı kaydetme.

Değişiklikler için `git status`, `git diff`, açıklayıcı commit ve normal `git push` kullan. Uzak değişiklikleri önce kontrol et; force push kullanma. [Actions](https://github.com/gnurm7/homecare-qa-portfolio/actions/workflows/qa.yml) sonucunu izle.

Başlangıç ve bu belge düzenlemesi AI desteğiyle hazırlanmıştır. Sahibinin manuel sonuçları ve ek testi README'de ayrı belirtilmiştir.
