# HomeCare testlerini çalıştırma ve inceleme

1. [Test stratejisini](test-strategy.md) incele. Rezervasyon fiyatı, girdi doğrulama ve iptal durumu yüksek öncelikli risklerdir.
2. `npm test` komutuyla API testlerini çalıştır. İsim uzunluğunda 1, 2, 60 ve 61 karakteri, oda sayısında 0, 1, 5 ve 6 değerlerini kontrol eden senaryoları incele. API testleri formu kullanmadan doğrudan sunucu doğrulamasını çalıştırır.
3. `npm run test:ui` komutuyla tarayıcı testlerini çalıştır. UI-04, kontrollü bir HTTP 500 yanıtından sonra kullanıcının rezervasyonu tekrar deneyebildiğini doğrular. Başarısız tarayıcı testlerinde ekran görüntüsü ve Playwright trace kaydedilir.
4. `python scripts/check_sql.py` komutuyla SQLite kontrollerini çalıştır. Fiyat tutarsızlığı JOIN ile, yinelenen rezervasyon kimliği GROUP BY ve HAVING ile bulunur. Temiz veri kontrolleri, sorguların geçerli kayıtları hata olarak işaretlemediğini doğrular.
5. [BUG-001](BUG-001.md) raporunu ve [manuel test sonuçlarını](my-manual-results.md) incele. BUG-001 eğitim için kasıtlı olarak eklenen sıfır oda hatasını belgeler. Regresyon testi, eğitim modunda hatayı yeniden üretir ve varsayılan modda isteğin reddedildiğini doğrular.

Yerel test çıktıları [çalıştırma kaydında](../evidence/2026-11-11-summary.md) yer alır. [Keşif testi planı](exploratory-charter.md), yapılacak oturumun kapsamını ve kayıt şablonunu içerir.
