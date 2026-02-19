import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import banner from "../../assets/home/banner.gif";
import logo from "../../assets/home/logo/logo.png";
import logo2 from "../../assets/home/logo/logo2.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (menuOpen || searchActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen, searchActive]);

  const menuItems = [
    { title: "خانه", path: "/" },
    { title: "اقتصاد", path: "/economy" },
    { title: "ورزش", path: "/sports" },
    { title: "درباره ما", path: "/about" },
    { title: "تماس با ما", path: "/contact" },
  ];

  return (
    <>
      {/* ۱. بنر تبلیغاتی */}
      <div className="w-full bg-[#f8fafc] border-b border-gray-100">
        <div className="w-full max-w-[1920px] mx-auto">
          <img
            src={banner}
            alt="تبلیغات"
            className="w-full h-[50px] sm:h-[70px] md:h-auto object-cover md:object-contain transition-all duration-700"
          />
        </div>
      </div>

      {/* ۲. نوار ناوبری با تفکیک بصری قوی */}
      <nav
        className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]"
        dir="rtl"
      >
        {/* خط تزئینی آبی بسیار نازک در بالاترین قسمت برای هویت برند */}
        <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>

        <div className="max-w-[1400px] mx-auto px-4 h-16 lg:h-20 flex items-center justify-between">

          <div className="flex items-center gap-8">
            <Link to="/" className="shrink-0 transition-transform active:scale-95">
              <img src={logo2} alt="مونیوز" className="h-20  lg:h-11 w-auto drop-shadow-sm" />
            </Link>

            <ul className="hidden lg:flex items-center gap-1">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-[14.5px] font-bold px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                        ? "text-blue-700 bg-blue-50/80 shadow-[inset_0_0_0_1px_rgba(29,78,216,0.1)]"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setSearchActive(true)}
              className="p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"
            >
              <FiSearch size={22} />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 bg-[#0f172a] text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              <FaUserCircle size={18} className="text-blue-400" />
              <span>ورود خبرنگار</span>
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <FiMenu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* ۳. سرچ بار تمام‌صفحه اصلاح شده */}
      <AnimatePresence>
        {searchActive && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-white/90 z-[100] flex flex-col p-6 overflow-hidden"
            dir="rtl"
          >
            <div className="flex justify-end max-w-7xl mx-auto w-full">
              <button
                onClick={() => setSearchActive(false)}
                className="p-4 bg-white shadow-lg border border-slate-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <FiX size={28} />
              </button>
            </div>
            <div className="mt-20 w-full max-w-3xl mx-auto px-4">
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                <p className="text-blue-600 font-bold mb-4">جستجوی پیشرفته مونیوز</p>
                <input
                  autoFocus
                  type="text"
                  placeholder="کلیدواژه خود را اینجا بنویسید..."
                  className="w-full text-2xl md:text-4xl border-b-4 border-blue-600 py-6 outline-none font-black bg-transparent placeholder:text-slate-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ۴. منوی موبایل ریسپانسیو با اسکرول داخلی */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
            dir="rtl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <img src={logo} alt="logo" className="h-8" />
              <button onClick={() => setMenuOpen(false)} className="p-2 text-slate-500 bg-slate-50 rounded-xl">
                <FiX size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfdfe]">
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-widest">دسترسی سریع</p>
                <ul className="flex flex-col gap-3">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between w-full text-right p-4 rounded-2xl text-[17px] font-bold transition-all ${isActive
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-[-8px]"
                            : "text-slate-700 bg-white border border-slate-100 shadow-sm"
                          }`
                        }
                      >
                        {item.title}
                        <span className="opacity-30">←</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-[#0f172a] text-white py-5 rounded-[22px] flex justify-center items-center gap-3 font-bold shadow-xl shadow-slate-300 active:scale-95 transition-transform"
                >
                  <FaUserCircle size={22} className="text-blue-400" />
                  ورود به پنل خبرنگاران
                </Link>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 text-center bg-white">
              <p className="text-slate-400 text-xs font-medium">© تمامی حقوق برای رسانه مونیوز محفوظ است</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}