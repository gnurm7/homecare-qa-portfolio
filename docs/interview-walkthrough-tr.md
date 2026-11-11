# Projeyi mülakatta anlatma rehberi

Bu rehber konuşma hazırlığı içindir. Bir adımı kendin uygulamadan kişisel deneyim olarak anlatma. Yeni testler, SQL örnekleri ve doküman geliştirmeleri AI desteğiyle hazırlanmıştır.

## Beş dakikalık gösterim

1. README'deki yetkinlik tablosundan başla. Rezervasyon fiyatı, girdi doğrulama ve iptal durumunu neden yüksek risk gördüğünü açıkla.
2. `npm test` çalıştır. İsim için 1/2/60/61, oda için 0/1/5/6 değerlerini neden seçtiğini anlat. Tarayıcı doğrulamasının API doğrulamasının yerine geçmediğini göster.
3. `npm run test:ui` çalıştır. UI-04'te kontrollü 500 yanıtını ve tekrar denemeyi göster. Role/label seçicilerinin kullanıcıya görünen arayüzü nasıl izlediğini açıkla.
4. `python scripts/check_sql.py` çalıştır. Yanlış fiyatı JOIN ile, yinelenen id'yi GROUP BY/HAVING ile bul. Temiz veri kontrolünün yanlış alarmı nasıl yakaladığını anlat.
5. BUG-001 raporunu ve manuel sonuçlarını aç. Bunun bilerek eklenmiş eğitim hatası olduğunu söyle. CI raporu ile test planının çalıştırılmış kanıt arasındaki farkını açıkla.

## Hazırlanılacak sorular

| Soru | Kod üzerinden tartışılacak nokta |
|---|---|
| Neyi otomatikleştirdin, neden? | Tekrarlanabilir sınırlar API'de; ana kullanıcı akışı tarayıcıda; kullanılabilirlik keşif testinde |
| Flaky test nasıl incelenir? | Sabit bekleme yok; izole context; hata ekran görüntüsü ve trace; başarısız isteği inceleme |
| Severity ve priority farkı? | Severity kullanıcı etkisi; priority düzeltme sırası. Eğitim hatasının gerçek ödeme etkisi olduğunu iddia etme |
| Eşzamanlılık testi neyi kanıtlar? | On istekte benzersiz id ve bağımsız iptal durumu; yük kapasitesini ölçmez |
| Projede ne eksik? | Kalıcı veri, kimlik doğrulama, gerçek cihaz, ekran okuyucu, güvenlik ve performans değerlendirmesi |

## Kendi katkını güçlendirme

Keşif testi planını gerçekten uygula ve tarihli kayıt ekle. Yeni bir bulguyu adımlar, beklenen/gerçek sonuç ve kanıtla raporla. Sonra ilgili regresyon testini kendin yazıp nedenini açıklayabildiğinden emin ol. Mevcut sahip katkısı ve AI desteğinin kapsamı README'de belirtilmiştir.
