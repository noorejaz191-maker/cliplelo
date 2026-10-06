export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900">
            <span className="text-sm font-semibold text-white">AB</span>
          </div>
          <span className="text-base font-semibold text-gray-900">
            AB Codeworks
          </span>
          <span className="hidden text-sm text-gray-500 sm:inline">
            Downloader
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/abcodeworks-cod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
