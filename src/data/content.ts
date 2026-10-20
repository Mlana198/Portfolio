export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Embedded & Hardware",
    description: "Pemrograman mikrokontroler, sirkuit interfacing, dan akuisisi data sensor real-time.",
    skills: [
      { name: "C / C++", level: "Advanced", icon: "Cpu" },
      { name: "ESP32 & ESP8266", level: "Advanced", icon: "Cpu" },
      { name: "Arduino Ecosystem", level: "Advanced", icon: "CircuitBoard" },
      { name: "Sensors & Actuators Interfacing", level: "Advanced", icon: "Zap" },
      { name: "PCB & Schematic Design", level: "Intermediate", icon: "Layers" },
    ],
  },
  {
    title: "IoT Protocols & Networking",
    description: "Protokol komunikasi berdaya rendah, telemetri real-time, dan arsitektur data gateway.",
    skills: [
      { name: "MQTT (Mosquitto/EMQX)", level: "Advanced", icon: "Radio" },
      { name: "RESTful APIs & WebSockets", level: "Advanced", icon: "Network" },
      { name: "LoRa & LoRaWAN", level: "Intermediate", icon: "Wifi" },
      { name: "Modbus & Serial (UART/SPI/I2C)", level: "Advanced", icon: "Binary" },
      { name: "TCP/IP & Edge Gateways", level: "Intermediate", icon: "Share2" },
    ],
  },
  {
    title: "Software & Web Development",
    description: "Pengembangan dashboard analitik, backend services, dan sistem manajemen terpusat.",
    skills: [
      { name: "JavaScript & TypeScript", level: "Advanced", icon: "Code2" },
      { name: "Python", level: "Advanced", icon: "Terminal" },
      { name: "Next.js & React", level: "Advanced", icon: "Layout" },
      { name: "Node.js & Express", level: "Intermediate", icon: "Server" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette" },
    ],
  },
  {
    title: "Cloud, Database & DevOps",
    description: "Infrastruktur deployment, database time-series untuk telemetri, dan monitoring server.",
    skills: [
      { name: "Linux Server Administration", level: "Advanced", icon: "TerminalSquare" },
      { name: "Docker & Containerization", level: "Intermediate", icon: "Boxes" },
      { name: "PostgreSQL & Supabase", level: "Advanced", icon: "Database" },
      { name: "InfluxDB (Time-Series)", level: "Intermediate", icon: "Activity" },
      { name: "Git & CI/CD", level: "Advanced", icon: "GitBranch" },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: "IoT System" | "Web & Cloud" | "Embedded";
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "smart-agriculture",
    title: "Smart Agriculture Monitoring & Auto-Irrigation",
    category: "IoT System",
    description: "Sistem cerdas pemantau kelembapan tanah, suhu lingkungan, dan intensitas cahaya dengan kontrol irigasi otomatis berbasis ambang batas adaptif.",
    highlights: [
      "Menggunakan ESP32 dengan deep-sleep power management untuk efisiensi daya baterai.",
      "Transmisi data telemetri via MQTT ke cloud server setiap interval teratur.",
      "Dashboard visualisasi responsif dengan peringatan real-time via Telegram bot.",
    ],
    tags: ["ESP32", "C++", "MQTT", "Next.js", "InfluxDB", "Tailwind CSS"],
    githubUrl: "https://github.com/irfanafandi",
    featured: true,
  },
  {
    id: "industrial-iot-dashboard",
    title: "Industrial Telemetry & Edge Monitoring Gateway",
    category: "IoT System",
    description: "Gateway berbasis Linux embedded untuk mengumpulkan data sensor getaran dan suhu mesin pabrik via RS485 Modbus secara non-intrusif.",
    highlights: [
      "Agregasi data dari 20+ sensor industri dengan protokol Modbus RTU ke TCP.",
      "Edge computing untuk filtering anomali sebelum diteruskan ke cloud.",
      "Visualisasi grafik throughput latensi rendah menggunakan WebSockets.",
    ],
    tags: ["Python", "Modbus", "Raspberry Pi", "Linux", "Docker", "WebSockets"],
    githubUrl: "https://github.com/irfanafandi",
    featured: true,
  },
  {
    id: "environmental-lora-station",
    title: "Long-Range Environmental Weather Station",
    category: "Embedded",
    description: "Stasiun cuaca jarak jauh menggunakan modulasi LoRa untuk area perkebunan terpencil tanpa jangkauan sinyal seluler.",
    highlights: [
      "Jangkauan transmisi nirkabel hingga radius 5 KM point-to-multipoint.",
      "Didukung solar panel & baterai LiFePO4 untuk operasi mandiri tanpa henti.",
      "Integrasi decoder payload pada gateway sentral ke database PostgreSQL.",
    ],
    tags: ["LoRa", "Arduino", "Low Power", "C/C++", "PostgreSQL"],
    githubUrl: "https://github.com/irfanafandi",
    featured: true,
  },
  {
    id: "smart-energy-meter",
    title: "IoT Smart Energy & Power Quality Monitor",
    category: "IoT System",
    description: "Perangkat monitor konsumsi daya listrik multi-channel untuk menganalisis efisiensi energi gedung secara real-time.",
    highlights: [
      "Sensor arus non-invasif (CT) dengan kalkulasi nilai RMS daya semu & aktif.",
      "Notifikasi otomatis ketika terjadi beban puncak berlebih.",
      "Export laporan konsumsi energi bulanan dalam format CSV/PDF.",
    ],
    tags: ["ESP8266", "MQTT", "Node.js", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/irfanafandi",
    featured: false,
  },
];
