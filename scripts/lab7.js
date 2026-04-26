document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------------------------------------------------
    // 1. Koyu/Açık Tema Değiştirme
    // ---------------------------------------------------------
    const temaSwitch = document.getElementById('temaSwitch');
    const temaLabel = document.getElementById('temaLabel');
    
    if (temaSwitch) {
        temaSwitch.addEventListener('change', function() {
            const root = document.documentElement;
            
            if (this.checked) {
                root.setAttribute('data-bs-theme', 'dark');
                if(temaLabel) temaLabel.textContent = 'Koyu Tema';
            } else {
                root.setAttribute('data-bs-theme', 'light');
                if(temaLabel) temaLabel.textContent = 'Açık Tema';
            }
        });
    }

    // ---------------------------------------------------------
    // 2. Form İşleme ve Validasyon
    // ---------------------------------------------------------
    const basvuruFormu = document.getElementById('basvuruFormu');
    const formUyari = document.getElementById('formUyari');
    const sonucAlani = document.getElementById('sonucAlani');

    if (basvuruFormu) {
        basvuruFormu.addEventListener('submit', function(event) {
            // Sayfa yenilenmesini engelle
            event.preventDefault();

            // Tüm input ve select değerlerini al
            const adSoyad = document.getElementById('adSoyad') ? document.getElementById('adSoyad').value.trim() : '';
            const eposta = document.getElementById('eposta') ? document.getElementById('eposta').value.trim() : '';
            const bolum = document.getElementById('bolum') ? document.getElementById('bolum').value.trim() : '';
            const sinif = document.getElementById('sinif') ? document.getElementById('sinif').value : '';
            const oturumTuru = document.getElementById('oturumTuru') ? document.getElementById('oturumTuru').value : '';
            const katilimTuru = document.getElementById('katilimTuru') ? document.getElementById('katilimTuru').value : '';
            const mesaj = document.getElementById('mesaj') ? document.getElementById('mesaj').value.trim() : '';
            const onay = document.getElementById('onay') ? document.getElementById('onay').checked : false;

            // Boş alan kontrolü
            if (!adSoyad || !eposta || !bolum || !sinif || !oturumTuru || !katilimTuru || !mesaj || !onay) {
                formUyari.classList.remove('d-none');
                return;
            }

            // Hata yoksa uyarıyı gizle
            formUyari.classList.add('d-none');

            // Başarılı durum: "Başvuru Özetiniz" kartını oluştur
            const ozetHTML = `
                <div class="card border-0 shadow-sm rounded-4 text-start">
                    <div class="card-header bg-success text-white py-3 px-4 rounded-top-4 border-0">
                        <h5 class="card-title mb-0 fw-bold"><i class="bi bi-check-circle-fill me-2"></i> Başvuru Özetiniz</h5>
                    </div>
                    <div class="card-body p-4 p-md-5">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">Ad Soyad</p>
                                <p class="fw-bold mb-0 fs-5">${adSoyad}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">E-posta</p>
                                <p class="fw-bold mb-0 fs-5">${eposta}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">Bölüm</p>
                                <p class="fw-bold mb-0 fs-5">${bolum}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">Sınıf</p>
                                <p class="fw-bold mb-0 fs-5">${sinif}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">Oturum</p>
                                <p class="fw-bold mb-0"><span class="badge bg-primary rounded-pill px-3 py-2 fs-6">${oturumTuru}</span></p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 text-secondary small fw-semibold">Katılım Türü</p>
                                <p class="fw-bold mb-0"><span class="badge bg-info text-dark rounded-pill px-3 py-2 fs-6">${katilimTuru}</span></p>
                            </div>
                            <div class="col-12 mt-4 pt-4 border-top">
                                <p class="mb-2 text-secondary small fw-semibold">Kısa Mesajınız</p>
                                <div class="p-3 rounded-3 border bg-body-tertiary">
                                    <p class="fst-italic mb-0">"${mesaj}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // sonucAlani'ni güncelle ve stil sınıfı ekle
            sonucAlani.className = 'mt-2';
            sonucAlani.style = '';
            sonucAlani.innerHTML = ozetHTML;

            // Formu temizle
            basvuruFormu.reset();
            
            // Sonucu göstermek için kaydır
            sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        basvuruFormu.addEventListener('reset', function() {
            formUyari.classList.add('d-none');
            sonucAlani.className = 'alert alert-info rounded-3 border-0 py-3 px-4 mx-auto shadow-sm';
            sonucAlani.style.maxWidth = '900px';
            sonucAlani.innerHTML = 'Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.';
        });
    }
});
