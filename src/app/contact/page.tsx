/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="px-4 py-12 mx-auto my-[6%] max-w-xl  rounded-xl shadow-lg border border-gray-100">
      <a href="/" className="text-blue-500 hover:underline">
        Back to Home
      </a>
      <h1 className="flex gap-2 items-center mb-6 text-4xl font-extrabold text-blue-700">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="px-3 py-2 w-full rounded border transition focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="px-3 py-2 w-full rounded border transition focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="px-3 py-2 w-full rounded border transition focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          rows={5}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded transition hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      {status && (
        <p className="mt-4 text-sm text-center text-gray-600">{status}</p>
      )}
    </div>
  );
}
