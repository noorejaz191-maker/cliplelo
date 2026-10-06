import axios from "axios";
import * as cheerio from "cheerio";
import { FacebookResponse } from "@/types";

const SNAPSAVE_URL = "https://snapsave.app/facebook-reels-download";
const SNAPSAVE_ACTION = "https://snapsave.app/action.php?lang=en";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
  Referer: "https://snapsave.app/facebook-reels-download",
  Origin: "https://snapsave.app",
};

export async function scrapeFacebook(url: string): Promise<FacebookResponse> {
  try {
    const pageResponse = await axios.get(SNAPSAVE_URL, {
      headers: HEADERS,
      timeout: 30000,
    });

    const $ = cheerio.load(pageResponse.data);
    const form = $('form[name="formurl"]');
    const hiddenInputs: Record<string, string> = {};

    form.find('input[type="hidden"]').each((_, el) => {
      const name = $(el).attr("name");
      const value = $(el).attr("value") || "";
      if (name) hiddenInputs[name] = value;
    });

    const formParams = new URLSearchParams();
    formParams.append("url", url);
    for (const [key, value] of Object.entries(hiddenInputs)) {
      if (key !== "url") {
        formParams.append(key, value);
      }
    }

    const actionResponse = await axios.post(SNAPSAVE_ACTION, formParams.toString(), {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 30000,
      responseType: "text",
      transformResponse: [(data) => data],
    });

    const responseText = actionResponse.data as string;

    const videoUrl = extractVideoUrl(responseText);

    if (!videoUrl) {
      return { success: false, error: "No video link found." };
    }

    return {
      success: true,
      video_url: videoUrl,
      title: "Facebook Video",
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "SnapSave scrape failed",
      detail: error.message,
    };
  }
}

function extractVideoUrl(htmlOrJs: string): string | null {
  const patterns = [
    /href=["']([^"']*\.mp4[^"']*)["']/gi,
    /href=["']([^"']*download[^"']*)["']/gi,
    /href=["']([^"']*video[^"']*)["']/gi,
    /src=["']([^"']*\.mp4[^"']*)["']/gi,
    /"downloadUrl"\s*:\s*"([^"]+)"/gi,
    /download_url["']\s*:\s*["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(htmlOrJs);
    if (match && match[1]) {
      const url = match[1].replace(/\\u0026/g, "&").replace(/\\x26/g, "&");
      if (url.startsWith("http") || url.startsWith("//")) {
        return url.startsWith("//") ? `https:${url}` : url;
      }
    }
  }

  try {
    const $ = cheerio.load(htmlOrJs);
    const link =
      $(".button.is-success.is-small").attr("href") ||
      $(".button.is-success").attr("href") ||
      $("a[download]").attr("href") ||
      $('a[href*=".mp4"]').attr("href");

    if (link) {
      return link.startsWith("//") ? `https:${link}` : link;
    }
  } catch {
  }

  return null;
}
