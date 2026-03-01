const form = document.getElementById("download-form");
const urlInput = document.getElementById("url-input");
const submitBtn = document.getElementById("submit-btn");
const resultBox = document.getElementById("result");
const resultText = document.getElementById("result-text");
const resultMeta = document.getElementById("result-meta");
const defaultButtonMarkup = submitBtn.innerHTML;

function showResult(type, text, meta = "") {
  resultBox.classList.remove("hidden", "success", "error");
  resultBox.classList.add(type);
  resultText.textContent = text;
  resultMeta.textContent = meta;
  resultMeta.classList.toggle("hidden", !meta);
}

function hideResult() {
  resultBox.classList.add("hidden");
  resultBox.classList.remove("success", "error");
  resultText.textContent = "";
  resultMeta.textContent = "";
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.setAttribute("aria-busy", String(isLoading));
  submitBtn.innerHTML = isLoading
    ? '<span class="btn-title">กำลังเตรียมลิงก์...</span><span class="btn-sub">รอสักครู่</span>'
    : defaultButtonMarkup;
}

function triggerDownload(streamUrl, fileName) {
  const anchor = document.createElement("a");
  anchor.href = streamUrl;
  anchor.download = fileName;
  anchor.target = "_blank";
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function looksLikeYouTubeUrl(value) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    return host.includes("youtube.com") || host.includes("youtu.be");
  } catch {
    return false;
  }
}

function formatDate(isoString) {
  if (!isoString) {
    return "ไม่ระบุเวลา";
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "ไม่ระบุเวลา";
  }

  return date.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

async function submitDownload(url) {
  const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || payload.detail || "ไม่สามารถสร้างลิงก์ดาวน์โหลดได้");
  }

  return payload;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = urlInput.value.trim();

  if (!url) {
    showResult("error", "กรุณาใส่ลิงก์ YouTube ก่อน");
    return;
  }

  if (!looksLikeYouTubeUrl(url)) {
    showResult("error", "ลิงก์นี้ไม่ใช่ YouTube URL", "ตัวอย่างที่ถูกต้อง: https://www.youtube.com/watch?v=...");
    return;
  }

  setLoading(true);
  hideResult();

  try {
    const payload = await submitDownload(url);
    const details = [
      `ชื่อไฟล์: ${payload.fileName}`,
      `คุณภาพ: ${payload.quality || "Auto"}`,
      `ลิงก์หมดอายุ: ${formatDate(payload.expiresAt)}`
    ].join(" | ");

    showResult("success", "พร้อมแล้ว กำลังเริ่มดาวน์โหลด...", details);
    triggerDownload(payload.streamUrl, payload.fileName);
  } catch (error) {
    showResult(
      "error",
      String(error?.message || error),
      "ถ้าคลิปยาวมากหรือมีข้อจำกัด ให้ลองใหม่อีกครั้งหรือเปลี่ยนเป็นคลิปอื่น"
    );
  } finally {
    setLoading(false);
  }
});