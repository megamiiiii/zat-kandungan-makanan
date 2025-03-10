function diagnosa() {
    let gejalaTerpilih = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
        gejalaTerpilih.push(input.value);
    });

    let hasilDiagnosa = backwardChaining(gejalaTerpilih);
    localStorage.setItem("hasilDiagnosa", hasilDiagnosa);
    window.location.href = "jhasil.html";
}

function backwardChaining(gejala) {
    let rules = [
        { kondisi: ["C1", "C2", "C3", "C4", "C5"], hasil: "Boraks" },
        { kondisi: ["C5", "C6", "C7", "C8"], hasil: "Formalin" },
        { kondisi: ["C13", "C14", "C15", "C18"], hasil: "Rhodamin B" },
        { kondisi: ["C14", "C16", "C17", "C18"], hasil: "Metanil Yellow" }
    ];

    for (let rule of rules) {
        if (rule.kondisi.every(k => gejala.includes(k))) {
            return `⚠️ Makanan ini kemungkinan mengandung zat berbahaya: ${rule.hasil}`;
        }
    }
    
    return "✅ Tidak ditemukan indikasi zat berbahaya berdasarkan gejala yang dipilih.";
}
