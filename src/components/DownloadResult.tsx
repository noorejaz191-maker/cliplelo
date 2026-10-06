import { TikTokResponse, VideoResponse } from "@/types";

interface DownloadResultProps {
  platform: string;
  result: TikTokResponse | VideoResponse;
}

export default function DownloadResult({
  platform,
  result,
}: DownloadResultProps) {
  if (!result.success) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-red-900">Download Failed</h3>
            <p className="mt-1 text-sm text-red-700">
              {result.error || "An error occurred while processing the video."}
            </p>
            {result.detail && (
              <p className="mt-2 text-xs text-red-600">{result.detail}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isTikTokImage =
    platform === "tiktok" &&
    (result as TikTokResponse).type === "image" &&
    (result as TikTokResponse).images;

  if (isTikTokImage) {
    const tiktokResult = result as TikTokResponse;
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-green-900">Success</h3>
            <p className="mt-0.5 text-sm text-green-700">
              {tiktokResult.title || "TikTok Slide"}
            </p>
            {tiktokResult.author && (
              <p className="mt-0.5 text-xs text-green-600">@{tiktokResult.author}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tiktokResult.images!.map((img, i) => (
            <a
              key={i}
              href={img}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                className="h-40 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  Download {i + 1}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  const videoResult = result as VideoResponse;
  const videoUrl = videoResult.video_url;

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
          <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-green-900">Success</h3>
          <p className="mt-0.5 text-sm text-green-700">
            {videoResult.title || `${platform} Video`}
          </p>
          {videoResult.author && (
            <p className="mt-0.5 text-xs text-green-600">@{videoResult.author}</p>
          )}
        </div>
      </div>

      {videoResult.thumbnail && (
        <div className="mt-4 overflow-hidden rounded-md border border-gray-200">
          <img
            src={videoResult.thumbnail}
            alt="Thumbnail"
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      <div className="mt-5">
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
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
          </a>
        )}
      </div>

      {videoResult.available_qualities &&
        videoResult.available_qualities.length > 1 && (
          <div className="mt-4 border-t border-green-200 pt-4">
            <p className="mb-2 text-xs font-medium text-gray-700">Quality Options:</p>
            <div className="flex flex-wrap gap-2">
              {videoResult.available_qualities.map((q, i) => (
                <a
                  key={i}
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition-colors hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  {q.quality}
                </a>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
