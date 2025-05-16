
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import { default as AdminProductsPage } from "./pages/admin/ProductsPage";
import ProductForm from "./pages/admin/ProductForm";
import CategoriesPage from "./pages/admin/CategoriesPage";
import { default as AdminBlogPage } from "./pages/admin/BlogPage";
import BlogForm from "./pages/admin/BlogForm";
import BlogCategoriesPage from "./pages/admin/BlogCategoriesPage";
import CarouselPage from "./pages/admin/CarouselPage";

const queryClient = new QueryClient();

// Layout component that includes header and footer
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Index />
              </MainLayout>
            }
          />
          <Route
            path="/produtos"
            element={
              <MainLayout>
                <ProductsPage />
              </MainLayout>
            }
          />
          <Route
            path="/produto/:slug"
            element={
              <MainLayout>
                <ProductPage />
              </MainLayout>
            }
          />
          <Route
            path="/categoria/:slug"
            element={
              <MainLayout>
                <CategoryPage />
              </MainLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <MainLayout>
                <BlogPage />
              </MainLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <MainLayout>
                <BlogPostPage />
              </MainLayout>
            }
          />

          {/* Admin routes - Protected with custom URL */}
          <Route path="/_painel-admin-788" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/blog/new" element={<BlogForm />} />
          <Route path="/admin/blog/edit/:slug" element={<BlogForm />} />
          <Route path="/admin/blog/categories" element={<BlogCategoriesPage />} />
          <Route path="/admin/carousel" element={<CarouselPage />} />

          {/* 404 page */}
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
