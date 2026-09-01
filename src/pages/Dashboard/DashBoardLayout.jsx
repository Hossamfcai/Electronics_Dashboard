import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SidBar";
import { Menu } from "lucide-react";

export default function DashBoardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex min-h-screen relative">
      <div
        className={`fixed inset-0 z-40 bg-black/75 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={closeSidebar}
      />
      {/* sidBar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[80%] sm:w-[55%] transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-72 lg:shrink-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar onClose={closeSidebar} />
      </aside>
      {/* mainContent */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto w-full">
        <header className="flex p-3 pt-0 backdrop-blur-md border-b border-outline-variant lg:hidden">
          <button
            onClick={toggleSidebar}
            aria-label="Open navigation menu"
            className="h-8 w-8 focus:outline-none"
          >
            <Menu className="w-full h-full cursor-pointer hover:opacity-55 transition-opacity duration-300" />
          </button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
