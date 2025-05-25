/* eslint-disable @next/next/no-html-link-for-pages */
export default function TermsOfServicePage() {
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
        Terms of Service
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
        By accessing or using our PDF Merger service, you agree to be bound by
        the following terms and conditions.
      </p>

      <h2 className="mb-2 text-xl font-semibold">1. Use of Service</h2>
      <p className="mb-4">
        Our service allows you to upload PDF files for merging. You must ensure
        that the content you upload does not violate any laws or third-party
        rights.
      </p>

      <h2 className="mb-2 text-xl font-semibold">2. File Handling</h2>
      <p className="mb-4">
        Uploaded files are used only for the merging process and are deleted
        automatically after completion. We do not retain or analyze your
        documents.
      </p>

      <h2 className="mb-2 text-xl font-semibold">3. User Responsibility</h2>
      <p className="mb-4">
        You are solely responsible for the legality and ownership of the files
        you upload. Do not use the service to process illegal, harmful, or
        copyrighted content.
      </p>

      <h2 className="mb-2 text-xl font-semibold">4. Limitation of Liability</h2>
      <p className="mb-4">
        We are not responsible for any data loss, service interruption, or any
        damages resulting from the use or inability to use the service.
      </p>

      <h2 className="mb-2 text-xl font-semibold">5. Modifications</h2>
      <p className="mb-4">
        We may modify these terms at any time. Continued use of the service
        constitutes acceptance of the updated terms.
      </p>

      <p className="mt-8 text-sm text-center text-gray-500">
        If you have any questions, contact us at:{" "}
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
