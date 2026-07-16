-- ============================================================
-- ESQUEMA COMPLETO PARA SUPABASE - ELIZER ROSARIO TORRES PRM
-- ============================================================

-- 1. TABLA DE AFILIADOS (la que ya tienes creada)
CREATE TABLE IF NOT EXISTS public.afiliados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cedula TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  telefono TEXT NOT NULL,
  recinto_electoral TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABLA DE PUBLICACIONES (galería)
CREATE TABLE IF NOT EXISTS public.publicaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL CHECK (tipo IN ('foto', 'video')),
  url TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABLA DE COMENTARIOS
CREATE TABLE IF NOT EXISTS public.comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publicacion_id UUID NOT NULL REFERENCES publicaciones(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TABLA DE LIKES
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publicacion_id UUID NOT NULL REFERENCES publicaciones(id) ON DELETE CASCADE,
  nombre TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- AFILIADOS: cualquiera puede insertar (formulario público)
ALTER TABLE public.afiliados ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Insertar afiliados público" ON public.afiliados;
CREATE POLICY "Insertar afiliados público" ON public.afiliados
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin puede leer afiliados" ON public.afiliados;
CREATE POLICY "Admin puede leer afiliados" ON public.afiliados
  FOR SELECT USING (auth.role() = 'authenticated');

-- PUBLICACIONES
ALTER TABLE public.publicaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Lectura pública de publicaciones" ON publicaciones
  FOR SELECT USING (true);

-- COMENTARIOS
ALTER TABLE public.comentarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Lectura pública de comentarios" ON comentarios
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Insertar comentarios público" ON comentarios
  FOR INSERT WITH CHECK (true);

-- LIKES
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Lectura pública de likes" ON likes
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Insertar likes público" ON likes
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_afiliados_cedula ON afiliados(cedula);
CREATE INDEX IF NOT EXISTS idx_afiliados_created_at ON afiliados(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_publicaciones_created_at ON publicaciones(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comentarios_publicacion ON comentarios(publicacion_id);
CREATE INDEX IF NOT EXISTS idx_likes_publicacion ON likes(publicacion_id);
