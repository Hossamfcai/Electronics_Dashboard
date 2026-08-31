import { LayoutDashboard, Package, PlusSquare, Cpu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  const currentTab = location.pathname.split("/").pop();
  return (
    <nav className="flex flex-col h-full w-full p-5 gap-8 bg-surface-container-low border-r border-outline-variant shadow-sm">
      <Link
        to={"/landingPage"}
        className="flex items-center gap-3 mb-xl px-4 mt-sm hover:scale-[1.02] transitio-all duration-200"
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

      <div className="flex-1 space-y-4">
        <Link
          className={
            currentTab == "Home"
              ? "flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-2 font-label-md text-label-md font-bold scale-[1.02] transition-all duration-300 pl-6"
              : "flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-highest px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200"
          }
          to={"/Dashboard/Home"}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          Dashboard
        </Link>

        <Link
          className={
            currentTab == "ProductList"
              ? "flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-2 font-label-md text-label-md font-bold scale-[1.02] transition-all duration-300 pl-6"
              : "flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-highest px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200"
          }
          to={"/Dashboard/ProductList"}
        >
          <Package className="w-5 h-5 shrink-0" />
          Products List
        </Link>

        <Link
          className={
            currentTab == "AddProduct"
              ? "flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-2 font-label-md text-label-md font-bold scale-[1.02] transition-all duration-300 pl-6"
              : "flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-highest px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200"
          }
          to={"/Dashboard/AddProduct"}
        >
          <PlusSquare className="w-5 h-5 shrink-0" />
          Add Product
        </Link>
      </div>
    </nav>
  );
}
