"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecretShortcut() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut Rahasia: Ctrl + Shift + E
      if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        router.push("/admin");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
