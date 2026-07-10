// emsalleri.com'un C segmenti için referans piyasa verileri tabanı
const piyasaHavuzu = [
    {
        marka: "Volkswagen",
        model: "Golf",
        yil: 2020,
        paket: "Comfortline",
        ortalamaPiyasaFiyati: 1100000, // 1.100.000 TL
        kronikSorunlar: "Kuru tip DSG şanzıman kartı ısınma yapabilir, 100 bin km sonrası kavrama kontrol edilmeli."
    },
    {
        marka: "Seat",
        model: "Leon",
        yil: 2020,
        paket: "FR",
        ortalamaPiyasaFiyati: 1150000, // 1.150.000 TL
        kronikSorunlar: "Trim sesleri gelebilir, sunroof fitillerini kontrol ettirin."
    },
    {
        marka: "Fiat",
        model: "Egea",
        yil: 2022,
        paket: "Easy",
        ortalamaPiyasaFiyati: 750000, // 750.000 TL
        kronikSorunlar: "Yağ yakma eğilimi olabilir (1.4 Fire motorlar için), multimedya ekranı donma yapabilir."
    }
];

module.exports = piyasaHavuzu;