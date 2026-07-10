const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sitenin şık tasarımı (HTML, CSS ve İçerik bir arada)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>emsalleri.com | Akıllı Araç Analizi</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { background-color: #f4f6f9; color: #333; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { max-width: 600px; width: 100%; background: white; padding: 30px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            .header { text-align: center; margin-bottom: 25px; }
            .logo { font-size: 28px; font-weight: 800; color: #2563eb; text-decoration: none; letter-spacing: -1px; }
            .logo span { color: #10b981; }
            .search-box { display: flex; gap: 10px; margin-bottom: 25px; }
            .search-input { flex: 1; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 15px; outline: none; transition: border 0.2s; }
            .search-input:focus { border-color: #2563eb; }
            .search-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
            .search-btn:hover { background: #1d4ed8; }
            .report-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #fafafa; }
            .report-title { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #e5e7eb; font-size: 15px; }
            .info-row:last-of-type { border-bottom: none; }
            .label { color: #64748b; font-weight: 500; }
            .value { color: #0f172a; font-weight: 600; }
            .warning-box { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; border-radius: 4px 8px 8px 4px; margin-top: 15px; color: #991b1b; font-weight: 600; font-size: 14px; }
            .ai-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px 8px 8px 4px; margin-top: 15px; font-size: 14px; line-height: 1.5; }
            .ai-note-title { font-weight: 700; color: #1e40af; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
            .footer { text-align: center; margin-top: 25px; font-size: 12px; color: #94a3b8; line-height: 1.4; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="#" class="logo">emsalleri<span>.com</span></a>
            </div>
            
            <div class="search-box">
                <input type="text" class="search-input" value="Volkswagen Golf (2020) - Comfortline" placeholder="Araç marka, model veya yıl yazın...">
                <button class="search-btn">Analiz Et</button>
            </div>

            <div class="report-card">
                <div class="report-title">📊 Analiz Raporu Hazırlandı</div>
                <div class="info-row">
                    <span class="label">🔎 İnceleme Altındaki Araç:</span>
                    <span class="value">Volkswagen Golf (2020) - Comfortline</span>
                </div>
                <div class="info-row">
                    <span class="label">💰 Satıcı Fiyatı:</span>
                    <span class="value" style="color: #ef4444;">1.250.000 TL</span>
                </div>
                <div class="info-row">
                    <span class="label">📉 Emsal Piyasa Ortalama Fiyatı:</span>
                    <span class="value" style="color: #10b981;">1.100.000 TL</span>
                </div>
                
                <div class="warning-box">
                    ❌ UYARI: Bu araç piyasa ortalamasının yaklaşık 150.000 TL ÜZERİNDE.
                </div>

                <div class="ai-note">
                    <div class="ai-note-title">🤖 Mankafa Yapay Zeka Notu:</div>
                    "Kuru tip DSG şanzıman kartı ısınma yapabilir, 100 bin km sonrası kavrama kontrol edilmeli."
                </div>
            </div>

            <div class="footer">
                Yasal Uyarı: emsalleri.com yatırım tavsiyesinde bulunmaz.<br>
                © 2026 emsalleri.com - Tüm Hakları Saklıdır.
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 emsalleri.com sunucusu aktif!`);
});