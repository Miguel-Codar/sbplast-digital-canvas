
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  long_description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  created_at: string;
  updated_at: string;
}

// Get all products
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_categories(id, name, slug)
    `)
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data;
}

// Get a single product by slug
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_categories(id, name, slug)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }

  return data;
}

// Create a new product
export async function createProduct(product: Partial<Product>) {
  if (!product.name) {
    throw new Error("Product name is required");
  }
  
  if (!product.slug) {
    throw new Error("Product slug is required");
  }
  
  try {
    console.log("Creating new product:", product);
    
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: product.name,
        slug: product.slug,
        category_id: product.category_id || null,
        short_description: product.short_description || null,
        long_description: product.long_description || null,
        image_url: product.image_url || null,
      })
      .select();
      
    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }
    
    console.log("Product created successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
}

// Update an existing product
export async function updateProduct(product: Partial<Product> & { id: string }) {
  if (!product.id) {
    throw new Error("Product ID is required for updating");
  }
  
  try {
    console.log("Updating product:", product);
    
    const { data, error } = await supabase
      .from("products")
      .update({ 
        name: product.name,
        slug: product.slug,
        category_id: product.category_id || null,
        short_description: product.short_description || null,
        long_description: product.long_description || null,
        image_url: product.image_url || null,
        updated_at: new Date().toISOString() 
      })
      .eq("id", product.id)
      .select();

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    
    console.log("Product updated successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Save product (create or update)
export async function saveProduct(product: Partial<Product>) {
  if (product.id) {
    return updateProduct(product as Partial<Product> & { id: string });
  } else {
    return createProduct(product);
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }

    console.log("Product deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Upload a product image to Supabase Storage
export async function uploadProductImage(file: File) {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    const { data, error } = await supabase.storage
      .from("product_images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    // Get the public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from("product_images")
      .getPublicUrl(filePath);

    console.log("Image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Get all product categories
export async function getProductCategories() {
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }

  return data;
}

// Create a new product category
export async function createProductCategory(category: Partial<ProductCategory>) {
  if (!category.name) {
    throw new Error("Category name is required");
  }
  
  if (!category.slug) {
    throw new Error("Category slug is required");
  }
  
  try {
    console.log("Creating new category:", category);
    
    const { data, error } = await supabase
      .from("product_categories")
      .insert({
        name: category.name,
        slug: category.slug,
        icon_url: category.icon_url || null,
      })
      .select();
      
    if (error) {
      console.error("Error creating category:", error);
      throw error;
    }
    
    console.log("Category created successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error saving category:", error);
    throw error;
  }
}

// Update an existing product category
export async function updateProductCategory(category: Partial<ProductCategory> & { id: string }) {
  if (!category.id) {
    throw new Error("Category ID is required for updating");
  }
  
  try {
    console.log("Updating category:", category);
    
    const { data, error } = await supabase
      .from("product_categories")
      .update({ 
        name: category.name,
        slug: category.slug,
        icon_url: category.icon_url || null,
        updated_at: new Date().toISOString() 
      })
      .eq("id", category.id)
      .select();

    if (error) {
      console.error("Error updating category:", error);
      throw error;
    }
    
    console.log("Category updated successfully:", data);
    return data?.[0];
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

// Save product category (create or update)
export async function saveProductCategory(category: Partial<ProductCategory>) {
  if (category.id) {
    return updateProductCategory(category as Partial<ProductCategory> & { id: string });
  } else {
    return createProductCategory(category);
  }
}

// Delete a product category
export async function deleteProductCategory(id: string) {
  try {
    const { error } = await supabase.from("product_categories").delete().eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      throw error;
    }

    console.log("Category deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// Upload a category icon to Supabase Storage
export async function uploadCategoryIcon(file: File) {
  // Create a unique file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  try {
    const { data, error } = await supabase.storage
      .from("category_icons")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading icon:", error);
      throw error;
    }

    // Get the public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from("category_icons")
      .getPublicUrl(filePath);

    console.log("Icon uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading icon:", error);
    throw error;
  }
}
