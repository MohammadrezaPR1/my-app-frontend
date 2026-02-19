import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import background from "../assets/home/not_found.jpg";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black" dir="rtl">
      {/* تصویر پس‌زمینه سبک‌تر با لیزی‌لود */}
      <img
        src={background}
        alt="404 Background"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* لایه تیره برای خوانایی */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* محتوای اصلی */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6">
        {/* شماره 404 با انیمیشن بسیار سبک */}
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold text-red-500 drop-shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* متن توضیحی */}
        <motion.p
          className="mt-6 text-lg md:text-2xl font-semibold text-gray-200 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          متأسفیم! صفحه‌ای که به دنبالش هستید پیدا نشد.
          <br />
          ممکن است حذف شده باشد یا آدرس را اشتباه وارد کرده‌اید.
        </motion.p>

        {/* دکمه بازگشت با انیمیشن ریز و سبک */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg font-semibold text-lg transition-all duration-300"
            >
              بازگشت به صفحه اصلی
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
