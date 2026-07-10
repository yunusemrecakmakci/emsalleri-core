const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Gelişmiş veri tabanı simülasyonu (Modelleri dinamik yapmak için)
const aracVerileri = {
    "golf": {
        ad: "Volkswagen Golf (2020) - Comfortline",
        fiyat: "1.250.000 TL",
        emsal: "1.100.000 TL",
        durum: "❌ UYARI: Bu araç piyasa ortalamasının yaklaşık 150.000 TL ÜZERİNDE.",
        durumRenk: "#ef4444",
        durumArkaPlan: "#fef2f2",
        aiNotu: "Kuru tip DSG şanzıman kartı ısınma yapabilir, 100 bin km sonrası kavrama kontrol edilmeli."
    },
    "egea": {
        ad: "Fiat Egea (2022) - 1.3 M.Jet Easy",
        fiyat: "720.000 TL",
        emsal: "750.000 TL",
        durum: "✅ FIRSAT: Bu araç piyasa ortalamasının 30.000 TL ALTINDA. Kaçırılmayacak emsal!",
        durumRenk: "#10b981",
        durumArkaPlan: "#f0fdf4",
        aiNotu: "1.3 Multijet motor tam bir yakıt cimrisidir. Şehir içi ticari geçmişi olup olmadığını mutlaka kontrol edin."
    },
    "clio": {
        ad: "Renault Clio (2021) - 1.0 TCe Touch",
        fiyat: "810.000 TL",
        emsal: "815.000 TL",
        durum: "⚖️ DENGELİ: Araç tam olarak piyasa değerinde listelenmiş.",
        durumRenk: "#3b82f6",
        durumArkaPlan: "#eff6ff",
        aiNotu: "X-Tronic şanzıman konforludur ancak yokuş kalkışlarında hafif geri kaçırma eğilimi yapabilir, normaldir."
    }
};

app.get('/', (req, res) => {
    // Kullanıcının arattığı kelimeyi yakala, yoksa varsayılan olarak golf getir
    const arama = (req.query.ara || 'golf').toLowerCase().trim();
    
    // Veri tabanında eşleşme ara, bulamazsa en yakın eşleşmeyi seç veya golf göster
    let secilenAraç = aracVerileri[arama];
    if (!secilenAraç) {
        if (arama.includes('egea')) secilenAraç = aracVerileri.egea;
        else if (arama.includes('clio')) secilenAraç = aracVerileri.clio;
        else secilenAraç = aracVerileri.golf;
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>emsalleri.com | Akıllı Araç Analizi</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); color: #333; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { max-width: 650px; width: 100%; background: white; padding: 35px; border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 32px; font-weight: 800; color: #1e3a8a; text-decoration: none; letter-spacing: -1px; }
            .logo span { color: #3b82f6; }
            .subtitle { font-size: 14px; color: #64748b; margin-top: 5px; }
            .search-form { display: flex; gap: 10px; margin-bottom: 30px; }
            .search-input { flex: 1; padding: 14px 20px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none; transition: all 0.3s; }
            .search-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
            .search-btn { background: #3b82f6; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; font-size: 16px; cursor: pointer; transition: background 0.2s; }
            .search-btn:hover { background: #2563eb; }
            .report-card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; background: #ffffff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
            .report-title { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }
            .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed #e2e8f0; font-size: 15px; }
            .info-row:last-of-type { border-bottom: none; }
            .label { color: #64748b; font-weight: 500; }
            .value { color: #0f172a; font-weight: 700; }
            .status-box { padding: 15px; border-radius: 10px; margin-top: 20px; font-weight: 700; font-size: 15px; border-left: 5px solid ${secilenAraç.durumRenk}; color: ${secilenAraç.durumRenk}; background: ${secilenAraç.durumArkaPlan}; }
            .ai-note { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-top: 20px; font-size: 14px; line-height: 1.6; }
            .ai-note-title { font-weight: 700; color: #1e293b; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8; line-height: 1.5; }
            .suggestions { display: flex; gap: 8px; margin-top: -20px; margin-bottom: 25px; flex-wrap: wrap; }
            .tag { background: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 20px; font-size: 13px; text-decoration: none; font-weight: 500; transition: all 0.2s; }
            .tag:hover { background: #e2e8f0; color: #0f172a; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="/" class="logo">emsalleri<span>.com</span></a>
                <div class="subtitle">Emsal Fiyat Karşılaştırma Yapay Zekası</div>
            </div>
            
            <form action="/" method="GET" class="search-form">
                <input type="text" name="ara" class="search-input" value="${secilenAraç.ad}" placeholder="Araç modeli girin (Örn: Golf, Egea, Clio)...">
                <button type="submit" class="search-btn">Analiz Et</button>
            </form>

            <div class="suggestions">
                <span style="font-size: 13px; color: #64748b; padding-top: 4px;">Hızlı Örnekler:</span>
                <a href="/?ara=golf" class="tag">Golf</a>
                <a href="/?ara=egea" class="tag">Egea</a>
                <a href="/?ara=clio" class="tag">Clio</a>
            </div>

            <div class="report-card">
                <div class="report-title">📊 Analiz Raporu</div>
                <div class="info-row">
                    <span class="label">🔎 İncelenen Model:</span>
                    <span class="value">${secilenAraç.ad}</span>
                </div>
                <div class="info-row">
                    <span class="label">💰 İstenen Satış Fiyatı:</span>
                    <span class="value" style="color: #ef4444;">${secilenAraç.fiyat}</span>
                </div>
                <div class="info-row">
                    <span class="label">📉 Emsal Piyasa Ortalaması:</span>
                    <span class="value" style="color: #10b981;">${secilenAraç.emsal}</span>
                </div>
                
                <div class="status-box">
                    ${secilenAraç.durum}
                </div>

                <div class="ai-note">
                    <div class="ai-note-title">🤖 Akıllı Asistan Notu:</div>
                    "${secilenAraç.aiNotu}"
                </div>
            </div>

            <div class="footer">
                Yasal Uyarı: emsalleri.com piyasa verilerini analiz eder, yatırım tavsiyesi vermez.<br>
                © 2026 emsalleri.com - Tüm Hakları Saklıdır.
            </div>
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 emsalleri.com sunucusu yayında!`);
});