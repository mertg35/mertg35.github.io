# İzmir Teknik: Tasarım Sistemi (The Design System)

## 1. Genel Bakış ve Yaratıcı Kuzey Yıldızı (Creative North Star)

Bu tasarım sistemi, İzmir Teknik'in endüstriyel gücünü ve teknik uzmanlığını dijital bir deneyime dönüştürmek için tasarlanmıştır. Geleneksel endüstriyel sitelerin hantal yapısından sıyrılarak, **"Endüstriyel Editoryal" (Industrial Editorial)** yaklaşımını benimser.

**Yaratıcı Kuzey Yıldızı: "Mühendislik Hassasiyeti"**
Tıpkı İzeltaş'ın bir anahtarı veya Technolit'in bir kaynak makinesi gibi, dijital arayüz de dayanıklı, hassas ve güvenilir hissettirmelidir. Bu sistem, sıradan kutu bazlı şablonları reddeder. Bunun yerine, geniş beyaz alanlar (breathing room), asimetrik yerleşimler ve derinlik algısı yaratan katmanlı yüzeyler kullanarak "profesyonel ekipman tedarikçisi" kimliğini premium bir boyuta taşır.

---

## 2. Renkler (Colors)

Renk paleti, ağır sanayi güvenini (`primary`) ve sahadaki görünürlüğü (`secondary`) temsil eder.

### Renk Stratejisi
- **"Çizgisiz" Kuralı:** Bölümleri ayırmak için asla 1px genişliğinde gri çizgiler kullanmayın. Sınırlar, yalnızca arka plan rengindeki ton geçişleriyle (`surface` -> `surface-container-low`) belirlenmelidir.
- **Yüzey Hiyerarşisi ve İç İçe Geçme:** Arayüzü düz bir zemin yerine, üst üste binmiş levhalar gibi düşünün. `surface-container-highest` üzerindeki bir `surface-container-lowest` kartı, doğal bir odak noktası oluşturur.
- **Cam ve Gradyan:** Ana eylem butonlarında veya Hero alanlarında `primary` (#00628d) renginden `primary_container` (#007cb1) rengine giden çok hafif diyagonal gradyanlar kullanarak "metalik" bir derinlik sağlayın.
- **Cam Etkisi (Glassmorphism):** Floating (yüzen) menülerde veya ürün detay panellerinde, yarı saydam yüzey renkleri ve `backdrop-blur` kullanarak modern bir mühendislik estetiği yakalayın.

| Token | Değer | Kullanım Alanı |
| :--- | :--- | :--- |
| `primary` | #00628d | Marka kimliği, ana navigasyon, ağır sanayi mavisi. |
| `secondary` | #845400 | Aksiyon, dikkat çekici uyarılar, "Vibrant Orange". |
| `surface` | #fbf9f8 | Genel arka plan, temiz ve ferah çalışma alanı. |
| `on_surface` | #1b1c1c | Gövde metinleri, yüksek okunabilirlik. |
| `outline_variant` | #bec8d1 | Sadece düşük opaklıkta (%10-20) "Hayalet Sınırlar" için. |

---

## 3. Tipografi (Typography)

Tipografi, bir teknik kataloğun otoritesini taşımalıdır. Başlıklar ağır ve sarsılmaz, gövde metinleri ise teknik bir döküman kadar net olmalıdır.

- **Display & Headline (Work Sans):** Endüstriyel bir tipografi hissi için geniş ve kalın (Bold/Black) ağırlıklar tercih edilir. Bu, İzeltaş veya Technolit logolarındaki o sarsılmaz güveni simgeler.
- **Body & Label (Inter):** Teknik verilerin ve ürün özelliklerinin okunabilirliği için nötr, geometrik bir sans-serif seçilmiştir.

**Hiyerarşi Örneği:**
- **Display-LG:** "Sektörün Gücü, İzmir Teknik." (Ağır, otoriter)
- **Title-MD:** "Hidrolik Sistemler ve Ekipmanlar" (Yapılandırılmış, net)
- **Body-MD:** "Yüksek basınçlı sistemler için optimize edilmiş..." (Okunabilir, teknik)

---

## 4. Yükseklik ve Derinlik (Elevation & Depth)

Bu sistemde derinlik, gölgelerden ziyade **Tonal Katmanlama** ile sağlanır.

- **Katmanlama Prensibi:** Bir kartı veya bölümü öne çıkarmak için `surface-container-low` bir zemin üzerine `surface-container-lowest` (saf beyaz) bir blok yerleştirin. Bu, yumuşak ve doğal bir yükselti hissi verir.
- **Ambiyans Gölgeleri:** Eğer bir elemanın (örn. sepete ekle butonu veya modal) mutlaka "uçması" gerekiyorsa, gölge rengini `on-surface` tonundan alın ancak opaklığı %4-%8 arasında tutun ve blur değerini geniş (30px+) tutun.
- **Hayalet Sınır (Ghost Border):** Erişilebilirlik gereği sınır gerekiyorsa, `outline-variant` tokenini %15 opaklıkta kullanın. Tam opak çizgilerden kaçının.

---

## 5. Bileşenler (Components)

### Butonlar (Buttons)
- **Primary:** `primary` dolgu, `on_primary` metin. Köşe yarıçapı: `md` (0.375rem). Hafif üstten alta gradyan.
- **Secondary:** `secondary` (Turuncu) dolgu. Kritik aksiyonlar (Teklif Al, Satın Al) için.
- **Tertiary:** Arka plansız, sadece `primary` metin rengi. İkincil navigasyon için.

### Kartlar ve Listeler (Cards & Lists)
- **Kural:** Kartları ayırmak için ayırıcı çizgi (divider) kullanmayın. 
- **Uygulama:** Ürün kartlarını `surface-container-lowest` renginde bloklar olarak tasarlayın. Kartlar arasındaki boşluğu `spacing-scale` üzerinden geniş tutun.
- **Partner Logoları:** (Bosch, İzeltaş, Technolit) "Partner Gridi" içinde, grayscale (gri tonlamalı) olarak yer almalı, hover durumunda kendi orijinal renklerine dönmelidir.

### Girdi Alanları (Input Fields)
- **Yapı:** `surface-container-high` arka plan rengiyle doldurulmuş, alt kenarı hafifçe vurgulanmış (focus durumunda `primary` renk) alanlar.
- **Hata Durumu:** `error` rengiyle sadece metin ve küçük bir ikon desteği.

### Endüstriyel Veri Tabloları (Industrial Data Tables)
- Teknik tablolar bu sistemin kalbidir. Satırları ayırmak için çizgi yerine, birer satır atlayarak `surface-container-low` rengini kullanın (Zebra striping).

---

## 6. Yapılması Gerekenler ve Pitfall'lar (Do's and Don'ts)

**Do's (Yapın):**
- **Geniş Boşluklar Kullanın:** Teknik içeriğin boğucu olmaması için elemanlar arasında cömert `padding` bırakın.
- **Hiyerarşiyi Tonla Kurun:** Birincil içeriği her zaman en açık (brightest) yüzeyde tutun.
- **Yerelleştirme:** Teknik terimlerin Türkçe karşılıklarını (Örn: "Maintenance" yerine "Bakım Onarım") marka tonuna uygun, profesyonel bir dille seçin.

**Don'ts (Kaçının):**
- **Siyah Gölge Kullanmayın:** Gölgeler her zaman zemin rengiyle ilintili, çok düşük opaklıkta olmalıdır.
- **Keskin Köşelerden Kaçının:** Endüstriyel olsa da "modern" hissi korumak için `md` veya `lg` yuvarlatma değerlerini kullanın; tam kare (none) köşeler tasarımı eskimiş gösterir.
- **Divider Enflasyonu:** Sayfayı çizgilerle bölmeyin. Eğer bir bölüme çizgi koymak zorunda hissediyorsanız, muhtemelen boşluk (whitespace) kullanımınız yetersizdir.

---
*İzmir Teknik Tasarım Sistemi - Sürüm 1.0*