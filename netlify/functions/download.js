const ytdl = require("@distube/ytdl-core");

const INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/g;

function sanitizeNamePart(text) {
  const normalized = String(text || "Unknown")
    .replace(INVALID_FILENAME_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.+$/, "");
  return normalized || "Unknown";
}

function pickBestMp4(formats) {
  const candidates = formats.filter(
    (format) =>
      format.container === "mp4" &&
      format.hasVideo &&
      format.hasAudio &&
      Boolean(format.url)
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((a, b) => {
    const byHeight = (b.height || 0) - (a.height || 0);
    if (byHeight !== 0) {
      return byHeight;
    }
    return (b.bitrate || 0) - (a.bitrate || 0);
  })[0];
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(payload)
  };
}

function getExpiryTime(streamUrl) {
  try {
    const value = new URL(streamUrl).searchParams.get("expire");
    if (!value) {
      return null;
    }
    const ms = Number(value) * 1000;
    if (!Number.isFinite(ms)) {
      return null;
    }
    return new Date(ms).toISOString();
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        Allow: "GET,OPTIONS"
      }
    };
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const rawUrl = event.queryStringParameters?.url?.trim();
  if (!rawUrl) {
    return json(400, { error: "Missing YouTube URL" });
  }

  if (!ytdl.validateURL(rawUrl)) {
    return json(400, { error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(rawUrl);
    const media = info.videoDetails?.media || {};
    const track = media.song || info.videoDetails?.title || "Unknown";
    const artist = media.artist || info.videoDetails?.author?.name || "Unknown";
    const fileName = `${sanitizeNamePart(track)}(${sanitizeNamePart(artist)}).mp4`;

    const bestFormat = pickBestMp4(info.formats);
    if (!bestFormat) {
      return json(404, { error: "No MP4 stream found" });
    }

    return json(200, {
      fileName,
      streamUrl: bestFormat.url,
      quality: bestFormat.qualityLabel || `${bestFormat.height || "?"}p`,
      expiresAt: getExpiryTime(bestFormat.url)
    });
  } catch (error) {
    return json(500, {
      error: "Unable to process this video right now",
      detail: String(error?.message || error)
    });
  }
};
