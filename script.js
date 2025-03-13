const pertanyaanList = [
    { kode: "C1", teks: "Apakah makanan bertekstur kenyal?" },
    { kode: "C2", teks: "Apakah makanan tidak mudah lengket?" },
    { kode: "C3", teks: "Apakah makanan berwarna mencolok?" },
    { kode: "C4", teks: "Apakah makanan beraroma mencurigakan?" },
    { kode: "C5", teks: "Apakah makanan tidak rusak dalam 3 hari di luar kulkas?" },
    { kode: "C6", teks: "Apakah makanan tidak rusak dalam 15 hari di kulkas?" },
    { kode: "C7", teks: "Apakah makanan memiliki bau menyengat?" },
    { kode: "C8", teks: "Apakah mi berwarna mengkilap, tidak lengket, dan tidak mudah putus?" },
    { kode: "C9", teks: "Apakah tahu bertekstur lebih keras dan kenyal?" },
    { kode: "C10", teks: "Apakah ayam bertekstur padat dan lebih keras dibanding ayam biasanya?" },
    { kode: "C11", teks: "Apakah insang ikan berwarna merah tua?" },
    { kode: "C12", teks: "Apakah daging berwarna putih pucat?" },
    { kode: "C13", teks: "Apakah makanan berwarna merah cerah dan mencolok?" },
    { kode: "C14", teks: "Apakah warna makanan tidak merata atau ada gumpalan warna?" },
    { kode: "C15", teks: "Apakah makanan terasa lebih pahit?" },
    { kode: "C16", teks: "Apakah tenggorokan terasa gatal setelah memakan makanan ini?" },
    { kode: "C17", teks: "Apakah makanan memiliki warna kuning mencolok?" },
    { kode: "C18", teks: "Apakah makanan meninggalkan bekas warna?" }
];

const rules = [
    { kode: "K1", kondisi: ["C1", "C2", "C3", "C4", "C5"], hasil: "⚠️ Makanan kemungkinan mengandung **Boraks**." },
    { kode: "K2", kondisi: ["C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"], hasil: "⚠️ Makanan kemungkinan mengandung **Formalin**." },
    { kode: "K3", kondisi: ["C13", "C14", "C15", "C18"], hasil: "⚠️ Makanan kemungkinan mengandung **Rhodamin B**." },
    { kode: "K4", kondisi: ["C14", "C16", "C17", "C18"], hasil: "⚠️ Makanan kemungkinan mengandung **Metanil Yellow**." }
];

let jawaban = [];
let indexPertanyaan = 0;

function tampilkanPertanyaan() {
    if (indexPertanyaan < pertanyaanList.length) {
        document.getElementById("pertanyaan").innerText = pertanyaanList[indexPertanyaan].teks;
        updateProgress();
    } else {
        diagnosa();
    }
}

function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    let progress = ((indexPertanyaan + 1) / pertanyaanList.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.innerText = `${Math.round(progress)}%`;
    progressText.innerText = `Pertanyaan ${indexPertanyaan + 1} dari ${pertanyaanList.length}`;
}

function jawab(respon) {
    if (respon === "ya") {
        jawaban.push(pertanyaanList[indexPertanyaan].kode);
    }
    indexPertanyaan++;
    tampilkanPertanyaan();
}

function diagnosa() {
    let hasilDiagnosa = "✅ Tidak ditemukan indikasi zat berbahaya.";

    rules.forEach(rule => {
        if (rule.kondisi.every(kondisi => jawaban.includes(kondisi))) {
            hasilDiagnosa = rule.hasil;
        }
    });

    localStorage.setItem("hasilDiagnosa", hasilDiagnosa);
    window.location.href = "jhasil.html";
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

// Mulai tampilan pertanyaan jika di halaman deteksi
if (window.location.pathname.includes("jdeteksi.html")) {
    tampilkanPertanyaan();
}
