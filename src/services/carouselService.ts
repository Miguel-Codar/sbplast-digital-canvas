
import { supabase } from "@/integrations/supabase/client";

export interface CarouselSlide {
  id: string;
  image_url: string;
  title: string | null;
  link: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Get all carousel slides
export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  const { data, error } = await supabase
    .from("carousel_slides")
    .select("*")
    .order("display_order");

  if (error) {
    console.error("Error fetching carousel slides:", error);
    throw error;
  }

  return data || [];
}

// Create a new carousel slide
export async function createCarouselSlide(slide: Partial<CarouselSlide>): Promise<CarouselSlide> {
  if (!slide.image_url) {
    throw new Error("Image URL is required for carousel slides");
  }
  
  // Find the highest display_order and add 1 for the new slide
  let display_order = 0;
  try {
    const { data } = await supabase
      .from("carousel_slides")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1);
      
    if (data && data.length > 0) {
      display_order = data[0].display_order + 1;
    }
  } catch (error) {
    console.error("Error determining slide order:", error);
  }
  
  try {
    console.log("Creating new carousel slide:", slide);
    
    const { data, error } = await supabase
      .from("carousel_slides")
      .insert({
        image_url: slide.image_url,
        title: slide.title || null,
        link: slide.link || null,
        display_order: slide.display_order !== undefined ? slide.display_order : display_order,
      })
      .select();
      
    if (error) {
      console.error("Error creating carousel slide:", error);
      throw error;
    }
    
    console.log("Carousel slide created successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error saving carousel slide:", error);
    throw error;
  }
}

// Update an existing carousel slide
export async function updateCarouselSlide(slide: Partial<CarouselSlide> & { id: string }): Promise<CarouselSlide> {
  if (!slide.id) {
    throw new Error("Slide ID is required for updating");
  }
  
  try {
    console.log("Updating carousel slide:", slide);
    
    const { data, error } = await supabase
      .from("carousel_slides")
      .update({ 
        image_url: slide.image_url,
        title: slide.title || null,
        link: slide.link || null,
        display_order: slide.display_order,
        updated_at: new Date().toISOString() 
      })
      .eq("id", slide.id)
      .select();

    if (error) {
      console.error("Error updating carousel slide:", error);
      throw error;
    }
    
    console.log("Carousel slide updated successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error updating carousel slide:", error);
    throw error;
  }
}

// Update display order of multiple slides
export async function updateCarouselOrder(slides: { id: string; display_order: number }[]): Promise<CarouselSlide[]> {
  try {
    console.log("Updating carousel slide order:", slides);
    
    // Supabase doesn't support bulk updates directly, so we need to do them sequentially
    for (const slide of slides) {
      const { error } = await supabase
        .from("carousel_slides")
        .update({ display_order: slide.display_order, updated_at: new Date().toISOString() })
        .eq("id", slide.id);
        
      if (error) {
        console.error(`Error updating order for slide ${slide.id}:`, error);
        throw error;
      }
    }
    
    console.log("Carousel order updated successfully");
    
    // Fetch the updated slides
    const { data, error } = await supabase
      .from("carousel_slides")
      .select("*")
      .order("display_order");
      
    if (error) {
      console.error("Error fetching updated carousel slides:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error updating carousel order:", error);
    throw error;
  }
}

// Delete a carousel slide
export async function deleteCarouselSlide(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("carousel_slides").delete().eq("id", id);

    if (error) {
      console.error("Error deleting carousel slide:", error);
      throw error;
    }

    console.log("Carousel slide deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting carousel slide:", error);
    throw error;
  }
}

// Upload a carousel image to Supabase Storage
export async function uploadCarouselImage(file: File): Promise<string> {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    // First, check if the bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === "carousel_images");

    if (!bucketExists) {
      console.log("Creating bucket 'carousel_images'");
      const { data, error } = await supabase.storage.createBucket("carousel_images", {
        public: true
      });
      
      if (error) {
        console.error("Error creating bucket:", error);
        throw error;
      }
      console.log("Bucket created successfully:", data);
    }

    // Now upload the file
    const { data, error } = await supabase.storage
      .from("carousel_images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    // Get the public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from("carousel_images")
      .getPublicUrl(filePath);

    console.log("Image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
