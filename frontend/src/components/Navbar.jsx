import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  HandHelping,
  LogIn,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const baseStyle =
    "p-3 rounded-xl transition flex justify-center items-center";
  const activeStyle = "bg-primary text-white";
  const inactiveStyle = "text-neutral hover:bg-gray-100";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl py-6 px-4 flex flex-col items-center space-y-6 fixed top-1/2 left-4 transform -translate-y-1/2">
          {/* Toggle (desktop only) */}
          <button className="bg-black text-white rounded-full p-2 mb-4">
            <ChevronRight size={18} />
          </button>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Home size={20} />
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <LayoutDashboard size={20} />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <HandHelping size={20} />
          </NavLink>

          {/* Login */}
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-primary" : "text-neutral"}`
            }
          >
            <LogIn size={20} />
          </NavLink>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 md:hidden z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-primary" : "text-neutral"}`
          }
        >
          <Home size={20} />
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-primary" : "text-neutral"}`
          }
        >
          <LayoutDashboard size={20} />
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-primary" : "text-neutral"}`
          }
        >
          <HandHelping size={20} />
        </NavLink>

        {/* Login */}
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-primary" : "text-neutral"}`
          }
        >
          <LogIn size={20} />
        </NavLink>
      </div>
    </>
  );
}
