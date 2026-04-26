document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------------------------------------------------
    // 1. Ortak Navigasyon ve Lab Geçiş Sistemi
    // ---------------------------------------------------------
    const labSelector = document.getElementById('labSelector');
    
    if (labSelector) {
        labSelector.addEventListener('change', function() {
            const secilenLab = this.value;
            // Combobox değiştiğinde ilgili sayfaya yönlendir
            if (secilenLab) {
                window.location.href = `lab${secilenLab}.html`;
            }
        });
    }

    // ---------------------------------------------------------
    // 2. Koyu/Açık Tema Değiştirme
    // ---------------------------------------------------------
    const temaDegistirBtn = document.getElementById('temaDegistirBtn');
    
    if (temaDegistirBtn) {
        temaDegistirBtn.addEventListener('click', function() {
            const body = document.body;
            // Data attribute üzerinden temayı al
            const mevcutTema = body.getAttribute('data-bs-theme');
            
            // Toggle işlemi
            if (mevcutTema === 'light' || !mevcutTema) {
                body.setAttribute('data-bs-theme', 'dark');
                temaDegistirBtn.textContent = 'Açık Temaya Geç';
                temaDegistirBtn.classList.replace('btn-outline-secondary', 'btn-outline-light');
            } else {
                body.setAttribute('data-bs-theme', 'light');
                temaDegistirBtn.textContent = 'Koyu Temaya Geç';
                // Eğer sınıflar güncellendiyse geri al
                if (temaDegistirBtn.classList.contains('btn-outline-light')) {
                    temaDegistirBtn.classList.replace('btn-outline-light', 'btn-outline-secondary');
                }
            }
        });
    }

    // ---------------------------------------------------------
    // 3. Form İşleme ve Validasyon
    // ---------------------------------------------------------
    const basvuruFormu = document.getElementById('basvuruFormu');
    const formUyari = document.getElementById('formUyari');
    const sonucAlani = document.getElementById('sonucAlani');

    if (basvuruFormu) {
        basvuruFormu.addEventListener('submit', function(event) {
            // Sayfa yenilenmesini engelle
            event.preventDefault();

            // Tüm input ve select değerlerini al, güvenli çekim yap
            const adSoyad = document.getElementById('adSoyad') ? document.getElementById('adSoyad').value.trim() : '';
            const eposta = document.getElementById('eposta') ? document.getElementById('eposta').value.trim() : '';
            const oturumTuru = document.getElementById('oturumTuru') ? document.getElementById('oturumTuru').value : '';
            const mesaj = document.getElementById('mesaj') ? document.getElementById('mesaj').value.trim() : '';

            // Boş alan kontrolü
            if (!adSoyad || !eposta || !oturumTuru || !mesaj) {
                formUyari.classList.remove('d-none');
                return;
            }

            // Hata yoksa uyarıyı gizle
            formUyari.classList.add('d-none');

            // Başarılı durum: "Başvuru Özetiniz" kartını oluştur
            const ozetHTML = `
                <div class="card border-success shadow text-start">
                    <div class="card-header bg-success text-white py-3">
                        <h4 class="card-title mb-0"><i class="bi bi-check-circle"></i> Başvuru Özetiniz</h4>
                    </div>
                    <div class="card-body p-4">
                        <div class="row mb-2">
                            <div class="col-sm-4 fw-bold">Ad Soyad:</div>
                            <div class="col-sm-8 text-primary">${adSoyad}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm-4 fw-bold">E-posta:</div>
                            <div class="col-sm-8">${eposta}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm-4 fw-bold">Oturum:</div>
                            <div class="col-sm-8"><span class="badge bg-info text-dark">${oturumTuru}</span></div>
                        </div>
                        <div class="row mb-0 mt-3 pt-3 border-top">
                            <div class="col-12 fw-bold mb-2">Mesajınız:</div>
                            <div class="col-12 text-muted">"${mesaj}"</div>
                        </div>
                    </div>
                    <div class="card-footer text-center py-3 bg-light">
                        <small class="text-success fw-bold">Başvurunuz başarıyla kaydedilmiştir.</small>
                    </div>
                </div>
            `;

            // sonucAlani'ni güncelle ve stil sınıfı ekle
            sonucAlani.className = 'mt-4';
            sonucAlani.innerHTML = ozetHTML;

            // Formu temizle
            basvuruFormu.reset();
            
            // Sonucu göstermek için kaydır
            sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});
