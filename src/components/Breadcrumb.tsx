
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="py-2">
      <ol className="flex flex-wrap items-center text-sm">
        <li className="breadcrumb-item">
          <Link to="/" className="text-sbplast-blue hover:text-sbplast-lightBlue">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'text-gray-600' : ''}`}>
            {item.url && index !== items.length - 1 ? (
              <Link to={item.url} className="text-sbplast-blue hover:text-sbplast-lightBlue">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
