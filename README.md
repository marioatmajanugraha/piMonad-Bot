# PiMonad-Bot 🚀

Script ini digunakan untuk mengotomatiskan klaim poin di airdrop Pi Monad secara efisien dan mudah! 🎮

![photo_2025-05-06_18-55-08](https://github.com/user-attachments/assets/01e75ee2-1a95-4d67-9fe9-b8fb7f1f6c11)

---

## 📌 Fitur
- ✅ **Auto Claim**: Klaim poin otomatis untuk semua akun di `accounts.txt`.
- 🔌 **Dukungan Proxy**: Opsional gunakan proxy dari `proxy.txt` (`http://`, `socks4://`, `socks5://`).
- ⏰ **Timer Siklus**: Jalankan klaim setiap 1 jam dengan tampilan countdown yang keren.
- 🎨 **Tampilan Konsol Menarik**: Menggunakan `cfonts` dan `chalk` dengan emoji untuk pengalaman visual yang seru. 🚀
- 🛡️ **Penanganan Error**: Log detail untuk error HTTP 422 dan validasi username.
- 📋 **Konfigurasi Mudah**: Hanya perlu `accounts.txt` dan opsional `proxy.txt`.

---

## 🚀 Cara Penggunaan

1. **Clone Repository**
   ```sh
   git clone https://github.com/marioatmajanugraha/piMonad-Bot.git
   cd piMonad-Bot
   ```

2. **Install Dependencies**
   ```sh
   npm install axios chalk@4 cfonts http-proxy-agent socks-proxy-agent readline-sync
   ```

3. **Siapkan File**
   - Buat file `accounts.txt` dan isi dengan username, satu per baris. Contoh:
     ```
     contohusername
     anotherusername
     ```
   - (Opsional) Buat `proxy.txt` jika ingin menggunakan proxy. Contoh:
     ```
     http://username:password@host:port
     socks5://username:password@host:port
     ```

4. **Jalankan Script**
   ```sh
   node claim.js
   ```

5. **Ikuti Instruksi**
   - Jawab prompt apakah ingin menggunakan proxy (`y/n`).
   - Script akan berjalan otomatis, menampilkan status klaim dan timer siklus. ✨

---

## ⚠️ Disclaimer
Gunakan script ini dengan bijak dan sesuai aturan Pi Monad. Developer tidak bertanggung jawab atas penyalahgunaan atau banned akun.

---

## 🤝 Kontribusi
Ingin menambahkan fitur atau perbaikan? Silakan fork repo ini dan ajukan pull request! Kami terbuka untuk ide baru. 💡

---

## 📞 Kontak
Ada pertanyaan? Hubungi: [@balveerxyz](https://t.me/balveerxyz)  
Join channel Telegram gratis: [t.me/airdroplocked](https://t.me/airdroplocked)
