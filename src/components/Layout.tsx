import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Owner", path: "/" },
    { name: "Production", path: "/production" },
    { name: "Salesman", path: "/salesman" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Global Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">M</div>
          <h2 className="font-bold text-[18px] tracking-tight">Milan Bakery</h2>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-lg gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-1.5 rounded-md text-[13px] font-medium transition-all",
                  isActive
                    ? "bg-white text-blue-600 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="text-slate-500 text-[14px] hidden sm:block">
          {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
