🚀 QuickTube MP4 Lab

![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?logo=netlify)
![Node](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

⚡ **QuickTube MP4 Lab** คือเว็บแอปสำหรับสร้าง **ลิงก์ดาวน์โหลด MP4 จาก YouTube อย่างรวดเร็ว**
พร้อมระบบ **ตั้งชื่อไฟล์อัตโนมัติ**

```
ชื่อเพลง(ศิลปิน).mp4
```

ตัวอย่าง

```
คืนจันทร์(LOSO).mp4
```

ออกแบบมาให้ **Deploy บน Netlify ได้ทันที**

---

# ✨ Features

✔ ดาวน์โหลดวิดีโอ YouTube เป็น **MP4**
✔ ตั้งชื่อไฟล์ **อัตโนมัติ**
✔ ทำงานผ่าน **Serverless Function (Netlify)**
✔ อินเตอร์เฟซ **รวดเร็วและเบา**
✔ Deploy ได้ใน **1 คลิก**

---

# 🖥 Preview

ตัวอย่างหน้าเว็บ

```
YouTube URL
↓
Generate Download Link
↓
Download MP4
```

*(สามารถเพิ่ม screenshot ในโฟลเดอร์ `public` ได้)*

---

# 📂 Project Structure

```
QuickTube-MP4-Lab
│
├─ public/
│   ├─ index.html
│   ├─ style.css
│   └─ script.js
│
├─ netlify/
│   └─ functions/
│       └─ download.js
│
├─ package.json
├─ netlify.toml
└─ README.md
```

---

# ⚙️ Run Locally

ติดตั้ง dependencies

```bash
npm install
```

รัน Netlify dev

```bash
npx netlify dev
```

เปิดเว็บ

```
http://localhost:8888
```

---

# ☁️ Deploy to Netlify

1️⃣ Push โปรเจกต์ขึ้น **GitHub / GitLab / Bitbucket**

2️⃣ เข้า

```
https://app.netlify.com
```

3️⃣ เลือก

```
Add new site → Import an existing project
```

4️⃣ เลือก repository

5️⃣ กด

```
Deploy site
```

Netlify จะอ่านค่าจาก `netlify.toml` อัตโนมัติ

---

# 🔧 Deployment Config

```
Build command:
npm run build
```

```
Publish directory:
public
```

```
Functions directory:
netlify/functions
```

```
Node version:
20
```

---

# ⚠ Important Notes

* ลิงก์ดาวน์โหลดจาก YouTube **มีเวลาหมดอายุ**
* บางวิดีโออาจไม่มี **MP4 stream ที่มีทั้งภาพและเสียง**
* ใช้งานเฉพาะ **เนื้อหาที่คุณมีสิทธิ์ดาวน์โหลด**

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Made by Diamond 

