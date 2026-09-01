import { LayoutDashboard, Package, PlusSquare, Cpu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", path: "/Dashboard/Home", icon: LayoutDashboard },
  { label: "Products List", path: "/Dashboard/ProductList", icon: Package },
  { label: "Add Product", path: "/Dashboard/AddProduct", icon: PlusSquare },
];

export default function SideBar({ onClose }) {
  const { pathname } = useLocation();

  const activeStyles =
    "flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-2 font-label-md text-label-md font-bold scale-[1.02] transition-all duration-300 pl-6";
  const inactiveStyles =
    "flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-highest px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200";

  return (
    <nav className="w-[90%] sm:w-[70%] lg:w-full flex flex-col h-full p-5 gap-8 bg-surface-container-low border-r border-outline-variant shadow-sm shrink-0">
      {/* logoContainer */}
      <div className="flex items-center justify-between">
        <Link
          to="/landingPage"
          onClick={onClose}
          className="flex items-center gap-3 px-2 transition-all duration-200 hover:scale-[1.02]"
        >
          <Cpu className="text-primary w-7 h-7 shrink-0" />
          <div>
            <div className="font-headline-sm text-[16px] text-primary font-bold leading-tight">
              VoltGrid
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Product Management
            </div>
          </div>
        </Link>

        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest lg:hidden focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      {/* {navigation links} */}
      <div className="flex-1 space-y-2">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={isActive ? activeStyles : inactiveStyles}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
