
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  video_url: string | null; // Novo campo para vídeos
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

// Create a new blog post
export async function createBlogPost(post: Partial<BlogPost>) {
  // Ensure required fields are present
  if (!post.title) {
    throw new Error("Title is required for blog posts");
  }
  
  if (!post.slug) {
    throw new Error("Slug is required for blog posts");
  }
  
  try {
    console.log("Creating new post:", post);
    
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content: post.content || null,
        featured_image: post.featured_image || null,
        video_url: post.video_url || null, // Novo campo
        category_id: post.category_id || null,
        status: post.status || "Rascunho"
      })
      .select();
      
    if (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
    
    console.log("Post created successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error saving blog post:", error);
    throw error;
  }
}

// Update an existing blog post
export async function updateBlogPost(post: Partial<BlogPost> & { id: string }) {
  // Ensure required fields are present
  if (!post.id) {
    throw new Error("Post ID is required for updating blog posts");
  }
  
  try {
    console.log("Updating post:", post);
    
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ 
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content: post.content || null,
        featured_image: post.featured_image || null,
        video_url: post.video_url || null, // Novo campo
        category_id: post.category_id || null,
        status: post.status || "Rascunho",
        updated_at: new Date().toISOString() 
      })
      .eq("id", post.id)
      .select();

    if (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
    
    console.log("Post updated successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
}

// Save blog post (create or update)
export async function saveBlogPost(post: Partial<BlogPost>) {
  if (post.id) {
    return updateBlogPost(post as Partial<BlogPost> & { id: string });
  } else {
    return createBlogPost(post);
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }

    console.log("Post deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
}

// Upload an image to Supabase Storage
export async function uploadBlogImage(file: File) {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
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

    console.log("Image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Upload a video to Supabase Storage
export async function uploadBlogVideo(file: File) {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    const { data, error } = await supabase.storage
      .from("blog_videos")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading video:", error);
      throw error;
    }

    // Get the public URL for the uploaded video
    const { data: { publicUrl } } = supabase.storage
      .from("blog_videos")
      .getPublicUrl(filePath);

    console.log("Video uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
}
