import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsCameraVideo,
  BsFillPersonBadgeFill,
  BsNewspaper,
  BsGrid1X2Fill
} from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TfiComments } from "react-icons/tfi";
import { IoMdExit } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { AdminContext } from "../context/context";

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
  const [showNews, setShowNews] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const { logout, isAdmin } = useContext(AdminContext);
  const location = useLocation();

  const handleItemClick = (setMenu) => {
    if (!isOpen) {
      setIsOpen(true);
      setMenu(true);
    } else {
      setMenu((prev) => !prev);
    }
  };

  const closeOnMobile = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <motion.nav
      key="sidebar"
      className={`fixed top-0 right-0 h-full bg-slate-900 text-slate-300 z-50 flex flex-col ${isMobile ? 'border-none' : 'border-l border-slate-800'} shadow-2xl overflow-hidden ${isMobile && !isOpen ? 'pointer-events-none' : ''}`}
      dir="rtl"
      initial={false}
      animate={{
        width: isMobile ? "100%" : (isOpen ? 260 : 80),
        x: isMobile ? (isOpen ? 0 : "100%") : 0,
        opacity: isMobile && !isOpen ? 0 : 1,
        transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
      }}
    >
      {/* Sidebar Header */}
      <div className={`h-16 flex items-center px-6 border-b border-slate-800/50 mb-4 ${isMobile ? 'justify-between' : 'justify-center md:justify-start'}`}>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl">
              M
            </div>
            {isOpen && <span className="font-black text-white tracking-tight">پنل مدیانا</span>}
          </motion.div>
        )}

        {isMobile && isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none">
        <ul className="space-y-2">
          <MenuItem
            icon={<BsGrid1X2Fill size={18} />}
            label="داشبورد"
            link="/admin-dashboard"
            isOpen={isOpen}
            active={location.pathname === "/admin-dashboard"}
            closeOnMobile={closeOnMobile}
          />

          <SubMenu
            icon={<BsNewspaper size={20} />}
            label="مدیریت اخبار"
            isOpen={isOpen}
            show={showNews}
            setShow={setShowNews}
            handleItemClick={handleItemClick}
            items={[
              { label: "لیست اخبار", link: "/admin-view-news" },
              { label: "ارسال خبر جدید", link: "/admin-add-news" },
            ]}
            activePaths={["/admin-view-news", "/admin-add-news"]}
            currentPath={location.pathname}
            closeOnMobile={closeOnMobile}
          />

          {isAdmin && (
            <SubMenu
              icon={<BsFillPersonBadgeFill size={20} />}
              label="مدیریت کاربران"
              isOpen={isOpen}
              show={showUsers}
              setShow={setShowUsers}
              handleItemClick={handleItemClick}
              items={[
                { label: "لیست کاربران", link: "/admin-view-users" },
                { label: "ایجاد کاربر", link: "/admin-add-user" },
              ]}
              activePaths={["/admin-add-user", "/admin-view-users"]}
              currentPath={location.pathname}
              closeOnMobile={closeOnMobile}
            />
          )}

          <SubMenu
            icon={<BsCameraVideo size={20} />}
            label="رسانه و ویدیو"
            isOpen={isOpen}
            show={showVideos}
            setShow={setShowVideos}
            handleItemClick={handleItemClick}
            items={[
              { label: "گالری ویدیوها", link: "/admin-view-videos" },
              { label: "بارگذاری جدید", link: "/admin-add-video" },
            ]}
            activePaths={["/admin-add-video", "/admin-view-videos"]}
            currentPath={location.pathname}
            closeOnMobile={closeOnMobile}
          />

          <MenuItem
            icon={<TfiComments size={20} />}
            label="نظرات کاربران"
            link="/admin-view-comments"
            isOpen={isOpen}
            active={location.pathname === "/admin-view-comments"}
            closeOnMobile={closeOnMobile}
          />

          {isAdmin && (
            <SubMenu
              icon={<BiCategory size={20} />}
              label="دسته‌بندی‌ها"
              isOpen={isOpen}
              show={showCategory}
              setShow={setShowCategory}
              handleItemClick={handleItemClick}
              items={[
                { label: "مدیریت دسته‌ها", link: "/admin-view-categories" },
                { label: "تعریف دسته جدید", link: "/admin-add-category" },
              ]}
              activePaths={["/admin-view-categories", "/admin-add-category"]}
              currentPath={location.pathname}
              closeOnMobile={closeOnMobile}
            />
          )}
        </ul>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${isOpen ? "hover:bg-red-500/10 text-slate-400 hover:text-red-500" : "justify-center text-slate-500 hover:text-red-500"
            }`}
        >
          <IoMdExit size={22} />
          {isOpen && <span className="font-bold text-sm">خروج از سیستم</span>}
        </button>
      </div>
    </motion.nav>
  );
}

const MenuItem = ({ icon, label, link, isOpen, active, closeOnMobile }) => (
  <li>
    <Link
      to={link}
      onClick={closeOnMobile}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative group
        ${active
          ? "bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-600/20"
          : "hover:bg-slate-800/50 hover:text-white"
        }
      `}
    >
      <span className={`${active ? "text-indigo-500" : "text-slate-500 group-hover:text-indigo-400"}`}>
        {icon}
      </span>
      {isOpen && <span className="text-sm truncate">{label}</span>}

      {!isOpen && (
        <div className="fixed right-20 bg-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-xl border border-slate-700">
          {label}
        </div>
      )}

      {active && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
        />
      )}
    </Link>
  </li>
);

const SubMenu = ({
  icon,
  label,
  isOpen,
  show,
  setShow,
  handleItemClick,
  items,
  activePaths = [],
  currentPath,
  closeOnMobile
}) => {
  const isActive = activePaths.some(path => currentPath.startsWith(path));

  useEffect(() => {
    if (isActive) setShow(true);
  }, [currentPath, isActive, setShow]);

  return (
    <li className="relative">
      <button
        onClick={() => handleItemClick(setShow)}
        className={`flex w-full items-center gap-3 p-3 rounded-xl transition-all group
          ${isActive ? "text-indigo-400" : "hover:bg-slate-800/50 hover:text-white"}
        `}
      >
        <span className={`${isActive ? "text-indigo-500" : "text-slate-500 group-hover:text-indigo-400"}`}>
          {icon}
        </span>
        {isOpen && <span className="text-sm font-medium truncate">{label}</span>}
        {isOpen && (
          <div className={`ml-auto transition-transform duration-300 ${show ? "rotate-180" : ""}`}>
            <IoIosArrowDown size={14} />
          </div>
        )}
      </button>

      <AnimatePresence>
        {show && isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-1 mr-4 border-r border-slate-800 overflow-hidden"
          >
            {items.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  onClick={closeOnMobile}
                  className={`block py-2.5 pr-6 text-xs transition-all hover:text-white
                    ${currentPath.startsWith(item.link) ? "text-indigo-400 font-bold" : "text-slate-500"}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
