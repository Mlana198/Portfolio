import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SecretShortcut from "@/components/SecretShortcut";
import { DEFAULT_PORTFOLIO_DATA, PortfolioData } from "@/data/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const revalidate = 0; // Pastikan data selalu segar

async function getPortfolioData(): Promise<PortfolioData> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("data")
        .eq("id", "main")
        .single();

      if (!error && data && data.data) {
        // Gabungkan dengan default agar field baru (navbar, footer) tetap aman
        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...data.data,
          navbar: { ...DEFAULT_PORTFOLIO_DATA.navbar, ...(data.data.navbar || {}) },
          contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(data.data.contact || {}) },
          footer: { ...DEFAULT_PORTFOLIO_DATA.footer, ...(data.data.footer || {}) },
        };
      }
    }
  } catch (err) {
    console.error("Gagal memuat data dari Supabase, menggunakan data lokal:", err);
  }

  return DEFAULT_PORTFOLIO_DATA;
}

export default async function Home() {
  const content = await getPortfolioData();

  return (
    <main className="min-h-screen bg-[#030712] text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Shortcut rahasia: Ctrl + Shift + E untuk membuka /admin */}
      <SecretShortcut />

      <Navbar data={content.navbar} />
      <HeroSection data={content.hero} />
      <AboutSection data={content.about} />
      <SkillsSection skills={content.skills} />
      <ProjectsSection projects={content.projects} />
      <ContactSection data={content.contact} />
      <Footer data={content.footer} />
    </main>
  );
}
