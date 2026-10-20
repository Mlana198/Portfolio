"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { ContactData } from "@/data/types";

interface ContactSectionProps {
  data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format pesan WhatsApp otomatis
    const waText = encodeURIComponent(
      `*Halo Mas Irfan Afandi, ada pesan baru dari portofolio:*\n\n` +
      `👤 *Nama:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📌 *Topik:* ${formData.subject}\n` +
      `💬 *Pesan:* ${formData.message}`
    );

    // Bersihkan nomor WhatsApp (hapus tanda +, spasi, minus)
    const cleanPhone = (data.whatsappNumber || "6281234567890").replace(/\D/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    // Buka WhatsApp di tab baru
    setTimeout(() => {
      window.open(waUrl, "_blank");
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Social Links */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              {data.sectionTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              {data.heading}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              {data.description}
            </p>

            <div className="space-y-4">
              {/* WhatsApp Direct Link */}
              {data.whatsappNumber && (
                <a
                  href={`https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">WhatsApp Langsung</p>
                    <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                      +{data.whatsappNumber}
                    </p>
                  </div>
                </a>
              )}

              {/* Email Contact */}
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Email Langsung</p>
                  <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {data.email}
                  </p>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">GitHub Profile</p>
                  <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {data.githubUrl.replace("https://", "")}
                  </p>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">LinkedIn Network</p>
                  <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {data.linkedinUrl.replace("https://", "")}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Kirim Pesan Cepat</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Formulir ini akan otomatis mengarahkan pesan langsung ke WhatsApp resmi saya.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{data.successMessage}</p>
                    <p className="text-xs text-emerald-400/80 mt-0.5">
                      Menghubungkan ke aplikasi WhatsApp Anda...
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Nama Anda
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        suppressHydrationWarning
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Alamat Email / Nomor HP
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. 0812xxx atau email@anda.com"
                        suppressHydrationWarning
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Subjek / Topik Kebutuhan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Proyek IoT Smart Agriculture / Konsultasi TI"
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Isi Pesan
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Jelaskan kebutuhan atau gambaran proyek Anda..."
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/10 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{data.buttonText || "Kirim Pesan ke WhatsApp"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
