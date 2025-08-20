-- Criar o bucket para vídeos do blog
INSERT INTO storage.buckets (id, name, public) VALUES ('blog_videos', 'blog_videos', true);

-- Criar políticas para o bucket de vídeos do blog
CREATE POLICY "Video images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog_videos');

CREATE POLICY "Users can upload videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog_videos');

CREATE POLICY "Users can update videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog_videos');

CREATE POLICY "Users can delete videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog_videos');