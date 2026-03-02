import { useContext, useState, useEffect, useRef } from 'react';
import { CiUser } from "react-icons/ci";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { FiLogOut, FiShield, FiPackage } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";
import { setUserDetails } from "../redux/userSlice";
import { ROLE } from "../../common/role";
import userContext from '../context/userContext';
import LogoImg from "../assest/logo.jpg";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(userContext);
  const menuRef = useRef(null);

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState(searchQuery);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  // Scroll-aware header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuDisplay(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(endPoints.user_logout.url, { withCredentials: true });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUserDetails(null));
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(99,102,241,0.10)] border-b border-purple-100/60'
          : 'bg-white shadow-sm'
        }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative">
            <img
              src={LogoImg}
              alt="GadgetHub"
              className="w-10 h-10 rounded-xl object-cover shadow-md
                         group-hover:shadow-purple-300/50 group-hover:scale-105
                         transition-all duration-300"
            />
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-purple-400/0 group-hover:bg-purple-400/10 transition-all duration-300" />
          </div>
          <span className="font-extrabold text-lg tracking-tight
                           bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500
                           bg-clip-text text-transparent
                           group-hover:from-purple-500 group-hover:to-indigo-600
                           transition-all duration-300">
            GadgetHub
          </span>
        </Link>

        {/* ── Search bar ── */}
        <div className={`hidden md:flex items-center flex-1 max-w-md mx-4 rounded-xl
                         border transition-all duration-300 overflow-hidden
                         ${searchFocused
            ? 'border-purple-400 shadow-[0_0_0_3px_rgba(139,92,246,0.15)] bg-white'
            : 'border-slate-200 bg-slate-50 hover:border-purple-300'
          }`}>
          <input
            type="text"
            value={search}
            placeholder="Search products here..."
            onChange={handleSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
          />
          <button
            onClick={() => search && navigate(`/search?q=${search}`)}
            className="h-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500
                       hover:from-purple-600 hover:to-indigo-600
                       text-white flex items-center justify-center transition-all duration-200"
          >
            <IoSearchOutline className="text-lg" />
          </button>
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2">

          {/* Cart */}
          {user?._id && (
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-purple-600
                         hover:bg-purple-50 transition-all duration-200 group"
            >
              <IoCartOutline className="text-2xl group-hover:scale-110 transition-transform" />
              {context?.cartProductCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full
                             bg-gradient-to-br from-red-500 to-rose-600
                             text-white text-[10px] font-bold
                             flex items-center justify-center shadow-md"
                >
                  {context?.cartProductCount}
                </motion.span>
              )}
            </Link>
          )}

          {/* User avatar / menu */}
          {user?._id && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuDisplay((prev) => !prev)}
                className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all duration-200
                             ${menuDisplay
                    ? 'border-purple-300 bg-purple-50 shadow-sm'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={user?.username}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500
                                  flex items-center justify-center text-white">
                    <CiUser className="text-lg" />
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[80px] truncate">
                  {user?.username}
                </span>
                <motion.svg
                  animate={{ rotate: menuDisplay ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3.5 h-3.5 text-slate-400 hidden sm:block"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {menuDisplay && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl
                               bg-white border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                               overflow-hidden z-50"
                  >
                    {/* User info */}
                    <div className="px-3 py-2.5 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-700 truncate">{user?.username}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      {user?.role === ROLE.ADMIN && (
                        <Link
                          to="/admin-panel"
                          onClick={() => setMenuDisplay(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600
                                     hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        >
                          <FiShield className="text-base" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/order"
                        onClick={() => setMenuDisplay(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600
                                   hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      >
                        <FiPackage className="text-base" />
                        My Orders
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 py-1">
                      <button
                        onClick={() => { handleLogout(); setMenuDisplay(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500
                                   hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="text-base" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Login button (unauthenticated) */}
          {!user?._id && (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white
                           bg-gradient-to-r from-purple-500 to-indigo-500
                           hover:from-purple-600 hover:to-indigo-600
                           shadow-md hover:shadow-purple-300/50
                           transition-all duration-200"
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      {/* ── Mobile search bar ── */}
      <div className="md:hidden px-4 pb-3">
        <div className={`flex items-center rounded-xl border overflow-hidden transition-all duration-300
                         ${searchFocused
            ? 'border-purple-400 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]'
            : 'border-slate-200 bg-slate-50'
          }`}>
          <input
            type="text"
            value={search}
            placeholder="Search products..."
            onChange={handleSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
          />
          <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <IoSearchOutline className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;