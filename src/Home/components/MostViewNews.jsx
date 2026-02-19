import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { HomeContext } from "../context/context";

export default function MostViewNews({ isSidebar = false }) {
  const {
    loadMostView,
    loadingMostView,
    errorMostView,
    mostView,
  } = useContext(HomeContext);

  const [visibleCount, setVisibleCount] = useState(isSidebar ? 5 : 4);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, x: isSidebar ? 20 : 0, y: isSidebar ? 0 : 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (isSidebar) {
    return (
      <div dir="rtl" className="space-y-4">
        {loadingMostView ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} height={80} className="rounded-2xl" />)}
          </div>
        ) : (
          mostView?.slice(0, visibleCount).map((news, i) => (
            <Link key={news.id} to={`/news-detail/${news.id}`} state={news} className="group flex items-center gap-3">
              <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm">
                <img src={news.url} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-bold text-slate-800 leading-tight group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {news.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>👁 {news.numViews?.toLocaleString()}</span>
                  <span>•</span>
                  <span>{formatDate(news.createdAt).split(' ')[0]} {formatDate(news.createdAt).split(' ')[1]}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    );
  }

  return (
    <div dir="rtl" className="container mx-auto px-4 mt-16">
      <h2 className="text-2xl font-black mb-10 text-right text-slate-800 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
        پربازدیدترین خبرها
      </h2>

      {errorMostView && <p className="text-center text-red-500">{errorMostView}</p>}

      {loadingMostView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] p-4 flex gap-4 border border-slate-100 shadow-sm">
              <Skeleton width={120} height={120} className="rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton width="80%" height={20} />
                <Skeleton count={2} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mostView?.slice(0, visibleCount).map((news, i) => (
            <Link key={news.id} to={`/news-detail/${news.id}`} state={news} className="block group">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-4 bg-white rounded-[28px] p-4 border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-500"
              >
                <div className="w-32 h-32 shrink-0 rounded-[22px] overflow-hidden">
                  <img src={news.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 py-1">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {news.category?.name}
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-2 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-bold text-slate-400">👁 {news.numViews?.toLocaleString()}</span>
                    <span className="text-[11px] font-bold text-slate-400">{formatDate(news.createdAt)}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      {visibleCount < mostView?.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className="group relative px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl overflow-hidden transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              بیشتر ببینید
              <span className="group-hover:translate-x-1 transition-transform">←</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
