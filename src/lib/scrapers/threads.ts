import axios from "axios";
import * as cheerio from "cheerio";
import { ThreadsResponse } from "@/types";

const SNAPSAVE_API = "https://threads.snapsave.app/api/action";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  Referer: "https://threads.snapsave.app/",
  Origin: "https://threads.snapsave.app",
};

interface SnapSaveThreadsItem {
  id: string;
  thumbnail: string;
  title?: string;
  type: "video" | "photo";
  downloadUrl: string;
}

interface SnapSaveThreadsResponse {
  status_code: number;
  postinfo: {
    avatar_url: string;
    username: string;
    media_title: string;
  };
  items: SnapSaveThreadsItem[];
}

export async function scrapeThreads(url: string): Promise<ThreadsResponse> {
  try {
    const response = await axios.get(SNAPSAVE_API, {
      params: { url },
      headers: HEADERS,
      timeout: 30000,
    });

    const data = response.data as SnapSaveThreadsResponse;

    if (data.status_code !== 0 || !data.items || data.items.length === 0) {
      return { success: false, error: "No video link found." };
    }

    const videoItem = data.items.find((item) => item.type === "video");
    const firstItem = videoItem || data.items[0];

    if (!firstItem || !firstItem.downloadUrl) {
      return { success: false, error: "No video link found." };
    }

    return {
      success: true,
      video_url: firstItem.downloadUrl,
      title: data.postinfo?.media_title || "Threads Video",
      thumbnail: firstItem.thumbnail || undefined,
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "Threads scrape failed",
      detail: error.message,
    };
  }
}
