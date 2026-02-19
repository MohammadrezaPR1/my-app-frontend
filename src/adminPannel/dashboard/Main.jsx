import Dashboard from "./Dashboard";
import Card from "./Card";
import { FiUsers, FiLayers, FiFileText, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Main() {
  return (
    <Dashboard>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">به پنل مدیریت خوش آمدید 👋</h1>
          <p className="text-slate-500 font-bold text-base sm:text-lg">امروز چه برنامه‌ای برای مدیریت خبرگزاری دارید؟</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card
            title="کل کاربران"
            number={1250}
            icon={<FiUsers />}
            color="blue"
          />
          <Card
            title="دسته‌بندی‌ها"
            number={12}
            icon={<FiLayers />}
            color="indigo"
          />
          <Card
            title="تعداد اخبار"
            number={458}
            icon={<FiFileText />}
            color="amber"
          />
          <Card
            title="نظرات جدید"
            number={24}
            icon={<FiMessageSquare />}
            color="rose"
          />
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 leading-tight">پلتفرم مدیریت هوشمند محتوای رسانه</h2>
            <p className="text-indigo-100 text-sm sm:text-base md:text-lg font-bold mb-8 md:mb-10 leading-relaxed">
              با استفاده از ابزارهای پیشرفته مدیریت، محتوای خود را کنترل کنید، آمار بازدیدها را بررسی نمایید و با مخاطبان خود در ارتباط باشید.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
                مشاهده آمار پیشرفته
              </button>
              <button className="bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-500/50 transition-all w-full sm:w-auto">
                راهنمای کاربری
              </button>
            </div>
          </div>

          {/* Abstract Shape */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
      </div>
    </Dashboard>
  );
}
