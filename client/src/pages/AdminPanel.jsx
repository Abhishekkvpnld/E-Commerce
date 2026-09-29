import { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import {
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiChevronRight,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ROLE } from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  const navigationItems = [
    {
      name: "All Users",
      path: "all-users",
      icon: FiUsers,
    },
    {
      name: "All Products",
      path: "all-products",
      icon: FiPackage,
    },
    {
      name: "All Orders",
      path: "all-orders",
      icon: FiShoppingBag,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] bg-slate-50 md:flex hidden overflow-hidden">

      {/* Sidebar */}
      <aside
        className="
          relative
          w-full
          max-w-64
          min-h-[calc(100vh-100px)]
          bg-white
          border-r
          border-slate-200
          shadow-sm
          flex
          flex-col
          animate-[slideIn_0.5s_ease-out]
        "
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-violet-100 via-white to-green-50 opacity-70 pointer-events-none" />

        {/* Profile */}
        <div className="relative px-5 pt-8 pb-7 border-b border-slate-100">

          {/* Profile image */}
          <div className="flex justify-center mb-4">
            <div
              className="
                group
                relative
                w-20
                h-20
                rounded-full
                bg-slate-100
                border-4
                border-white
                shadow-md
                flex
                items-center
                justify-center
                overflow-hidden
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-lg
              "
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                  alt={user?.username}
                />
              ) : (
                <CiUser className="w-10 h-10 text-slate-500" />
              )}

              {/* Online indicator */}
              <span
                className="
                  absolute
                  bottom-1
                  right-1
                  w-4
                  h-4
                  bg-green-500
                  border-2
                  border-white
                  rounded-full
                "
              />
            </div>
          </div>

          {/* User information */}
          <div className="text-center">
            <h2 className="text-base font-semibold text-slate-800 capitalize truncate">
              {user?.username || "Admin"}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {user?.email}
            </p>

            <div className="inline-flex items-center mt-3 px-3 py-1 rounded-full bg-violet-50 border border-violet-100">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mr-2" />
              <span className="text-xs font-medium text-violet-700 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="relative flex-1 px-3 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive = location.pathname.includes(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ease-out
                    ${
                      isActive
                        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                        : "text-slate-600 hover:bg-slate-100 hover:text-violet-700"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-white rounded-r-full" />
                  )}

                  <Icon
                    className={`
                      w-5
                      h-5
                      transition-transform
                      duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-violet-600 group-hover:scale-110"
                      }
                    `}
                  />

                  <span className="flex-1">{item.name}</span>

                  <FiChevronRight
                    className={`
                      w-4
                      h-4
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="relative px-4 pb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-violet-50 border border-slate-100">
            <p className="text-xs font-semibold text-slate-700">
              Admin Dashboard
            </p>

            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Manage users, products and orders from one place.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="
          flex-1
          min-w-0
          p-4
          md:p-5
          overflow-auto
          animate-[fadeIn_0.6s_ease-out]
        "
      >
        <div
          className="
            min-h-full
            bg-white
            rounded-2xl
            border
            border-slate-200
            shadow-sm
            p-4
            md:p-6
          "
        >
          <Outlet />
        </div>
      </main>

      {/* Custom animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
