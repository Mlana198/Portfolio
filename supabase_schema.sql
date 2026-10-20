-- Jalankan query SQL ini di Supabase SQL Editor untuk membuat tabel penyimpanan portofolio
CREATE TABLE IF NOT EXISTS portfolio_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buka izin baca (SELECT) untuk publik agar website bisa memuat konten terbaru
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON portfolio_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Buka izin tulis (ALL) untuk menyimpan data portofolio
CREATE POLICY "Allow write access"
  ON portfolio_content
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
