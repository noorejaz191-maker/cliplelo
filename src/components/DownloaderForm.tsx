"use client";

import { useState, useCallback } from "react";
import { Platform, TikTokResponse, VideoResponse } from "@/types";
import { PLATFORMS, detectPlatform, isValidUrl } from "@/lib/utils";
import PlatformCard from "./PlatformCard";
import LoadingSpinner from "./LoadingSpinner";
import DownloadResult from "./DownloadResult";

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<
    (TikTokResponse | VideoResponse) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
    const detected = detectPlatform(value);
    if (detected) {
      setSelectedPlatform(detected);
    }
    setResult(null);
    setError(null);
  }, []);

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a URL first");
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError("Invalid URL. Make sure URL starts with http:// or https://");
      return;
    }

    const platform = selectedPlatform || detectPlatform(url);
    if (!platform) {
      setError(
        "Platform not recognized. Please enter a URL from TikTok, Facebook, Instagram, Twitter/X, or Threads."
      );
      return;
    }

    setSelectedPlatform(platform);
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`/api/${platform}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        `Failed to connect to server: ${(err as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleDownload();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            isSelected={selectedPlatform === platform.id}
            onClick={() => setSelectedPlatform(platform.id)}
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste video URL here..."
            className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 pr-12 text-base text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            disabled={isLoading}
          />
          {selectedPlatform && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {PLATFORMS.find((p) => p.id === selectedPlatform)?.icon}
            </div>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={isLoading || !url.trim()}
          className="w-full rounded-lg bg-blue-600 px-6 py-4 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {result && selectedPlatform && !isLoading && (
        <DownloadResult platform={selectedPlatform} result={result} />
      )}
    </div>
  );
}
