import {
  CircleHelp,
  Cpu,
  LayoutDashboard,
  Package,
  PlusSquare,
  Settings,
  Wifi,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    label: "Dashboard",
    path: "/Dashboard/Home",
    icon: LayoutDashboard,
  },
  {
    label: "Products List",
    path: "/Dashboard/ProductList",
    icon: Package,
  },
  {
    label: "Add Product",
    path: "/Dashboard/AddProduct",
    icon: PlusSquare,
  },
];

export default function SideBar({ onClose }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex h-full w-full flex-col border-r border-outline-variant bg-surface-container-low p-5 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <Link
          to="/landingPage"
          onClick={onClose}
          className="flex items-center gap-3 px-2 transition hover:scale-[1.02]"
        >
          <Cpu className="h-7 w-7 shrink-0 text-primary" />

          <div>
            <div className="font-display text-base font-bold leading-tight text-primary">
              VoltGrid
            </div>

            <div className="mt-1 text-[10px] text-on-surface-variant">
              Product Management
            </div>
          </div>
        </Link>

        {/* Close button - mobile only */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-highest lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex-1 space-y-2">
        {navLinks.map((item) => {
          const Icon = item.icon;

          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                isActive
                  ? "bg-primary-container font-bold text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="space-y-2">
        {/* System Online */}
        <div className="mb-3 flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest py-2 text-[10px] font-semibold text-primary">
          <Wifi size={14} />
          <span>System Online</span>
        </div>

        {/* Settings */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant transition hover:bg-surface-container-highest"
        >
          <Settings size={17} />
          <span>Settings</span>
        </button>

        {/* Support */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant transition hover:bg-surface-container-highest"
        >
          <CircleHelp size={17} />
          <span>Support</span>
        </button>
      </div>
    </nav>
  );
}