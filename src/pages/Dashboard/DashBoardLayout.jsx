import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import SideBar from "../../Components/SidBar";

export default function DashBoardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar onClose={closeSidebar} />
      </aside>

      {/* Main content */}
      <main className="min-h-screen lg:ml-72">
        {/* Mobile header */}
        <header className="flex h-14 items-center border-b border-outline-variant bg-surface-container-lowest px-4 lg:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-surface-container-highest"
          >
            <Menu size={22} />
          </button>

          <span className="ml-3 font-display text-lg font-bold text-primary">
            VoltGrid
          </span>
        </header>

        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}