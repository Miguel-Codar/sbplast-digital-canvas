
import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, X, LayoutDashboard, Package, FileText, 
  Image, LogOut, ChevronDown, ChevronRight 
} from "lucide-react";
import { Button } from "../../components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  subMenuItems?: { label: string; to: string }[];
}

const SidebarLink = ({ to, icon, children, active, subMenuItems }: SidebarLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = Array.isArray(subMenuItems) && subMenuItems.length > 0;

  const toggleSubMenu = (e: React.MouseEvent) => {
    if (hasSubMenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="mb-1">
      <Link
        to={hasSubMenu ? "#" : to}
        onClick={toggleSubMenu}
        className={`flex items-center px-4 py-3 rounded-md transition-colors ${
          active
            ? "bg-sbplast-blue text-white"
            : "text-gray-700 hover:bg-sbplast-blue/10"
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{children}</span>
        {hasSubMenu && (
          <span className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </Link>
      
      {hasSubMenu && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {subMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-sbplast-blue/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real application, you would implement proper logout logic
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className={`bg-white shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/admin" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-sbplast-blue">Admin SBPlast</h1>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4">
          <SidebarLink to="/admin" icon={<LayoutDashboard className="h-5 w-5" />} active>
            Dashboard
          </SidebarLink>
          
          <SidebarLink 
            to="#" 
            icon={<Package className="h-5 w-5" />}
            subMenuItems={[
              { label: "Todos os Produtos", to: "/admin/products" },
              { label: "Adicionar Produto", to: "/admin/products/new" },
              { label: "Categorias", to: "/admin/categories" },
            ]}
          >
            Produtos
          </SidebarLink>
          
          <SidebarLink 
            to="#" 
            icon={<FileText className="h-5 w-5" />}
            subMenuItems={[
              { label: "Todos os Posts", to: "/admin/blog" },
              { label: "Adicionar Post", to: "/admin/blog/new" },
              { label: "Categorias", to: "/admin/blog/categories" },
            ]}
          >
            Blog
          </SidebarLink>
          
          <SidebarLink 
            to="/admin/carousel" 
            icon={<Image className="h-5 w-5" />}
          >
            Carrossel
          </SidebarLink>

          <div className="mt-6 pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-sbplast-blue/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center">
              <Link 
                to="/" 
                target="_blank" 
                className="text-sm text-sbplast-blue hover:underline"
              >
                Ver site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
