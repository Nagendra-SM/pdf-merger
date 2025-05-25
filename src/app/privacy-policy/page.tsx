/* eslint-disable @next/next/no-html-link-for-pages */
export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-12 mx-auto max-w-2xl rounded-xl border border-gray-100 shadow-lg">
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
        Privacy Policy
      </h1>

      <p className="mb-4">
        Effective Date:{" "}
        {new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p className="mb-4">
        At PDFYOG, your privacy is important to us. This Privacy Policy explains
        how we handle your information when you use our PDF Merger service.
      </p>

      <h2 className="mb-2 text-xl font-semibold">1. Information We Collect</h2>
      <p className="mb-4">
        We do <strong>not</strong> collect or store any personal data or file
        content. Uploaded files are used only for the purpose of merging and are
        deleted automatically after processing.
      </p>

      <h2 className="mb-2 text-xl font-semibold">2. Usage Data</h2>
      <p className="mb-4">
        We may collect anonymous technical data like browser type and operating
        system for analytics purposes to improve our service. This data does not
        contain personal information.
      </p>

      <h2 className="mb-2 text-xl font-semibold">3. File Privacy</h2>
      <p className="mb-4">
        All uploaded files are processed securely and automatically removed from
        our servers after the merging process. We do not access, store, or share
        your files.
      </p>

      <h2 className="mb-2 text-xl font-semibold">4. Data Security</h2>
      <p className="mb-4">
        We use secure protocols to ensure your files remain private and are not
        accessible to unauthorized users.
      </p>

      <h2 className="mb-2 text-xl font-semibold">5. Changes</h2>
      <p className="mb-4">
        We may update this Privacy Policy. Changes will be posted here with an
        updated effective date.
      </p>

      <p className="mt-8 text-sm text-center text-gray-500">
        For questions, please contact us at:{" "}
        <a
          href="mailto:nagendrasm21@gmail.com"
          className="text-blue-600 underline"
        >
          nagendrasm21@gmail.com
        </a>
      </p>
    </div>
  );
}
