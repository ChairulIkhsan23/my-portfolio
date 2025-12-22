"use client";

import { useState } from "react";
import { Send, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="bg-white pt-16 md:pt-20 lg:pt-24 pb-36 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Kamu
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 outline-none transition-colors"
                  placeholder="Masukan nama kamu"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apa yang bisa aku bantu? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 outline-none resize-none transition-colors"
                  placeholder="Jelaskan apa yang kamu butuhkan..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status Message */}
              {submitStatus === "success" && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-center">
                  Message sent successfully
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Description */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Let&apos;s talk for
              <br />
              Something special
            </h3>

            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Jika Kamu memiliki pertanyaan, ide, atau ingin berdiskusi, silakan
              hubungi saya melalui form ini, Ya.
            </p>

            {/* Email Contact */}
            <div className="flex items-start gap-4 mb-6 md:mb-8">
              <div className="p-3 bg-gray-100 rounded-lg shrink-0">
                <Mail className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <a
                  href="mailto:chairulikhsan23@student.polindra.ac.id"
                  className="text-gray-900 font-medium hover:text-blue-600 transition-colors break-all"
                >
                  chairulikhsan23@student.polindra.ac.id
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-6 md:my-8" />

            {/* Note */}
            <p className="text-sm text-gray-500">
              Saya biasanya membalas pesan dalam waktu 24 jam. Thank you, Guys!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
