import { FiMenu, FiBell, FiExternalLink, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AdminContext } from "../context/context";
import { Link } from "react-router-dom";

export default function TopBar({ toggleSidebar, isMobile, sidebarWidth }) {
    const { profileName, profileImage, logout, userId } = useContext(AdminContext);

    return (
        <header
            className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-2 sm:px-6 transition-all duration-300"
            dir="rtl"
            style={{ marginRight: isMobile ? 0 : sidebarWidth }}
        >
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                >
                    <FiMenu size={24} />
                </button>
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                        مدیانا
                    </span>
                    <span className="hidden sm:inline text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        پنل خبرنگار
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-6" dir="ltr">
                <Link to={`/admin-update-profile/${userId}`} className="hidden sm:flex items-center gap-2 sm:gap-3 pr-2 sm:pr-4 border-r border-slate-200 group hover:opacity-80 transition-opacity min-w-0">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{profileName || "کاربر مونیوز"}</p>
                        <p className="text-[10px] font-bold text-slate-400">تنظیمات پروفایل</p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 group-hover:border-indigo-100 transition-all">
                        <img src={profileImage || "https://ui-avatars.com/api/?name=" + profileName} className="w-full h-full object-cover" alt="avatar" />
                    </div>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    <a
                        href="/"
                        target="_blank"
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all group"
                        title="مشاهده سایت"
                    >
                        <FiExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <button
                        className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                        title="خروج"
                        onClick={logout}
                    >
                        <FiLogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
