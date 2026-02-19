import { useContext, useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeContext } from "../context/context";

export default function MoreNews() {
  const {
    categories,
    loadCategoryNews,
    loadingCategoryNews,
    errorCategoryNews,
    categoryNews,
  } = useContext(HomeContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCatId = queryParams.get("cat")
    ? Number(queryParams.get("cat"))
    : null;

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    loadCategoryNews(selectedCatId);
    setVisibleCount(6);
  }, [selectedCatId]);

  const allNews = useMemo(() => categoryNews || [], [categoryNews]);
  const visibleNews = allNews.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div dir="rtl" className="mt-4">

      {/* دکمه‌های دسته‌بندی با استایل مدرن‌تر */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <Link to="/">
          <button
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${selectedCatId === null
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
          >
            همه موارد
          </button>
        </Link>

        {categories.map((cat) => (
          <Link key={cat.id} to={`/?cat=${cat.id}`}>
            <button
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${selectedCatId === cat.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
            >
              {cat.name}
            </button>
          </Link>
        ))}
      </div>

      {loadingCategoryNews && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => <Skeleton key={i} height={350} className="rounded-[32px]" />)}
        </div>
      )}

      {errorCategoryNews && <p className="text-center text-red-500">خطا در دریافت داده‌ها</p>}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCatId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleNews.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group flex flex-col h-full"
            >
              <Link to={`/news-detail/${news.id}`} state={news} className="flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={news.url || "/src/assets/dashboard/images.jpg"}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-1 text-right">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg w-fit mb-3">
                    {news.category?.name}
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                    {news.summary || news.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>{new Date(news.createdAt).toLocaleDateString("fa-IR")}</span>
                    <span className="group-hover:text-blue-600 transition-colors">مطالعه خبر ←</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {visibleCount < allNews.length && !loadingCategoryNews && (
        <div className="flex justify-center mt-12 pb-10">
          <button
            onClick={handleLoadMore}
            className="px-10 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white hover:shadow-xl transition-all"
          >
            مشاهده اخبار بیشتر
          </button>
        </div>
      )}
    </div>
  );
}
