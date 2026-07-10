const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// SİTENİN TÜM İÇERİĞİ (20 POPÜLER ARAÇ VERİ TABANI)
const aracVerileri = {
    "golf": { ad: "Volkswagen Golf (2020) - 1.5 TSI Comfortline", fiyat: "1.250.000 TL", emsal: "1.180.000 TL", durum: "❌ YÜKSEK: Bu araç piyasa ortalamasının üzerinde listelenmiş.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "Kuru tip DSG şanzıman kartı ısınma yapabilir, 100 bin km sonrası kavrama kontrol edilmeli." },
    "egea": { ad: "Fiat Egea (2022) - 1.3 Multijet Easy", fiyat: "720.000 TL", emsal: "750.000 TL", durum: "✅ FIRSAT: Bu araç piyasa ortalamasının altında, kaçırılmayacak emsal!", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "1.3 Multijet motor yakıt cimrisidir. Şehir içi ticari veya şirket geçmişi olup olmadığını mutlaka sorgulayın." },
    "clio": { ad: "Renault Clio (2021) - 1.0 TCe Touch", fiyat: "810.000 TL", emsal: "815.000 TL", durum: "⚖️ DENGELİ: Araç tam olarak hakkı olan piyasa değerinde listelenmiş.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "X-Tronic şanzıman konforludur ancak yokuş kalkışlarında hafif geri kaçırma eğilimi yapabilir, normaldir." },
    "passat": { ad: "Volkswagen Passat (2018) - 1.6 TDI Comfortline", fiyat: "1.450.000 TL", emsal: "1.420.000 TL", durum: "⚖️ DENGELİ: Piyasa fiyatına oldukça yakın, makul bir seviyede.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "Ağır ve prestijli araçtır. Kilometresi yüksekse dizel partikül filtresi (DPF) ve kurum temizliği kontrol edilmeli." },
    "corolla": { ad: "Toyota Corolla (2021) - 1.5 Dream Multidrive S", fiyat: "980.000 TL", emsal: "1.020.000 TL", durum: "✅ FIRSAT: Emsallerine göre yaklaşık 40.000 TL daha avantajlı.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "Sorunsuzluk abidesidir. 3 silindirli yeni motor rölantide biraz sarsıntılı çalışabilir, arıza değildir." },
    "civic": { ad: "Honda Civic (2019) - 1.6 Eco Executive", fiyat: "1.120.000 TL", emsal: "1.080.000 TL", durum: "❌ YÜKSEK: Fabrikasyon LPG'li olmasına rağmen fiyatı piyasadan biraz yüksek.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "CVT şanzıman sorunsuzdur ancak yüksek devirde içeriye ses alabilir. Göçük davası kroniklerini kontrol edin." },
    "megane": { ad: "Renault Megane (2020) - 1.3 TCe Joy", fiyat: "890.000 TL", emsal: "870.000 TL", durum: "❌ YÜKSEK: Joy paket (boş paket) için istenen fiyat biraz yukarıda.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "1.3 TCe motor Mercedes ortak yapımıdır, performansı çok iyidir. EDC şanzıman beyni kontrolleri yapılmalı." },
    "320d": { ad: "BMW 3 Serisi (2015) - 320d Techno Plus", fiyat: "1.650.000 TL", emsal: "1.700.000 TL", durum: "✅ FIRSAT: Ağır hasar kaydı yoksa bu fiyata kaçırılmayacak bir BMW.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "N47 motor zincir değişimi geçmişini mutlaka sorun. Yanlanmış, yorulmuş araçlardan uzak durmaya çalışın." },
    "c200": { ad: "Mercedes-Benz C-Class (2016) - C200 d AMG", fiyat: "1.890.000 TL", emsal: "1.850.000 TL", durum: "❌ YÜKSEK: AMG paket farkı abartılmış, piyasadan 40 bin TL fazla.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "Bu kasadaki 1.6 dizel motor Renault üretimidir, parça sıkıntısı yaşatmaz. AdBlue iptali yapılıp yapılmadığına bakın." },
    "focus": { ad: "Ford Focus (2019) - 1.5 EcoBlue Trend X", fiyat: "910.000 TL", emsal: "925.000 TL", durum: "✅ FIRSAT: Piyasa fiyatının altında listelenmiş, değerlendirilebilir.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "Yol tutuşu mükemmeldir. 8 ileri tork konvertörlü otomatik şanzımanı oldukça sağlam ve sorunsuzdur." },
    "astra": { ad: "Opel Astra (2017) - 1.6 CDTI Edition Plus", fiyat: "780.000 TL", emsal: "790.000 TL", durum: "⚖️ DENGELİ: Tam bir fiyat/performans aracı değerinde.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "136 beygirlik 'Whisper' dizel motor güçlüdür. Zincir sesi (şırpıntı) yapıp yapmadığı soğuk motorda dinlenmeli." },
    "leon": { ad: "Seat Leon (2019) - 1.5 TSI FR", fiyat: "1.150.000 TL", emsal: "1.130.000 TL", durum: "❌ YÜKSEK: FR donanım popülerliği nedeniyle fiyatı hafif şişirilmiş.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "ACT (silindir kapatma) teknolojisi vardır, sakin sürüşte az yakar. Trim sesleri yapmaya müsaittir." },
    "qashqai": { ad: "Nissan Qashqai (2018) - 1.5 dCi Tekna", fiyat: "1.080.000 TL", emsal: "1.100.000 TL", durum: "✅ FIRSAT: SUV piyasasına göre fiyatı gayet makul kalmış.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "Yalların eskitemediği 1.5 dCi motor ömürlüktür. CVT şanzımanlı versiyonlarında şanzıman yağı değişim periyoduna dikkat edilmeli." },
    "tuscon": { ad: "Hyundai Tucson (2020) - 1.6 CRDI Elite", fiyat: "1.390.000 TL", emsal: "1.380.000 TL", durum: "⚖️ DENGELİ: Piyasa normlarına uygun bir fiyatlama.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "7 ileri DCT şanzıman çift kavramadır, yoğun trafikte manuele alınarak kullanılması ömrünü uzatır." },
    "sportage": { ad: "Kia Sportage (2021) - 1.6 CRDI Elegance", fiyat: "1.290.000 TL", emsal: "1.320.000 TL", durum: "✅ FIRSAT: Geniş aile SUV'u arayanlar için fiyat avantajlı.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "Tucson ile aynı altyapıyı paylaşır. İç malzeme kalitesi ortalamadır ancak donanım olarak çok zengindir." },
    "i20": { ad: "Hyundai i20 (2021) - 1.4 MPI Style", fiyat: "740.000 TL", emsal: "735.000 TL", durum: "⚖️ DENGELİ: Şehir içi kullanım için ideal piyasa fiyatı.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "Atmosferik motoru rampada bayılır ama tam otomatik şanzımanı asla arıza yapmaz. LPG ile tam uyumludur." },
    "polo": { ad: "Volkswagen Polo (2019) - 1.0 TSI Comfortline", fiyat: "870.000 TL", emsal: "890.000 TL", durum: "✅ FIRSAT: İkinci el piyasasında hızlı satılacak bir fiyatta.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "1.0 motor şehir içi için çok seridir. Vergi avantajı sağlar, piyasası altın gibidir, hızlı satılır." },
    "fiesta": { ad: "Ford Fiesta (2018) - 1.5 TDCi Trend G.", fiyat: "690.000 TL", emsal: "710.000 TL", durum: "✅ FIRSAT: Öğrenciye veya yeni başlayana gidecek en dip emsal fiyat.", durumRenk: "#06b6d4", durumArkaPlan: "#ecfeff", aiNotu: "Manuel vitesi çok keyiflidir, direksiyon hissiyatı sınıfının en iyisidir. Arka koltuk diz mesafesi dardır." },
    "insignia": { ad: "Opel Insignia (2016) - 1.6 CDTI Excellence", fiyat: "1.100.000 TL", emsal: "1.090.000 TL", durum: "⚖️ DENGELİ: D segmenti konforuna göre fiyatı normal.", durumRenk: "#0284c7", durumArkaPlan: "#f0f9ff", aiNotu: "Makam arabası konforundadır. Ağır bir kasa olduğu için şehir içi yakıtı 8-9 litreleri bulabilir." },
    "superb": { ad: "Skoda Superb (2019) - 1.6 TDI Prestige", fiyat: "1.580.000 TL", emsal: "1.550.000 TL", durum: "❌ YÜKSEK: Genişlik harika ama fiyat piyasanın 30 bin TL üstünde.", durumRenk: "#ef4444", durumArkaPlan: "#fef2f2", aiNotu: "Arka diz mesafesi devasadır. Prestige paketteki elektrikli bagaj ve kronik şemsiye detaylarını kontrol edin." }
};

app.get('/', (req, res) => {
    const arama = (req.query.ara || 'golf').toLowerCase().trim();
    let secilenAraç = aracVerileri[arama];

    if (!secilenAraç) {
        const anahtarlar = Object.keys(aracVerileri);
        const bulunan = anahtarlar.find(k => arama.includes(k));
        secilenAraç = bulunan ? aracVerileri[bulunan] : aracVerileri.golf;
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>emsalleri.com | Akıllı Araç Analizi</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
            body { background-color: #ffffff; color: #1e293b; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { max-width: 700px; width: 100%; background: #ffffff; padding: 35px; border-radius: 24px; box-shadow: 0 20px 40px rgba(6, 182, 212, 0.08); border: 2px solid #ecfeff; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 36px; font-weight: 800; color: #0891b2; text-decoration: none; letter-spacing: -1px; }
            .logo span { color: #06b6d4; }
            .subtitle { font-size: 14px; color: #64748b; margin-top: 5px; font-weight: 500; }
            .search-form { display: flex; gap: 10px; margin-bottom: 25px; }
            .search-input { flex: 1; padding: 16px 20px; border: 2px solid #cffafe; background: #f8fafc; color: #0f172a; border-radius: 14px; font-size: 16px; outline: none; transition: all 0.3s; }
            .search-input:focus { border-color: #06b6d4; background: #ffffff; }
            .search-btn { background: #06b6d4; color: white; border: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: background 0.2s; }
            .search-btn:hover { background: #0891b2; }
            .suggestions { display: flex; gap: 8px; margin-bottom: 30px; flex-wrap: wrap; align-items: center; background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .tag { background: #ffffff; color: #0891b2; padding: 6px 14px; border-radius: 20px; font-size: 13px; text-decoration: none; font-weight: 600; border: 1px solid #cffafe; transition: all 0.2s; }
            .tag:hover { background: #06b6d4; color: white; border-color: #06b6d4; }
            .report-card { border: 2px solid #e2e8f0; border-radius: 18px; padding: 30px; background: #ffffff; }
            .report-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
            .info-row { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px dashed #e2e8f0; font-size: 16px; }
            .info-row:last-of-type { border-bottom: none; }
            .label { color: #64748b; font-weight: 500; }
            .value { color: #0f172a; font-weight: 700; }
            .status-box { padding: 18px; border-radius: 12px; margin-top: 20px; font-weight: 700; font-size: 16px; border-left: 5px solid ${secilenAraç.durumRenk}; color: #0f172a; background: ${secilenAraç.durumArkaPlan}; }
            .ai-note { background: #f0f9ff; border: 1px solid #e0f2fe; padding: 20px; border-radius: 14px; margin-top: 22px; font-size: 15px; line-height: 1.6; color: #0369a1; }
            .ai-note-title { font-weight: 700; color: #0284c7; margin-bottom: 8px; }
            .footer { text-align: center; margin-top: 35px; font-size: 13px; color: #94a3b8; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="/" class="logo">emsalleri<span>.com</span></a>
                <div class="subtitle">Emsal Fiyat Karşılaştırma Yapay Zekası</div>
            </div>
            
            <form action="/" method="GET" class="search-form">
                <input type="text" name="ara" class="search-input" value="${secilenAraç.ad}" placeholder="Araç modeli yazın (Örn: Passat, Corolla, Civic, 320d)...">
                <button type="submit" class="search-btn">Analiz Et</button>
            </form>

            <div class="suggestions">
                <span style="font-size: 13px; color: #64748b; font-weight:600;">Hızlı Seçim:</span>
                <a href="/?ara=passat" class="tag">Passat</a>
                <a href="/?ara=corolla" class="tag">Corolla</a>
                <a href="/?ara=civic" class="tag">Civic</a>
                <a href="/?ara=megane" class="tag">Megane</a>
                <a href="/?ara=320d" class="tag">BMW 320d</a>
                <a href="/?ara=c200" class="tag">Mercedes C200</a>
                <a href="/?ara=qashqai" class="tag">Qashqai</a>
                <a href="/?ara=polo" class="tag">Polo</a>
            </div>

            <div class="report-card">
                <div class="report-title">📊 Sistem Emsal Raporu</div>
                <div class="info-row">
                    <span class="label">🚘 Model Adı:</span>
                    <span class="value">${secilenAraç.ad}</span>
                </div>
                <div class="info-row">
                    <span class="label">💰 İstenen Satış Fiyatı:</span>
                    <span class="value" style="color: #ef4444;">${secilenAraç.fiyat}</span>
                </div>
                <div class="info-row">
                    <span class="label">📉 Gerçek Emsal Ortalaması:</span>
                    <span class="value" style="color: #10b981;">${secilenAraç.emsal}</span>
                </div>
                
                <div class="status-box" style="border-left-color: ${secilenAraç.durumRenk}; background-color: ${secilenAraç.durumArkaPlan}; color: #0f172a;">
                    ${secilenAraç.durum}
                </div>

                <div class="ai-note">
                    <div class="ai-note-title">🤖 Akıllı Asistan Ekspertiz Notu:</div>
                    "${secilenAraç.aiNotu}"
                </div>
            </div>

            <div class="footer">
                Yasal Uyarı: emsalleri.com veri tabanındaki hazır piyasa endekslerini gösterir.<br>
                © 2026 emsalleri.com - Tüm Hakları Saklıdır.
            </div>
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Sunucu aktif!`);
});