import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeContext } from "../../context/context";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function LastRelatedNews() {
  const { id } = useParams();
  const { getRelatedNews, relatedNews, loadingRelatedNews, errorRelatedNews } =
    useContext(HomeContext);

  // گرفتن اخبار مرتبط با هر تغییر آیدی خبر
  useEffect(() => {
    if (id) getRelatedNews(id);
  }, [id]);

  return (
    <div dir="rtl" className="container mx-auto mt-12 p-4">
      <h2 className="text-xl font-bold mb-6">📰 اخبار مرتبط</h2>

      {/* لودینگ */}
      {loadingRelatedNews && (
        <p className="text-gray-500 text-center">در حال بارگذاری...</p>
      )}

      {/* خطا */}
      {errorRelatedNews && (
        <p className="text-red-500 text-center">{errorRelatedNews}</p>
      )}

      {/* لیست اخبار */}
      <div className="flex flex-col gap-6">
        {relatedNews.length > 0 ? (
          relatedNews.map((news) => (
            <motion.div
              key={news.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row cursor-pointer transition-all"
            >
              {/* تصویر خبر */}
              <Link
                to={`/news-detail/${news.id}`}
                state={news}
                className="flex-shrink-0 md:w-56 w-full"
              >
                <img
                  src={news.url || "/src/assets/dashboard/images.jpg"}
                  alt={news.title}
                  className="w-full h-40 md:h-full object-cover"
                />
              </Link>

              {/* جزئیات خبر */}
              <div className="flex flex-col justify-between p-4 flex-1 text-right">
                <div>
                  <Link
                    to={`/news-detail/${news.id}`}
                    state={news}
                    className="block"
                  >
                    <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition">
                      {news.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm leading-6">
                    {news.summary ||
                      (news.description?.slice(0, 120) + "...")}
                  </p>
                </div>

                {/* اطلاعات نویسنده */}
                <div className="flex items-center justify-start gap-3 mt-4">
                  <img
                    src={
                      news.user?.url ||
                      "/src/assets/dashboard/profile.png"
                    }
                    alt={news.user?.name || "نویسنده"}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {news.user?.name || "نویسنده ناشناس"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaRegCalendarAlt className="text-gray-400" />
                      {new Date(news.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          !loadingRelatedNews && (
            <p className="text-gray-500 text-center">خبری در این دسته‌بندی یافت نشد.</p>
          )
        )}
      </div>
    </div>
  );
}
