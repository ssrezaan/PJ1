# QuickTube MP4 Lab (Netlify Ready)

เว็บสำหรับสร้างลิงก์ดาวน์โหลด MP4 จาก YouTube แบบรวดเร็ว พร้อมตั้งชื่อไฟล์อัตโนมัติรูปแบบ:

`ชื่อเพลง(ศิลปิน).mp4`

ตัวอย่าง: `คืนจันทร์(LOSO).mp4`

## โครงสร้างโปรเจกต์

- `public/` หน้าเว็บทั้งหมด (HTML/CSS/JS)
- `netlify/functions/download.js` API สำหรับดึงลิงก์ MP4
- `netlify.toml` ตั้งค่า build, publish, functions, และ redirect `/api/*`

## รันทดสอบในเครื่อง

```bash
npm install
npx netlify dev
```

จากนั้นเปิด `http://localhost:8888`

## Deploy ผ่าน app.netlify.com

1. Push โปรเจกต์นี้ขึ้น GitHub/GitLab/Bitbucket
2. เข้า `https://app.netlify.com`
3. กด `Add new site` แล้วเลือก `Import an existing project`
4. เลือก repository ของโปรเจกต์นี้
5. กด `Deploy site` ได้ทันที (ระบบจะอ่านค่าใน `netlify.toml` อัตโนมัติ)

ค่าที่ใช้ deploy ถูกตั้งไว้แล้ว:

- Build command: `npm run build`
- Publish directory: `public`
- Functions directory: `netlify/functions`
- Node version: `20`

## หมายเหตุสำคัญ

- ลิงก์ดาวน์โหลดจาก YouTube มีเวลาหมดอายุ ควรกดดาวน์โหลดทันที
- บางวิดีโออาจไม่มี stream MP4 ที่มีทั้งภาพและเสียง
- ใช้งานเฉพาะเนื้อหาที่คุณมีสิทธิ์ดาวน์โหลดเท่านั้น