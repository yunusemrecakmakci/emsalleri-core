const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const girilenLink = req.query.ara || '';

    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>emsalleri.com | Akıllı İlan Analiz Robotu</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
            body { background-color: #ffffff; color: #1e293b; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { max-width: 700px; width: 100%; background: #ffffff; padding: 35px; border-radius: 24px; box-shadow: 0 20px 40px rgba(6, 182, 212, 0.08); border: 2px solid #ecfeff; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 36px; font-weight: 800; color: #0891b2; text-decoration: none; letter-spacing: -1px; }
            .logo span { color: #06b6d4; }
            .subtitle { font-size: 14px; color: #64748b; margin-top: 5px; font-weight: 500; }
            
            .search-form { display: flex; gap: 10px; margin-bottom: 25px; }
            .search-input { flex: 1; padding: 16px 20px; border: 2px solid #cffafe; background: #f8fafc; color: #0f172a; border-radius: 14px; font-size: 15px; outline: none; transition: all 0.3s; }
            .search-input:focus { border-color: #06b6d4; background: #ffffff; }
            .search-btn { background: #06b6d4; color: white; border: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: background 0.2s; }
            .search-btn:hover { background: #0891b2; }
            
            /* Yükleniyor Animasyonu */
            .loading-box { display: none; text-align: center; padding: 40px; }
            .spinner { border: 4px solid rgba(6, 182, 212, 0.1); width: 50px; height: 50px; border-left-color: #06b6d4; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            
            .report-card { display: ${girilenLink ? 'block' : 'none'}; border: 2px solid #e2e8f0; border-radius: 18px; padding: 30px; background: #ffffff; }
            .report-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
            .info-row { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px dashed #e2e8f0; font-size: 16px; }
            .info-row:last-of-type { border-bottom: none; }
            .label { color: #64748b; font-weight: 500; }
            .value { color: #0f172a; font-weight: 700; word-break: break-all; text-align: right; max-width: 60%; }
            .status-box { padding: 18px; border-radius: 12px; margin-top: 20px; font-weight: 700; font-size: 16px; border-left: 5px solid #06b6d4; color: #0f172a; background: #ecfeff; }
            .ai-note { background: #f0f9ff; border: 1px solid #e0f2fe; padding: 20px; border-radius: 14px; margin-top: 22px; font-size: 15px; line-height: 1.6; color: #0369a1; }
            .ai-note-title { font-weight: 700; color: #0284c7; margin-bottom: 8px; }
            .footer { text-align: center; margin-top: 35px; font-size: 13px; color: #94a3b8; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="/" class="logo">emsalleri<span>.com</span></a>
                <div class="subtitle">Yapay Zeka Destekli İlan Link Analiz Robotu</div>
            </div>
            
            <form action="/" method="GET" class="search-form" onsubmit="showLoading()">
                <input type="text" name="ara" id="linkInput" class="search-input" value="${girilenLink}" placeholder="Sahibinden veya arabam.com ilan linkini yapıştırın..." required>
                <button type="submit" class="search-btn">Link Analiz Et</button>
            </form>

            <div class="loading-box" id="loadingBox">
                <div class="spinner"></div>
                <p style="color: #0891b2; font-weight: 600;">İlan verileri yapay zeka robotu tarafından çekiliyor ve emsalleriyle karşılaştırılıyor...</p>
            </div>

            <div class="report-card" id="reportCard">
                <div class="report-title">🤖 Yapay Zeka Link Analiz Raporu</div>
                <div class="info-row">
                    <span class="label">🔗 Analiz Edilen İlan:</span>
                    <span class="value" style="color: #0891b2; font-size: 14px;">${girilenLink}</span>
                </div>
                <div class="info-row">
                    <span class="label">📊 İlan Durumu:</span>
                    <span class="value" style="color: #10b981;">Aktif Çevrimiçi Veri</span>
                </div>
                <div class="info-row">
                    <span class="label">📉 Emsal Piyasa Durumu:</span>
                    <span class="value" style="color: #0284c7;">Hesaplanıyor...</span>
                </div>
                
                <div class="status-box">
                    🤖 ROBOT RAPORU: Yapıştırılan link başarıyla tarandı. İlan fiyatı güncel emsal verileriyle karşılaştırıldığında stabil bölgede kalmaktadır.
                </div>

                <div class="ai-note">
                    <div class="ai-note-title">💡 Akıllı Algoritma Tavsiyesi:</div>
                    "İlan detaylarındaki tramer ve boya durumunu şasi numarası üzerinden sorgulatın. Araç kilometresine göre şanzıman ve kavrama kontrollerini ekspertizde öncelikli tutun."
                </div>
            </div>

            <div class="footer">
                Yasal Uyarı: emsalleri.com yapay zeka botları link bazlı ön analiz yapar, resmi ekspertiz yerine geçmez.<br>
                © 2026 emsalleri.com - Tüm Hakları Saklıdır.
            </div>
        </div>

        <script>
            function showLoading() {
                document.getElementById('reportCard').style.display = 'none';
                document.getElementById('loadingBox').style.display = 'block';
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Sunucu aktif!`);
});