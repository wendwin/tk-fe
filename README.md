# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# Monitoring Perkembangan Anak - Frontend

Frontend aplikasi **Sistem Monitoring Perkembangan Anak** berbasis web yang dikembangkan menggunakan **Vue.js**. Aplikasi ini menyediakan antarmuka pengguna untuk proses pendaftaran murid baru, pengelolaan data siswa, observasi perkembangan anak, monitoring jurnal perkembangan, dan fitur pendukung lainnya.

## Tech Stack

- Vue.js 3
- Vite
- JavaScript
- Tailwind CSS
- Vue Router
- Pinia

---

## Requirements

Pastikan telah menginstal:

- Node.js 18 atau lebih baru
- npm

---

## Installation

### 1. Install Dependencies

Jalankan perintah berikut pada folder project:

```bash
npm install
```

---

## Environment Configuration

Copy file `.env.example` menjadi `.env`.

Linux / macOS:

```bash
cp .env.example .env
```

Windows CMD:

```cmd
copy .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Kemudian sesuaikan konfigurasi pada file `.env`.

Contoh:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Run Development Server

Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

Frontend akan berjalan pada:

```
http://localhost:5173
```

---

## Build Production

Untuk membuat build aplikasi:

```bash
npm run build
```

Hasil build akan tersedia pada folder:

```
dist/
```

---

## Preview Production Build

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

---

## Main Features

- User Authentication
- Role Based Access Control (RBAC)
- New Student Registration (PPDB)
- Student Management
- Teacher Management
- Parent Portal
- School Year Management
- Student Observation
- Weekly Development Monitoring
- File Upload
- Responsive Dashboard
- REST API Integration

---

## API Configuration

Frontend menggunakan REST API dari backend Flask.

Default API URL:

```
http://localhost:5000/api
```

Konfigurasi API dapat diubah melalui:

```
.env
```

---

## License

This project is developed for educational purposes.
