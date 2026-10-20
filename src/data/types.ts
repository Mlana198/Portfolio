import { SKILL_CATEGORIES, PROJECTS, SkillCategory, Project } from "./content";

export interface NavbarLink {
  name: string;
  href: string;
}

export interface NavbarData {
  brandFirst: string;
  brandLast: string;
  ctaText: string;
  navLinks: NavbarLink[];
}

export interface HeroData {
  badge: string;
  headlinePrefix: string;
  hardwareHighlight: string;
  softwareHighlight: string;
  subheadline: string;
  ctaPortfolio: string;
  ctaContact: string;
}

export interface AboutPillar {
  title: string;
  desc: string;
  iconName: string;
}

export interface AboutData {
  sectionTitle: string;
  heading: string;
  p1: string;
  p2: string;
  p3: string;
  metric1Number: string;
  metric1Label: string;
  metric2Number: string;
  metric2Label: string;
  pillars: AboutPillar[];
}

export interface ContactData {
  sectionTitle: string;
  heading: string;
  description: string;
  email: string;
  whatsappNumber: string; // e.g. "628xxxxxxxxxx"
  githubUrl: string;
  linkedinUrl: string;
  buttonText: string;
  successMessage: string;
}

export interface FooterData {
  ownerName: string;
  subText: string;
}

export interface PortfolioData {
  navbar: NavbarData;
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactData;
  footer: FooterData;
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  navbar: {
    brandFirst: "irfan",
    brandLast: ".afandi",
    ctaText: "Hubungi",
    navLinks: [
      { name: "Tentang", href: "#about" },
      { name: "Keahlian", href: "#skills" },
      { name: "Proyek", href: "#projects" },
      { name: "Kontak", href: "#contact" },
    ],
  },
  hero: {
    badge: "Spesialis TI & Internet of Things (IoT)",
    headlinePrefix: "Menjembatani",
    hardwareHighlight: "Hardware",
    softwareHighlight: "Perangkat Lunak",
    subheadline: "Halo, saya Irfan Afandi. Berfokus pada perancangan arsitektur sistem cerdas, telemetri data nirkabel, sensor embedded, serta aplikasi web yang tangguh dan skalabel.",
    ctaPortfolio: "Lihat Portofolio",
    ctaContact: "Hubungi Saya",
  },
  about: {
    sectionTitle: "Tentang Saya",
    heading: "Menghidupkan Interaksi Fisik Lewat Ekosistem Digital.",
    p1: "Saya adalah seorang praktisi di bidang Teknologi Informasi & IoT yang berdedikasi menciptakan keselarasan mulus antara perangkat keras (hardware) dan sistem perangkat lunak (software).",
    p2: "Mulai dari merangkai sirkuit sensor mikrokontroler, memprogram transmisi data melalui protokol jaringan berlatensi rendah, hingga menyajikannya dalam dashboard analitik yang intuitif bagi pengguna akhir.",
    p3: "Bagi saya, sistem IoT yang unggul bukan hanya tentang mengumpulkan data, melainkan memastikan data tersebut terkirim dengan andal, terenkripsi, dan dapat diolah menjadi keputusan otomatisasi yang bernilai tinggi.",
    metric1Number: "End-to-End",
    metric1Label: "Sensor to Cloud Pipeline",
    metric2Number: "24/7",
    metric2Label: "Reliable IoT Architecture",
    pillars: [
      {
        title: "Physical Computing",
        desc: "Perancangan firmware mikrokontroler (ESP32/STM32/Arduino) dengan fokus pada keandalan operasional, optimasi daya rendah, dan akurasi sensor.",
        iconName: "Cpu",
      },
      {
        title: "IoT & Networking",
        desc: "Implementasi protokol telemetri berkinerja tinggi (MQTT, LoRa, Modbus) untuk komunikasi data nirkabel jarak jauh secara aman dan efisien.",
        iconName: "Radio",
      },
      {
        title: "Full-Stack Integration",
        desc: "Pengembangan dashboard real-time berbasis Next.js, backend Python/Node.js, dan database time-series untuk visualisasi analitik terpusat.",
        iconName: "Server",
      },
      {
        title: "Enterprise Reliability",
        desc: "Menjamin ketersediaan sistem di lingkungan produksi, manajemen gateway Linux mandiri, dan integrasi cloud yang aman.",
        iconName: "ShieldCheck",
      },
    ],
  },
  skills: SKILL_CATEGORIES,
  projects: PROJECTS,
  contact: {
    sectionTitle: "Hubungi Saya",
    heading: "Mari Berkolaborasi dalam Proyek IoT & TI",
    description: "Apakah Anda membutuhkan konsultasi arsitektur IoT, pembuatan prototype embedded system, atau pengembangan web dashboard terintegrasi? Silakan hubungi saya melalui jalur berikut.",
    email: "irfanafandi@example.com",
    whatsappNumber: "6281234567890",
    githubUrl: "https://github.com/irfanafandi",
    linkedinUrl: "https://linkedin.com/in/irfanafandi",
    buttonText: "Kirim Pesan ke WhatsApp",
    successMessage: "Membuka WhatsApp...",
  },
  footer: {
    ownerName: "Irfan Afandi",
    subText: "Dibuat dengan Next.js, Tailwind CSS & Lucide Icons",
  },
};
