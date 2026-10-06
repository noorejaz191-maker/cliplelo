import axios from "axios";
import * as cheerio from "cheerio";
import { InstagramResponse } from "@/types";

const SNAPSAVE_URL = "https://snapsave.app/download-video-instagram";
const SNAPSAVE_ACTION = "https://snapsave.app/action.php?lang=en";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
  Referer: "https://snapsave.app/download-video-instagram",
  Origin: "https://snapsave.app",
  "X-Requested-With": "XMLHttpRequest",
};

export async function scrapeInstagram(
  url: string
): Promise<InstagramResponse> {
  try {
    const pageResponse = await axios.get(SNAPSAVE_URL, {
      headers: HEADERS,
      timeout: 30000,
    });

    const $page = cheerio.load(pageResponse.data);
    const form = $page('form[name="formurl"]');
    const hiddenInputs: Record<string, string> = {};

    form.find('input[type="hidden"]').each((_, el) => {
      const name = $page(el).attr("name");
      const value = $page(el).attr("value") || "";
      if (name) hiddenInputs[name] = value;
    });

    const formParams = new URLSearchParams();
    formParams.append("url", url);
    for (const [key, value] of Object.entries(hiddenInputs)) {
      if (key !== "url") {
        formParams.append(key, value);
      }
    }

    const actionResponse = await axios.post(
      SNAPSAVE_ACTION,
      formParams.toString(),
      {
        headers: {
          ...HEADERS,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000,
        responseType: "text",
        transformResponse: [(data) => data],
      }
    );

    const responseText = actionResponse.data as string;

    const videoUrl = extractInstagramVideo(responseText);

    if (!videoUrl) {
      return { success: false, error: "Failed to find download link." };
    }

    return {
      success: true,
      video_url: videoUrl,
      title: "Instagram Media",
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "Instagram scrape failed",
      detail: error.message,
    };
  }
}

function extractInstagramVideo(response: string): string | null {
  try {
    const $ = cheerio.load(response);

    const selectors = [
      ".button.is-success",
      ".button.is-small",
      "a[href*='.mp4']",
      "a[href*='video']",
      "a[href*='download']",
      "a[download]",
      ".download-btn a",
      ".media-box a",
    ];

    for (const selector of selectors) {
      const link = $(selector).attr("href");
      if (link) {
        return link.startsWith("//") ? `https:${link}` : link;
      }
    }

    const allLinks = $("a")
      .map((_, el) => $(el).attr("href") || "")
      .get();

    for (const link of allLinks) {
      if (
        link &&
        (link.includes(".mp4") ||
          link.includes("video") ||
          link.includes("cdninstagram"))
      ) {
        return link.startsWith("//") ? `https:${link}` : link;
      }
    }
  } catch (e) {
  }

  const patterns = [
    /href=["']([^"']*\.mp4[^"']*)["']/gi,
    /"downloadUrl"\s*:\s*"([^"]+)"/gi,
    /download_url["']\s*:\s*["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(response);
    if (match && match[1]) {
      const url = match[1].replace(/\\u0026/g, "&").replace(/\\x26/g, "&");
      if (url.startsWith("http") || url.startsWith("//")) {
        return url.startsWith("//") ? `https:${url}` : url;
      }
    }
  }

  return null;
}
