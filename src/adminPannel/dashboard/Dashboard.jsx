import { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import TopBar from "./TopBar";
import { AdminContext } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard({ children }) {
  const {
    userInfo,
    handleNews,
    newsList,
    getAllCategories,
    categoryList,
    getAllUsers,
    userList,
    getAllComments,
    commentsList,
    getAllVideos,
    videosList,
  } = useContext(AdminContext);

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    userInfo();
    getAllCategories();
    getAllComments();
    getAllUsers();
    getAllVideos();
    handleNews();

    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobile, sidebarOpen]);

  const cards = [
    { title: "کل مقالات", icon: "📰", number: newsList?.length || 0, color: "blue" },
    { title: "دسته‌بندی‌ها", icon: "📂", number: categoryList?.length || 0, color: "indigo" },
    { title: "کاربران فعال", icon: "👥", number: userList?.length || 0, color: "purple" },
    { title: "نظرات جدید", icon: "✉️", number: commentsList?.length || 0, color: "pink" },
    { title: "ویدیوها", icon: "🎥", number: videosList?.length || 0, color: "orange" },
    { title: "لایک‌های کل", icon: "❤️", number: newsList?.reduce((acc, curr) => acc + (curr.numLike || 0), 0) || 0, color: "red" },
  ];

  const sidebarWidth = sidebarOpen ? 260 : (isMobile ? 0 : 80);

  return (
    <div className="admin-panel min-h-screen bg-[#f8fafc] text-slate-800 font-medium selection:bg-indigo-100">
      <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} sidebarWidth={sidebarWidth} />

      <div className="flex flex-row-reverse">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isMobile={isMobile}
        />

        {/* Backdrop for mobile */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Content Wrapper */}
        <main
          className="flex-1 transition-all duration-300"
          style={{
            marginRight: isMobile ? 0 : sidebarWidth,
            paddingTop: "64px", // TopBar height
          }}
          dir="rtl"
        >
          <div className="admin-content p-3 sm:p-4 md:p-8 max-w-[1600px] mx-auto">

            {/* Page Header */}
            <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">داشبورد مدیریت</h1>
                <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  در حال حاضر {userList?.length} مدیر بر روی سیستم فعال هستند
                </p>
              </div>
              <div className="w-full md:w-auto flex justify-start md:justify-end">
                <div className="max-w-full text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-slate-100 italic-none whitespace-nowrap overflow-hidden text-ellipsis">
                {new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    icon={card.icon}
                    number={card.number}
                    color={card.color}
                  />
                ))}
              </div>
            </section>

            {/* Content Slot with Fade In */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl md:rounded-[32px] shadow-sm border border-slate-200/60 p-4 sm:p-6 md:p-10 min-h-[320px] md:min-h-[400px] overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
