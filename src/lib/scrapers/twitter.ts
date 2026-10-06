import axios from "axios";
import * as cheerio from "cheerio";
import { TwitterResponse, QualityOption } from "@/types";

const SNAPSAVE_ACTION = "https://twitterdownloader.snapsave.app/action.php";
const SNAPSAVE_HOME = "https://twitterdownloader.snapsave.app/en2";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
  Referer: "https://twitterdownloader.snapsive.app/en2",
  Origin: "https://twitterdownloader.snapsave.app",
  "X-Requested-With": "XMLHttpRequest",
};

export async function scrapeTwitter(url: string): Promise<TwitterResponse> {
  try {
    const pageResponse = await axios.get(SNAPSAVE_HOME, {
      headers: HEADERS,
      timeout: 30000,
    });

    const $page = cheerio.load(pageResponse.data);
    const token = $page('input[name="token"]').attr("value") || "";

    const formParams = new URLSearchParams();
    formParams.append("url", url);
    if (token) formParams.append("token", token);

    const actionResponse = await axios.post(SNAPSAVE_ACTION, formParams.toString(), {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 30000,
    });

    const data = actionResponse.data;

    if (data.error) {
      return { success: false, error: data.message || "No download links found" };
    }

    const htmlData = data.data as string;
    const $ = cheerio.load(htmlData);

    const links: QualityOption[] = [];

    $('a').each((_, el) => {
      const href = $(el).attr("href") || "";
      const quality = ($(el).text() || "").trim();

      if (href && quality && (href.includes("rapidcdn.app") || href.includes("download"))) {
        links.push({ quality, url: href });
      }
    });

    if (links.length === 0) {
      $('a[href*=".mp4"], a[href*="video"]').each((_, el) => {
        const href = $(el).attr("href") || "";
        const quality = ($(el).text() || "").trim() || "Video";
        if (href) links.push({ quality, url: href });
      });
    }

    if (links.length === 0) {
      return { success: false, error: "No download links found" };
    }

    const hdVideo =
      links.find((l) => /hd|720|1080/i.test(l.quality)) || links[0];

    const thumbnail =
      $('img[alt]').attr("src") ||
      $('img').first().attr("src") ||
      null;

    const title =
      $('h1').first().text().trim() ||
      $('h1[itemprop="name"]').text().trim() ||
      "Twitter Video";

    return {
      success: true,
      video_url: hdVideo.url,
      title,
      thumbnail: thumbnail ?? undefined,
      quality: hdVideo.quality,
      available_qualities: links,
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "Failed to get Twitter video",
      detail: error.message,
    };
  }
}
