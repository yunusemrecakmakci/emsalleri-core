const express = require('express');
const path = require('path');
const piyasaVeritabanı = require('./piyasaVerisi');

const app = express();
const PORT = 3000; // Sitemiz yerelde localhost:3000 üzerinden çalışacak

// Web sitemizden gelecek verileri okuyabilmek için bu ayarları açıyoruz
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kullanıcı tarayıcıdan sitemize girdiğinde index.html sayfasını karşısına çıkarıyoruz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Web sitesindeki butona basıldığında linkin geleceği akıllı API kapımız
app.post('/api/analiz-et', (req, res) => {
    const { ilanLinki } = req.body;

    console.log(`🤖 Sunucuya yeni bir analiz isteği geldi: ${ilanLinki}`);

    // Şimdilik link analizini simüle etmek için kullanıcının sarı siteden getirdiği sahte aracı oluşturuyoruz
    // (İleride burası linkten otomatik veri okuyacak veya Copilot ile geliştireceğimiz yapay zekaya gidecek)
    const gelenIlan = {
        marka: "Volkswagen",
        model: "Golf",
        yil: 2020,
        paket: "Comfortline",
        fiyat: 1250000 
    };

    // Hafızamızdaki veri tabanından emsalini buluyoruz
    const emsalArac = piyasaVeritabanı.find(arac => 
        arac.marka === gelenIlan.marka && 
        arac.model === gelenIlan.model && 
        arac.yil === gelenIlan.yil && 
        arac.paket === gelenIlan.paket
    );

    if (emsalArac) {
        const fark = gelenIlan.fiyat - emsalArac.ortalamaPiyasaFiyati;
        let durumMesaji = "";
        let durumRengi = "";

        if (fark > 0) {
            durumMesaji = `❌ UYARI: Bu araç piyasa ortalamasının yaklaşık ${fark.toLocaleString()} TL ÜZERİNDE.`;
            durumRengi = "red";
        } else if (fark < 0) {
            durumMesaji = `✅ AVANTAJ: Bu araç piyasa ortalamasının yaklaşık ${Math.abs(fark).toLocaleString()} TL ALTINDA.`;
            durumRengi = "green";
        } else {
            durumMesaji = `⚖️ NÖTR: Araç tam olarak piyasa değerinde.`;
            durumRengi = "orange";
        }

        // Web sitesine göndereceğimiz akıllı paket (JSON yanıtı)
        res.json({
            basarili: true,
            aracAdı: `${gelenIlan.marka} ${gelenIlan.model} (${gelenIlan.yil}) - ${gelenIlan.paket}`,
            ilanFiyati: `${gelenIlan.fiyat.toLocaleString()} TL`,
            piyasaOrtalamasi: `${emsalArac.ortalamaPiyasaFiyati.toLocaleString()} TL`,
            durum: durumMesaji,
            renk: durumRengi,
            kronikSorun: emsalArac.kronikSorunlar
        });

    } else {
        res.json({
            basarili: false,
            mesaj: "Bu aracın emsal verisi havuzumuzda bulunamadı. Lütfen Golf, Leon veya Egea kelimelerini içeren sahte bir link deneyin."
        });
    }
});

// Sunucuyu ateşliyoruz
app.listen(PORT, () => {
    console.log(`🚀 emsalleri.com sunucusu şu an http://localhost:${PORT} adresinde yayında!`);
});