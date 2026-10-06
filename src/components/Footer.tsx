export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gray-900">
              <span className="text-xs font-semibold text-white">AB</span>
            </div>
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} AB Codeworks. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">
              Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
