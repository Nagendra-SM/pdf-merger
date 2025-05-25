/* eslint-disable @next/next/no-html-link-for-pages */
export default function FAQPage() {
  return (
    <div className="px-4 py-12 mx-auto my-[7%] max-w-2xl bg-white rounded-xl shadow-lg border border-gray-100">
      <a href="/" className="text-blue-500 hover:underline">
        Back to Home
      </a>
      <h1 className="flex gap-2 items-center mb-6 text-4xl font-extrabold text-blue-700">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded">
          <h2 className="text-lg font-semibold text-blue-700">
            Is my data safe when I use PDFYOG?
          </h2>
          <p className="text-gray-700">
            Yes, your files are processed securely and deleted automatically
            after merging. We do not store or access your files.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded">
          <h2 className="text-lg font-semibold text-blue-700">
            Do I need to create an account?
          </h2>
          <p className="text-gray-700">
            No account is required. You can use our PDF merger service instantly
            and for free.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded">
          <h2 className="text-lg font-semibold text-blue-700">
            Are there any file size limits?
          </h2>
          <p className="text-gray-700">
            There may be limits depending on server capacity, but most standard
            PDF files are supported.
          </p>
        </div>
      </div>
    </div>
  );
}
