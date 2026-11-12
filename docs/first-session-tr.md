# Çalışma rehberi

Proje artık GitHub deposunda takip edilir: https://github.com/gnurm7/homecare-qa-portfolio

1. Kök dizinde README kurulum adımlarını uygula. PowerShell npm betiğini engellerse `npm.cmd` ve `npx.cmd` kullan.
2. `npm.cmd start` ile uygulamayı aç. İki odalık temizlik için 1000 TL ve iptal akışını incele.
3. [Kaydedilmiş altı manuel kontrolü](my-manual-results.md) oku. Yeni oturumları ayrı tarih, ortam, beklenen ve gözlenen sonuçlarla ekle; eski kayıtları değiştirme.
4. `npm.cmd test` ve kurulumdan sonra `npm.cmd run test:ui` çalıştır. [Güncel ve geçmiş kanıtları](../README.md#results-and-evidence) karşılaştır.
5. [BUG-001](BUG-001.md) kasıtlı eğitim hatasıdır. Bug mode ile denedikten sonra `Remove-Item Env:BUG_MODE` çalıştır.
6. İsim sınırları 2/60/61, eksik alanlar, klavye ve kontrollü hata akışları otomasyona eklenmiştir. [Keşif testi planını](exploratory-charter.md) kendin uygula; TC-20 manuel gözlemi hâlâ bekliyor. Denemeden başarı kaydetme.

Değişiklikler için `git status`, `git diff`, açıklayıcı commit ve normal `git push` kullan. Uzak değişiklikleri önce kontrol et; force push kullanma. [Actions](https://github.com/gnurm7/homecare-qa-portfolio/actions/workflows/qa.yml) sonucunu izle.

Test kapsamı, çalıştırma komutları ve tarihli sonuç kayıtları README'de yer alır.
