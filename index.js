const express = require('express');
const veriBulutu = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const girilenLink = req.query.ara || '';
    let rapor = null;
    let emsalTavsiyesi = '';

    // SADECE "sahibinden" veya "arabam" içeriyorsa çalış, değilse hiçbir şey yapma
    if (girilenLink && (girilenLink.includes('sahibinden') || girilenLink.includes('arabam'))) {
        const yeniArac = { 
            marka: girilenLink.includes('golf') ? 'golf' : 'passat', 
            fiyat: 1250000 
        };
        
        veriBulutu.push(yeniArac);
        emsalTavsiyesi = "1.000.000 TL - 1.050.000 TL aralığı emsal olarak öngörülmektedir.";
        
        rapor = {
            model: "Analiz Edilen Araç",
            fiyat: "1.250.000 TL"
        };
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <title>emsalleri.com</title>
        <style>
            body { font-family: sans-serif; background: #fff; display: flex; justify-content: center; padding: 50px; }
            .container { max-width: 600px; width: 100%; }
            .search-area { display: flex; gap: 10px; }
            input { flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 8px; }
            button { padding: 12px 20px; background: #06b6d4; color: white; border: none; border-radius: 8px; cursor: pointer; }
            .report { margin-top: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>emsalleri.com</h2>
            <form action="/" method="GET" class="search-area">
                <input type="text" name="ara" placeholder="Sahibinden linkini yapıştır..." required>
                <button type="submit">Analiz Et</button>
            </form>

            ${rapor ? `
            <div class="report">
                <h3>Analiz Sonucu</h3>
                <p>İlan fiyatı: ${rapor.fiyat}</p>
                <p><strong>Robot Tavsiyesi:</strong> ${emsalTavsiyesi}</p>
            </div>
            ` : (girilenLink ? '<p style="color:red">Geçersiz link. Lütfen gerçek bir ilan linki girin.</p>' : '')}
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT);