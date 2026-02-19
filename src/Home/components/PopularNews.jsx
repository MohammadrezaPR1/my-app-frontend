import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow'

import { HomeContext } from "../context/context";

export default function PopularNews() {
  const paginationRef = useRef(null);
  const { popularNews, loadingPopularNews, errorPopularNews } =
    useContext(HomeContext);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div dir="rtl" className="container mx-auto px-4 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-pink-500 rounded-full"></span>
          محبوب‌ترین‌های هفته
        </h2>
      </div>

      {errorPopularNews && <p className="text-center text-red-500">{errorPopularNews}</p>}

      {loadingPopularNews ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-[32px] overflow-hidden shadow-premium bg-white border border-slate-100 p-4">
              <Skeleton height={240} className="rounded-2xl mb-4" />
              <Skeleton width={80} height={20} className="mb-2" />
              <Skeleton height={24} />
            </div>
          ))}
        </div>
      ) : (
        popularNews?.length > 0 && (
          <div className="relative group/swiper">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              centeredSlides={true}
              grabCursor={true}
              loop={true}
              slidesPerView="auto"
              spaceBetween={-20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: paginationRef.current }}
              onBeforeInit={(swiper) => {
                if (swiper.params?.pagination) {
                  swiper.params.pagination.el = paginationRef.current;
                }
              }}
              className="!pb-16 !pt-4"
            >
              {popularNews.map((news) => (
                <SwiperSlide key={news.id} className="!w-[300px] sm:!w-[380px] lg:!w-[420px]">
                  <Link to={`/news-detail/${news.id}`} state={news}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-[32px] overflow-hidden shadow-premium group border border-slate-100 hover:shadow-2xl hover:border-pink-200 transition-all duration-500"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={news.url} alt={news.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                          <span className="text-pink-500 drop-shadow-sm">❤️</span>
                          <span className="text-xs font-bold text-white leading-none">{news.numLike?.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-black text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            {news.category?.name}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 leading-tight transition-colors line-clamp-2 min-h-[56px]">
                          {news.title}
                        </h3>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                            <img src={news.user?.url || "https://ui-avatars.com/api/?name=" + news.user?.name} className="w-8 h-8 rounded-full border border-slate-100" />
                            <span className="text-xs font-bold text-slate-500">{news.user?.name || "تحریریه"}</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">{formatDate(news.createdAt)}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div ref={paginationRef} className="mt-8 flex justify-center gap-2" />
          </div>
        )
      )}
    </div>
  );
}
