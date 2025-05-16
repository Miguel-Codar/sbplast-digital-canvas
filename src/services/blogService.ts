
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// Get all blog posts
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_categories(id, name, slug)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }

  return data;
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_categories(id, name, slug)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }

  return data;
}

// Get all blog categories
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching blog categories:", error);
    throw error;
  }

  return data;
}

// Create or update a blog post
export async function saveBlogPost(post: Partial<BlogPost>) {
  const isNewPost = !post.id;
  
  // Ensure slug is available for new posts
  if (isNewPost && !post.slug) {
    throw new Error("Slug is required for new blog posts");
  }
  
  const { data, error } = isNewPost
    ? await supabase.from("blog_posts").insert([post]).select()
    : await supabase
        .from("blog_posts")
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq("id", post.id!)
        .select();

  if (error) {
    console.error("Error saving blog post:", error);
    throw error;
  }

  return data?.[0];
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }

  return true;
}

// Upload an image to Supabase Storage
export async function uploadBlogImage(file: File) {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from("blog_images")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get the public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from("blog_images")
    .getPublicUrl(filePath);

  return publicUrl;
}
