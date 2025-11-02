# MiTunesX — Music iTunes Xplorer

**UTS Pemrograman Web | Varasina Farmadani (123140107)**
[Demo Online (Vercel)](https://uts-pemweb-123140107-2maqe18bw-sinavarasinas-projects.vercel.app)
[Repository GitHub](https://github.com/sinavarasina/uts-pemweb-123140107)

---

## Deskripsi Aplikasi

**MiTunesX** adalah aplikasi web berbasis **React + Vite** yang memanfaatkan **iTunes Search API** untuk menelusuri, memutar, dan mengelola musik secara real-time.
Fitur-fiturnya mencakup pencarian musik global, filter dinamis, playlist lokal (melalui LocalStorage), dan mini-player dengan seekbar interaktif.
Aplikasi ini dibuat sebagai implementasi praktis konsep:

* Komponen dinamis dan *reusable*
* Event-driven state management dengan React Context API
* Integrasi API eksternal (REST API dengan Axios)
* Persistensi data lokal (Client Storage)

---

## Fitur Utama

* **Pencarian Musik Global** menggunakan iTunes API
* **Filter Pencarian Dinamis** (country, media type, entity, limit, explicit)
* **Pemutar Musik Mini** dengan seekbar real-time
* **Manajemen Playlist Lokal** (tambah, hapus, clear semua)
* **Sorting Musik** berdasarkan judul, harga, atau tanggal rilis
* **Detail Track Lengkap** (genre, durasi, negara, link Apple Music)
* **UI Tematik Hatsune Miku Palette** (#373b3e, #86cecb, #e12885, dll)
* Persistensi state pencarian menggunakan SessionStorage
* Shortcut keyboard (/ untuk fokus search, Esc untuk blur)

---

## Struktur Proyek

```
src/
 ├── api/                 # Modul komunikasi API (axios + iTunes)
 ├── app/                 # Routing & layout utama (React Router)
 │   ├── layout/          # Header, Sidebar, Footer, Layout
 │   └── routes/          # Halaman Home, Playlist, About
 ├── components/          # Komponen UI: MusicList, FilterModal
 ├── core/                # Hooks & Context (state management)
 │   ├── hooks/           # usePlaylist, useFetch, useKeymap
 │   ├── context/         # PlayerContext (audio player global)
 │   └── storage/         # PlaylistStorage (localStorage)
 ├── styles/              # index.css (tema warna & animasi)
 └── main.jsx             # Entry point aplikasi
```

---

## Teknologi yang Digunakan

| Kategori           | Teknologi                               |
| :----------------- | :-------------------------------------- |
| Framework Frontend | React 19 + Vite 7                       |
| Routing            | React Router v7                         |
| State Management   | React Context API + Custom Hooks        |
| HTTP Client        | Axios (fetcher instance)                |
| Styling            | CSS Vanilla (custom Hatsune Miku theme) |
| Storage            | LocalStorage & SessionStorage           |
| Deployment         | Vercel (Serverless Build)               |

---

## Cara Menjalankan Proyek (Lokal)

1. **Clone repository**

   ```bash
   git clone https://github.com/sinavarasina/uts-pemweb-123140107.git
   cd uts-pemweb-123140107
   ```

2. **Instal dependensi**

   ```bash
   npm install
   ```

3. **Jalankan mode pengembangan**

   ```bash
   npm run dev
   ```

   Buka [`http://localhost:5173`](http://localhost:5173) di browser.

4. **Build untuk produksi**

   ```bash
   npm run build
   npm run preview
   ```

---

## Deploy di Vercel

Proyek ini dideploy otomatis melalui Vercel setiap push ke branch `main`.

**Konfigurasi Vercel (yaml/json setara):**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

URL produksi: [https://uts-pemweb-123140107-2maqe18bw-sinavarasinas-projects.vercel.app](https://uts-pemweb-123140107-2maqe18bw-sinavarasinas-projects.vercel.app)

---

## Penjelasan Modul Utama

* `fetcher.js` – Instans Axios dengan timeout dan interceptor error.
* `itunes.js` – Wrapper fungsi `searchItunes()` untuk query iTunes API.
* `usePlaylist()` – Hook custom untuk sinkronisasi playlist lokal + memoisasi.
* `PlayerContext.jsx` – Global audio controller (play, pause, seek, progress).
* `MusicList.jsx` – Komponen utama daftar musik (dengan sort, detail modal).
* `FilterModal.jsx` – Dialog pengaturan parameter pencarian.
* `Layout.jsx` – Grid utama (aside, header, main, footer) dengan sidebar vertikal.

---

## Konsep Pemrograman Web yang Diterapkan

* **SPA (Single Page Application)** dengan routing tanpa reload.
* **State global terdistribusi** melalui React Context dan Custom Events.
* **Pengelolaan data asinkron** via Promise dan custom hook `useFetch`.
* **Form validation langsung** di `Header.jsx` untuk pencarian.
* **Reaktivitas real-time** saat playlist diubah atau storage disinkronkan.

---

## Screenshoot
### UI
![Home](https://raw.githubusercontent.com/sinavarasina/uts-pemweb-123140107/refs/heads/main/screenshoots/Screenshot_2025-11-02_23-53-59.png)
![Playlist](https://raw.githubusercontent.com/sinavarasina/uts-pemweb-123140107/refs/heads/main/screenshoots/Screenshot_2025-11-02_23-54-15.png)
![About](https://raw.githubusercontent.com/sinavarasina/uts-pemweb-123140107/refs/heads/main/screenshoots/Screenshot_2025-11-02_23-54-19.png)
### Features
![Filter](https://raw.githubusercontent.com/sinavarasina/uts-pemweb-123140107/refs/heads/main/screenshoots/Screenshot_2025-11-02_23-54-03.png)

---

## Pengembang

**Varasina Farmadani - 123140107**
Program Studi Teknik Informatika — Institut Teknologi Sumatera
Tahun 2025

