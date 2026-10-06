# Social Media Downloader Web

A modern, fast, and free social media video downloader built with Next.js. Download videos from TikTok, Facebook, Instagram, Twitter/X, and Threads directly in your browser without any registration.

## Features

- Multi-platform support: TikTok, Facebook, Instagram, Twitter/X, and Threads
- No watermark on downloaded videos (where applicable)
- HD quality download with multiple quality options
- TikTok photo slide download support
- Rate limiting and security headers built-in
- Clean, responsive, and modern UI
- Serverless-ready for deployment on Vercel or any cloud platform

## Supported Platforms

| Platform  | URL Patterns                   |
| --------- | ------------------------------ |
| TikTok    | tiktok.com, vm.tiktok.com      |
| Facebook  | facebook.com, fb.com, fb.watch |
| Instagram | instagram.com, instagr.am      |
| Twitter/X | twitter.com, x.com, t.co       |
| Threads   | threads.net                    |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4
- **HTTP Client:** Axios
- **HTML Parser:** Cheerio
- **Styling Extras:** Styled Components (for loading animation)
- **Deployment:** Vercel / Docker / Standalone Node.js

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Steps

```bash
git clone https://github.com/abcodeworks-cod/sosmed-downloader.git
cd sosmed-downloader
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser
2. Copy the video URL from any supported social media platform
3. Paste the URL into the input field
4. Click the "Download" button
5. The video will be processed and a download link will appear

## API Endpoints

All API routes accept POST requests with a JSON body containing a `url` field.

### POST /api/tiktok

Download TikTok videos or photo slides.

**Request:**

```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response (video):**

```json
{
  "success": true,
  "title": "Video title",
  "author": "Creator name",
  "video_url": "https://...",
  "type": "video"
}
```

**Response (photo slide):**

```json
{
  "success": true,
  "title": "Slide title",
  "author": "Creator name",
  "images": ["https://...", "https://..."],
  "type": "image"
}
```

### POST /api/facebook

Download Facebook reels and videos.

**Request:**

```json
{
  "url": "https://www.facebook.com/watch/?v=1234567890"
}
```

### POST /api/instagram

Download Instagram reels, stories, and videos.

**Request:**

```json
{
  "url": "https://www.instagram.com/reel/ABCDEF/"
}
```

### POST /api/twitter

Download Twitter/X videos with multiple quality options.

**Request:**

```json
{
  "url": "https://x.com/username/status/1234567890"
}
```

**Response:**

```json
{
  "success": true,
  "title": "Video title",
  "thumbnail": "https://...",
  "video_url": "https://...",
  "quality": "HD",
  "available_qualities": [
    { "quality": "HD", "url": "https://..." },
    { "quality": "SD", "url": "https://..." }
  ]
}
```

### POST /api/threads

Download Threads videos.

**Request:**

```json
{
  "url": "https://www.threads.net/@username/post/ABCDEF"
}
```

## Build and Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project on [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Docker

```bash
docker-compose up -d
```

Or build and run manually:

```bash
docker build -t sosmed-downloader .
docker run -p 3000:3000 sosmed-downloader
```

### Standalone

```bash
npm run build
node .next/standalone/server.js
```

## Project Structure

```
sosmed-downloader/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── facebook/route.ts
│   │   │   ├── instagram/route.ts
│   │   │   ├── threads/route.ts
│   │   │   ├── tiktok/route.ts
│   │   │   └── twitter/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── CounterLoading.tsx
│   │   ├── DownloadResult.tsx
│   │   ├── DownloaderForm.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── PlatformCard.tsx
│   │   ├── PlatformFeatureCard.tsx
│   │   └── ui/
│   │       └── card.tsx
│   ├── lib/
│   │   ├── scrapers/
│   │   │   ├── facebook.ts
│   │   │   ├── instagram.ts
│   │   │   ├── threads.ts
│   │   │   ├── tiktok.ts
│   │   │   └── twitter.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── middleware.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Security

The application includes built-in security features:

- **Rate Limiting:** 10 requests per minute per IP via middleware
- **Security Headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy, XSS-Protection, Permissions-Policy
- **Content Security Policy:** Enabled in production mode
- **CORS:** Configurable per environment

## Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

| Variable | Description                     | Default   |
| -------- | ------------------------------- | --------- |
| PORT     | Custom server port              | 3000      |
| HOST     | Custom server host              | localhost |
| DOMAIN   | Production domain for CORS      | \*        |
| API_KEY  | Optional API key for protection | Not set   |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is provided for personal use only. Please respect the terms of service of each social media platform and the intellectual property rights of content creators. The authors are not responsible for any misuse of this tool.
