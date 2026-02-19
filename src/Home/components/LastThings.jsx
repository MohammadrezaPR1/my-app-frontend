import { motion } from "framer-motion";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
} from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeContext } from "../context/context";

/* ================= Utils ================= */
const truncateText = (text = "", max = 120) =>
  text.length > max ? text.slice(0, max) + "..." : text;

/* ================= Video Card ================= */
const VideoCard = memo(function VideoCard({
  video,
  index,
  videoRef,
  showOverlay,
  onReplay,
}) {
  return (
    <motion.div
      className="bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-100 relative group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full aspect-video bg-slate-900 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={video.url}
          muted
          preload="metadata"
          controls
        />

        {showOverlay && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
            <div className="text-center p-6 translate-y-4 animate-slideDown">
              <p className="text-white font-black text-xl mb-4">ویدیو را تا انتها مشاهده کنید</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReplay();
                }}
                className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all hover:scale-105"
              >
                پخش مجدد
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 text-right">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">گزارش ویدیویی</span>
        </div>
        <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
          {video.title || "عنوان گزارش ویدیویی"}
        </h3>
        <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
          {video.description || "توضیحات مربوط به این گزارش ویدیویی را اینجا بنویسید."}
        </p>
      </div>
    </motion.div>
  );
});

const NewsCard = memo(function NewsCard({ post, index }) {
  return (
    <Link to={`/news-detail/${post.id}`} state={post} className="group block">
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300"
      >
        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-sm">
          <img
            src={post.url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 text-right">
          <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h4>
          <span className="text-[10px] font-medium text-slate-400 mt-1 inline-block">
            {new Date(post.createdAt).toLocaleDateString("fa-IR")}
          </span>
        </div>
      </motion.article>
    </Link>
  );
});

export default function LastThings() {
  const { videos, loading, lastPosts, loadingLastPost } = useContext(HomeContext);

  const videosArray = useMemo(
    () => (Array.isArray(videos) ? videos : videos ? [videos] : []),
    [videos]
  );

  const videoRefs = useRef([]);
  const timers = useRef([]);
  const [overlay, setOverlay] = useState({});

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setOverlay({});

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.pause();
      video.currentTime = 0;
      video.muted = index === 0;

      if (index === 0) {
        video.play().catch(() => { });
        timers.current[index] = setTimeout(() => {
          video.pause();
          setOverlay((o) => ({ ...o, [index]: true }));
        }, 20000);
      }
    });

    return () => timers.current.forEach(clearTimeout);
  }, [videosArray]);

  const handleReplay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.play();
    setOverlay((o) => ({ ...o, [index]: false }));
  };

  return (
    <div dir="rtl" className="relative z-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

      {/* ویدیوها */}
      <div className="lg:col-span-8 space-y-8">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 bg-red-600 rounded-full"></span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">آخرین ویدیوها</h2>
        </div>

        {loading || videosArray.length === 0 ? (
          <div className="aspect-video bg-slate-100 rounded-[32px] animate-pulse"></div>
        ) : (
          <div className="space-y-6">
            {videosArray.slice(0, 1).map((video, index) => (
              <VideoCard
                key={video.id || index}
                video={video}
                index={index}
                videoRef={(el) => (videoRefs.current[index] = el)}
                showOverlay={overlay[index]}
                onReplay={() => handleReplay(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* لیست اخبار */}
      <div className="lg:col-span-4 space-y-8">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">تازه‌ترین‌ها</h2>
        </div>

        <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100">
          {loadingLastPost ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <Skeleton key={i} height={60} className="rounded-xl" />)}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {lastPosts?.slice(0, 6).map((post, index) => (
                <NewsCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
