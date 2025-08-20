-- Habilitar RLS nas tabelas públicas
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carousel_slides ENABLE ROW LEVEL SECURITY;

-- Criar políticas básicas para permitir leitura pública
CREATE POLICY "Allow public read access to blog posts" ON public.blog_posts
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog categories" ON public.blog_categories
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON public.products
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product categories" ON public.product_categories
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to carousel slides" ON public.carousel_slides
FOR SELECT USING (true);

-- Políticas para inserção e atualização (sem autenticação por enquanto)
CREATE POLICY "Allow insert blog posts" ON public.blog_posts
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update blog posts" ON public.blog_posts
FOR UPDATE USING (true);

CREATE POLICY "Allow delete blog posts" ON public.blog_posts
FOR DELETE USING (true);

CREATE POLICY "Allow insert blog categories" ON public.blog_categories
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update blog categories" ON public.blog_categories
FOR UPDATE USING (true);

CREATE POLICY "Allow delete blog categories" ON public.blog_categories
FOR DELETE USING (true);

CREATE POLICY "Allow insert products" ON public.products
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update products" ON public.products
FOR UPDATE USING (true);

CREATE POLICY "Allow delete products" ON public.products
FOR DELETE USING (true);

CREATE POLICY "Allow insert product categories" ON public.product_categories
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update product categories" ON public.product_categories
FOR UPDATE USING (true);

CREATE POLICY "Allow delete product categories" ON public.product_categories
FOR DELETE USING (true);

CREATE POLICY "Allow insert carousel slides" ON public.carousel_slides
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update carousel slides" ON public.carousel_slides
FOR UPDATE USING (true);

CREATE POLICY "Allow delete carousel slides" ON public.carousel_slides
FOR DELETE USING (true);