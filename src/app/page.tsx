/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  ArrowUpTrayIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRef, useState } from "react";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pdfFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf"
      );
      setSelectedFiles(pdfFiles);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      alert("Please select at least two PDF files.");
      return;
    }
    setMerging(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
    try {
      const res = await fetch("/api/merge", {
        method: "POST",
        body: formData,
        headers: {
          "x-user-id": user?.id || "anonymous",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Merge failed");
        throw new Error("Merge failed");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      // Remove filename after download
      setSelectedFiles([]);
    } catch (err) {
      // error already alerted above
    } finally {
      setMerging(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 w-sc dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container fixed px-6 py-4 mx-auto w-full max-w-full bg-gray-900 z-100">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            <DocumentDuplicateIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              PDFYOG
            </span>
          </div>
          <div className="hidden space-x-8 text-gray-600 md:flex dark:text-gray-300">
            <a
              href="#features"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              How It Works
            </a>
          </div>
          <div className="flex space-x-4">
            {/* <Navbar /> */}
            <SignedOut>
              <SignInButton>
                <button className="p-2 bg-transparent rounded cursor-pointer hover:bg-blue-500">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="p-2 bg-transparent rounded cursor-pointer hover:bg-blue-500">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container flex flex-col items-center px-6 py-16 mx-auto md:py-24 md:flex-row">
        <div className="mb-12 md:w-1/2 md:mb-0">
          <h1 className="text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-white">
            Merge PDF Files{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Effortlessly
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Combine multiple PDFs into one document in seconds. No installation,
            no registration required - it&apos;s free, secure, and easy to use!
          </p>
          <div className="flex flex-col mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              className="flex justify-center items-center px-8 py-4 text-white bg-blue-600 rounded-lg shadow-lg transition cursor-pointer hover:bg-blue-700"
              onClick={handleUploadClick}
            >
              <ArrowUpTrayIcon className="mr-2 w-5 h-5" />
              Upload PDFs
            </button>
            <button
              className="flex justify-center items-center px-8 py-4 text-gray-700 rounded-lg border border-gray-300 transition cursor-pointer dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => (window.location.href = "#features")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-200 rounded-lg transform rotate-3 dark:bg-blue-900"></div>
            <div className="absolute -right-4 -bottom-4 w-full h-full bg-blue-400 rounded-lg transform -rotate-3 dark:bg-blue-700"></div>
            <div className="relative p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  PDF Merger
                </h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-8 rounded-lg border-2 border-gray-300 border-dashed dark:border-gray-600">
                <ArrowUpTrayIcon className="mb-4 w-12 h-12 text-blue-600 dark:text-blue-400" />
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <p
                  className="text-center text-gray-600 cursor-pointer dark:text-gray-300"
                  onClick={handleUploadClick}
                >
                  Drag & drop your PDF files here or
                  <span className="ml-1 font-medium text-blue-600 dark:text-blue-400">
                    browse files
                  </span>
                </p>
                {/* <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Maximum 10 files, 50MB each
                </p> */}
                {selectedFiles.length > 0 && (
                  <ul className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                    {selectedFiles.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg transition cursor-pointer hover:bg-blue-700"
                  onClick={handleMerge}
                  disabled={merging || selectedFiles.length < 2}
                >
                  {merging ? "Merging..." : "Merge Files"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container px-6 py-16 mx-auto my-16 bg-white rounded-xl shadow-sm dark:bg-gray-800"
      >
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Why Choose Our PDF Merger
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-6 bg-blue-50 rounded-xl dark:bg-gray-700">
            <div className="flex justify-center items-center p-3 mb-4 w-14 h-14 bg-blue-100 rounded-full dark:bg-blue-900">
              <LockClosedIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your files are processed entirely in your browser. They never
              leave your computer, ensuring complete privacy.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl dark:bg-gray-700">
            <div className="flex justify-center items-center p-3 mb-4 w-14 h-14 bg-blue-100 rounded-full dark:bg-blue-900">
              <ArrowPathIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our advanced algorithms process and merge your PDFs in seconds,
              saving you valuable time.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl dark:bg-gray-700">
            <div className="flex justify-center items-center p-3 mb-4 w-14 h-14 bg-blue-100 rounded-full dark:bg-blue-900">
              <CheckCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Easy to Use
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No technical skills required. Just upload, arrange, and merge your
              PDFs with a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container px-6 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 text-xl font-bold text-white bg-blue-600 rounded-full">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Upload Files
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Select multiple PDF files from your device or drag & drop them.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 text-xl font-bold text-white bg-blue-600 rounded-full">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Arrange Order
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Rearrange the order of your PDFs by dragging them into position.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 text-xl font-bold text-white bg-blue-600 rounded-full">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Download Result
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Click merge and download your combined PDF document instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container px-6 py-16 mx-auto my-16 bg-blue-50 rounded-xl dark:bg-gray-700">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <div className="flex justify-center items-center w-12 h-12 text-xl font-bold text-blue-600 bg-blue-200 rounded-full">
                J
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  John D.
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Marketing Manager
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &quot;This tool saved me hours of work! I needed to combine
              multiple reports into one PDF, and it was done in seconds.&quot;
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <div className="flex justify-center items-center w-12 h-12 text-xl font-bold text-blue-600 bg-blue-200 rounded-full">
                S
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  Sarah M.
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Teacher
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &quot;As a teacher, I regularly need to combine worksheets. This tool
              is incredibly easy to use and works perfectly every time.&quot;
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <div className="flex items-center mb-4">
              <div className="flex justify-center items-center w-12 h-12 text-xl font-bold text-blue-600 bg-blue-200 rounded-full">
                R
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  Robert K.
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Small Business Owner
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &quot;I was skeptical about free online tools, but this PDF merger
              exceeded my expectations. Fast, secure, and professional results.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-6 py-16 mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Ready to Merge Your PDFs?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Join thousands of satisfied users who simplify their document workflow
          every day.
        </p>
        <button
          type="button"
          className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg shadow-lg transition cursor-pointer hover:bg-blue-700"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpTrayIcon className="mr-2 w-5 h-5" />
          Start Merging Now — It&apos;s Free!
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <DocumentDuplicateIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  PDFYOG
                </span>
              </div>
              <p className="mt-4 max-w-xs text-gray-600 dark:text-gray-300">
                The simplest way to combine multiple PDFs into a single
                document.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Product
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      How It Works
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Support
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/contact"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faq"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/privacy-policy"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms-of-service"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} PDFYOG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Implement navigation to top and file upload functionality
