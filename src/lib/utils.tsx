import { Platform, PlatformInfo } from "@/types";

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg className="h-7 w-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
      </svg>
    ),
    color: "#000000",
    description: "Download videos & photo slides without watermark",
    domains: ["tiktok.com", "vm.tiktok.com", "vt.tiktok.com"],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg className="h-7 w-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "#1877F2",
    description: "Download reels & videos",
    domains: ["facebook.com", "fb.com", "fb.watch"],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="h-7 w-7 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: "#E4405F",
    description: "Download reels, stories & feed",
    domains: ["instagram.com", "instagr.am"],
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: (
      <svg className="h-7 w-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "#1DA1F2",
    description: "Download videos from Twitter/X",
    domains: ["twitter.com", "x.com", "t.co"],
  },
  {
    id: "threads",
    name: "Threads",
    icon: (
      <svg className="h-7 w-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.227-.02 4.274-.567 5.928-1.58 1.515-.928 2.67-2.27 3.434-3.99.765-1.72 1.15-3.72 1.15-5.957V9.5h2v.854c0 2.53-.44 4.78-1.31 6.71-.87 1.93-2.15 3.46-3.81 4.55-1.66 1.09-3.78 1.66-6.29 1.68h-.11z"/>
      </svg>
    ),
    color: "#000000",
    description: "Download videos from Threads",
    domains: ["threads.net"],
  },
];

export function detectPlatform(url: string): Platform | null {
  if (!url) return null;
  const lowerUrl = url.toLowerCase();

  for (const platform of PLATFORMS) {
    for (const domain of platform.domains) {
      if (lowerUrl.includes(domain)) {
        return platform.id;
      }
    }
  }
  return null;
}

export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
