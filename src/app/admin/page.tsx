"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeft,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import { PortfolioData, DEFAULT_PORTFOLIO_DATA } from "@/data/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Content state
  const [content, setContent] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [activeTab, setActiveTab] = useState<
    "navbar" | "hero" | "about" | "skills" | "projects" | "contact" | "footer"
  >("navbar");

  const [saveStatus, setSaveStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      fetchCurrentContent();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        fetchCurrentContent();
      } else {
        setAuthError(data.error || "Password salah. Silakan coba lagi.");
      }
    } catch (err: any) {
      setAuthError("Gagal menghubungi server otentikasi.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const fetchCurrentContent = async () => {
    try {
      const res = await fetch("/api/content");
      const result = await res.json();
      if (result && result.data) {
        setContent({
          ...DEFAULT_PORTFOLIO_DATA,
          ...result.data,
          navbar: { ...DEFAULT_PORTFOLIO_DATA.navbar, ...(result.data.navbar || {}) },
          contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(result.data.contact || {}) },
          footer: { ...DEFAULT_PORTFOLIO_DATA.footer, ...(result.data.footer || {}) },
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data terkini:", err);
    }
  };

  const handleSave = async () => {
    setSaveStatus({ type: "loading", msg: "Menyimpan seluruh konfigurasi..." });
    const token = sessionStorage.getItem("admin_token");

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, content }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSaveStatus({
          type: "success",
          msg: result.message || "Perubahan berhasil disimpan! Data live telah diperbarui.",
        });
        setTimeout(() => setSaveStatus({ type: "idle", msg: "" }), 5000);
      } else {
        setSaveStatus({ type: "error", msg: result.error || "Gagal menyimpan perubahan." });
      }
    } catch (err: any) {
      setSaveStatus({ type: "error", msg: "Koneksi terputus saat menyimpan." });
    }
  };

  // 1. Tampilan Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin &amp; Edit Area</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Area privat khusus pemilik portofolio (Irfan Afandi). Masukkan kata sandi rahasia Anda.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Default: <code className="text-emerald-400">irfanadmin2026</code> (di .env.local)
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all disabled:opacity-50"
            >
              {authLoading ? "Memverifikasi..." : "Buka Menu Edit"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Publik</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. Tampilan Editor Lengkap
  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">Full Editor Portofolio</h1>
            <p className="text-[11px] text-emerald-400">Semua Menu &amp; Fitur Terbuka</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web Publik</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saveStatus.type === "loading"}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatus.type === "loading" ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-rose-500/40 hover:text-rose-400 text-zinc-400 transition-colors"
            title="Keluar / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {saveStatus.type !== "idle" && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-3 border ${
              saveStatus.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : saveStatus.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : saveStatus.type === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            ) : (
              <Sparkles className="w-5 h-5 shrink-0 animate-spin" />
            )}
            <span>{saveStatus.msg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-8 overflow-x-auto text-xs font-medium">
          {(["navbar", "hero", "about", "skills", "projects", "contact", "footer"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              {tab === "navbar"
                ? "Navbar & Menu"
                : tab === "hero"
                ? "Hero Section"
                : tab === "about"
                ? "Tentang Saya"
                : tab === "skills"
                ? "Keahlian (Skills)"
                : tab === "projects"
                ? "Proyek (Showcase)"
                : tab === "contact"
                ? "💬 Hubungi Saya (WhatsApp)"
                : "Footer"}
            </button>
          ))}
        </div>

        {/* 1. TAB NAVBAR & MENU */}
        {activeTab === "navbar" && (
          <div className="space-y-6 bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-base font-semibold text-white">Pengaturan Navbar &amp; Nama Menu</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nama Logo (Bagian Depan)</label>
                <input
                  type="text"
                  value={content.navbar.brandFirst}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      navbar: { ...content.navbar, brandFirst: e.target.value },
                    })
                  }
                  placeholder="e.g. irfan"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nama Logo (Aksen Hijau)</label>
                <input
                  type="text"
                  value={content.navbar.brandLast}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      navbar: { ...content.navbar, brandLast: e.target.value },
                    })
                  }
                  placeholder="e.g. .afandi"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Teks Tombol Aksi di Navbar</label>
              <input
                type="text"
                value={content.navbar.ctaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    navbar: { ...content.navbar, ctaText: e.target.value },
                  })
                }
                placeholder="e.g. Hubungi"
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-xs font-medium text-zinc-300 mb-3">Daftar Menu Navigasi</label>
              <div className="space-y-3">
                {content.navbar.navLinks.map((link, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <div>
                      <span className="block text-[11px] text-zinc-400 mb-1">Nama Menu</span>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => {
                          const updated = [...content.navbar.navLinks];
                          updated[idx].name = e.target.value;
                          setContent({
                            ...content,
                            navbar: { ...content.navbar, navLinks: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-zinc-400 mb-1">Target Section ID (#)</span>
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => {
                          const updated = [...content.navbar.navLinks];
                          updated[idx].href = e.target.value;
                          setContent({
                            ...content,
                            navbar: { ...content.navbar, navLinks: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB HERO */}
        {activeTab === "hero" && (
          <div className="space-y-6 bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-base font-semibold text-white">Pengaturan Hero Section</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Availability Badge</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Headline Prefix</label>
                <input
                  type="text"
                  value={content.hero.headlinePrefix}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, headlinePrefix: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Aksen Kata 1 (Hardware)</label>
                <input
                  type="text"
                  value={content.hero.hardwareHighlight}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, hardwareHighlight: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Aksen Kata 2 (Perangkat Lunak)</label>
                <input
                  type="text"
                  value={content.hero.softwareHighlight}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, softwareHighlight: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Sub-headline / Deskripsi Singkat</label>
              <textarea
                rows={3}
                value={content.hero.subheadline}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Teks Tombol CTA Utama</label>
                <input
                  type="text"
                  value={content.hero.ctaPortfolio}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, ctaPortfolio: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Teks Tombol CTA Kontak</label>
                <input
                  type="text"
                  value={content.hero.ctaContact}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, ctaContact: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB ABOUT */}
        {activeTab === "about" && (
          <div className="space-y-6 bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-base font-semibold text-white">Pengaturan Tentang Saya (About)</h2>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Heading Utama About</label>
              <input
                type="text"
                value={content.about.heading}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, heading: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-zinc-300">Paragraf Narasi (1, 2, 3)</label>
              <textarea
                rows={2}
                value={content.about.p1}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, p1: e.target.value } })
                }
                placeholder="Paragraf 1..."
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
              <textarea
                rows={2}
                value={content.about.p2}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, p2: e.target.value } })
                }
                placeholder="Paragraf 2..."
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
              <textarea
                rows={2}
                value={content.about.p3}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, p3: e.target.value } })
                }
                placeholder="Paragraf 3..."
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Metrik 1 (Angka &amp; Label)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={content.about.metric1Number}
                    onChange={(e) =>
                      setContent({ ...content, about: { ...content.about, metric1Number: e.target.value } })
                    }
                    placeholder="Nilai (e.g. End-to-End)"
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={content.about.metric1Label}
                    onChange={(e) =>
                      setContent({ ...content, about: { ...content.about, metric1Label: e.target.value } })
                    }
                    placeholder="Keterangan"
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Metrik 2 (Angka &amp; Label)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={content.about.metric2Number}
                    onChange={(e) =>
                      setContent({ ...content, about: { ...content.about, metric2Number: e.target.value } })
                    }
                    placeholder="Nilai (e.g. 24/7)"
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-emerald-400"
                  />
                  <input
                    type="text"
                    value={content.about.metric2Label}
                    onChange={(e) =>
                      setContent({ ...content, about: { ...content.about, metric2Label: e.target.value } })
                    }
                    placeholder="Keterangan"
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white">Kategori &amp; Tech Stack</h2>

            <div className="space-y-6">
              {content.skills.map((cat, cIdx) => (
                <div key={cIdx} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...content.skills];
                        updated[cIdx].title = e.target.value;
                        setContent({ ...content, skills: updated });
                      }}
                      className="text-base font-bold text-white bg-transparent border-b border-zinc-700 pb-1 focus:outline-none focus:border-emerald-400 w-full"
                    />
                    <input
                      type="text"
                      value={cat.description}
                      onChange={(e) => {
                        const updated = [...content.skills];
                        updated[cIdx].description = e.target.value;
                        setContent({ ...content, skills: updated });
                      }}
                      className="text-xs text-zinc-400 bg-transparent mt-2 focus:outline-none w-full"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    {cat.skills.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
                        <input
                          type="text"
                          value={s.name}
                          onChange={(e) => {
                            const updated = [...content.skills];
                            updated[cIdx].skills[sIdx].name = e.target.value;
                            setContent({ ...content, skills: updated });
                          }}
                          className="flex-1 bg-transparent text-xs text-zinc-200 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={s.level || ""}
                          onChange={(e) => {
                            const updated = [...content.skills];
                            updated[cIdx].skills[sIdx].level = e.target.value;
                            setContent({ ...content, skills: updated });
                          }}
                          placeholder="Level"
                          className="w-24 bg-transparent text-xs text-emerald-400 font-mono focus:outline-none text-right"
                        />
                        <button
                          onClick={() => {
                            const updated = [...content.skills];
                            updated[cIdx].skills.splice(sIdx, 1);
                            setContent({ ...content, skills: updated });
                          }}
                          className="text-zinc-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...content.skills];
                        updated[cIdx].skills.push({ name: "Skill Baru", level: "Advanced", icon: "Cpu" });
                        setContent({ ...content, skills: updated });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mt-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Skill di Kategori Ini</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TAB PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Daftar Proyek IoT &amp; TI</h2>
              <button
                onClick={() => {
                  const newProj = {
                    id: `proj-${Date.now()}`,
                    title: "Proyek IoT Baru",
                    category: "IoT System" as const,
                    description: "Deskripsi singkat sistem arsitektur proyek.",
                    highlights: ["Fitur unggulan 1", "Fitur unggulan 2"],
                    tags: ["ESP32", "MQTT", "Next.js"],
                    githubUrl: "https://github.com/irfanafandi",
                  };
                  setContent({ ...content, projects: [newProj, ...content.projects] });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="space-y-6">
              {content.projects.map((proj, pIdx) => (
                <div key={proj.id || pIdx} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Proyek #{pIdx + 1}
                    </span>
                    <button
                      onClick={() => {
                        const updated = [...content.projects];
                        updated.splice(pIdx, 1);
                        setContent({ ...content, projects: updated });
                      }}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...content.projects];
                          updated[pIdx].title = e.target.value;
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Kategori</label>
                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...content.projects];
                          updated[pIdx].category = e.target.value as any;
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                      >
                        <option value="IoT System">IoT System</option>
                        <option value="Web & Cloud">Web &amp; Cloud</option>
                        <option value="Embedded">Embedded</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Deskripsi Proyek</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...content.projects];
                        updated[pIdx].description = e.target.value;
                        setContent({ ...content, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Tags (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      value={proj.tags.join(", ")}
                      onChange={(e) => {
                        const updated = [...content.projects];
                        updated[pIdx].tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                        setContent({ ...content, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Link GitHub</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ""}
                        onChange={(e) => {
                          const updated = [...content.projects];
                          updated[pIdx].githubUrl = e.target.value;
                          setContent({ ...content, projects: updated });
                        }}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Link Live Demo (Opsional)</label>
                      <input
                        type="text"
                        value={proj.demoUrl || ""}
                        onChange={(e) => {
                          const updated = [...content.projects];
                          updated[pIdx].demoUrl = e.target.value;
                          setContent({ ...content, projects: updated });
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TAB CONTACT (HUBUNGI SAYA / WHATSAPP INTEGRATION) */}
        {activeTab === "contact" && (
          <div className="space-y-6 bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-white">Pengaturan Fitur 'Hubungi Saya' &amp; WhatsApp</h2>
            </div>
            <p className="text-xs text-zinc-400">
              Pengunjung yang mengisi form pada website akan otomatis diarahkan untuk mengirim pesan langsung ke nomor WhatsApp Anda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Nomor WhatsApp Anda (Gunakan kode negara, tanpa +)
                </label>
                <input
                  type="text"
                  value={content.contact.whatsappNumber}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, whatsappNumber: e.target.value } })
                  }
                  placeholder="e.g. 6281234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-emerald-400 font-mono"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Contoh: <code>6281234567890</code> (62 menggantikan angka 0 di depan)
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Alamat Email Publik</label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, email: e.target.value } })
                  }
                  placeholder="e.g. irfanafandi@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Teks Tombol Kirim Form</label>
                <input
                  type="text"
                  value={content.contact.buttonText}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, buttonText: e.target.value } })
                  }
                  placeholder="e.g. Kirim Pesan ke WhatsApp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Pesan Sukses / Notifikasi Pop-up</label>
                <input
                  type="text"
                  value={content.contact.successMessage}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, successMessage: e.target.value } })
                  }
                  placeholder="e.g. Membuka WhatsApp..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">URL Profil GitHub</label>
                <input
                  type="url"
                  value={content.contact.githubUrl}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, githubUrl: e.target.value } })
                  }
                  placeholder="https://github.com/irfanafandi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">URL Profil LinkedIn</label>
                <input
                  type="url"
                  value={content.contact.linkedinUrl}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, linkedinUrl: e.target.value } })
                  }
                  placeholder="https://linkedin.com/in/irfanafandi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Judul Heading Section Kontak</label>
              <input
                type="text"
                value={content.contact.heading}
                onChange={(e) =>
                  setContent({ ...content, contact: { ...content.contact, heading: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Deskripsi Singkat Ajakan Kontak</label>
              <textarea
                rows={3}
                value={content.contact.description}
                onChange={(e) =>
                  setContent({ ...content, contact: { ...content.contact, description: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white resize-none"
              />
            </div>
          </div>
        )}

        {/* 7. TAB FOOTER */}
        {activeTab === "footer" && (
          <div className="space-y-6 bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-base font-semibold text-white">Pengaturan Footer</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nama Pemilik Hak Cipta</label>
                <input
                  type="text"
                  value={content.footer.ownerName}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, ownerName: e.target.value },
                    })
                  }
                  placeholder="e.g. Irfan Afandi"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Teks Sub-keterangan Footer</label>
                <input
                  type="text"
                  value={content.footer.subText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, subText: e.target.value },
                    })
                  }
                  placeholder="e.g. Dibuat dengan Next.js & Tailwind CSS"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
