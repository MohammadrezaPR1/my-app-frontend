import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp, FaTwitter, FaFacebookF, FaHeart } from "react-icons/fa";

import NewsMain from "./NewsMain";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Footer from "../Footer";
import Navbar from "../Navbar";

import banner from "../../../assets/home/banner1.gif";
import banner2 from "../../../assets/home/banner2.gif";
import banner3 from "../../../assets/home/banner3.gif";
import banner4 from "../../../assets/home/banner4.gif";

import { HomeContext } from "../../context/context";
import LastRelatedNews from "./LastRelatedNews";

export default function NewsDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const { loadNewsDtail, likeNews, dislikeNews } = useContext(HomeContext);

  const banners = [banner, banner2, banner3, banner4];
  const [likedStatus, setLikedStatus] = useState('none');
  const [showHeart, setShowHeart] = useState(false);

  const effectRan = useRef(false);

  useEffect(() => {
    // اگر قبلاً اجرا شده، دوباره اجرا نکن
    if (effectRan.current === false) {
      loadNewsDtail(id);
      effectRan.current = true;
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [id]);

  // کلیک روی دکمه لایک/دیسلایک
  const handleLike = async () => {
    try {
      let res;
      if (likedStatus === 'liked') {
        res = await dislikeNews(id);
        if (res && res.data && !res.data.error) {
          setLikedStatus('disliked');
        }
      } else {
        res = await likeNews(id);
        if (res && res.data && !res.data.error) {
          setLikedStatus('liked');
          setShowHeart(true);
          setTimeout(() => setShowHeart(false), 1200);
        }
      }
      await loadNewsDtail(id);
    } catch (error) {
      console.error("خطا در ثبت لایک:", error);
    }
  };

  // دکمه‌های اشتراک گذاری
  const shareButtons = [
    {
      icon: <FaTelegramPlane />,
      color: "bg-blue-500",
      link: `https://t.me/share/url?url=${window.location.href}`,
    },
    {
      icon: <FaWhatsapp />,
      color: "bg-green-500",
      link: `https://wa.me/?text=${window.location.href}`,
    },
    {
      icon: <FaTwitter />,
      color: "bg-sky-500",
      link: `https://twitter.com/intent/tweet?url=${window.location.href}`,
    },
    {
      icon: <FaFacebookF />,
      color: "bg-blue-700",
      link: `https://facebook.com/sharer/sharer.php?u=${window.location.href}`,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-gray-50 min-h-screen p-4">
        {/* بخش اشتراک‌گذاری در دسکتاپ */}
        <div className="hidden lg:flex flex-col gap-3 w-16 items-center bg-white rounded-xl shadow-lg border border-gray-200 p-3 h-fit sticky top-24">
          {shareButtons.map((btn, i) => (
            <a
              key={i}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.color} text-white p-3 rounded-full hover:scale-110 transition-transform`}
            >
              {btn.icon}
            </a>
          ))}
        </div>

        {/* بخش اصلی خبر */}
        <div className="w-full lg:w-3/5 bg-white shadow-xl rounded-2xl overflow-hidden p-6 border border-gray-200 relative">
          <NewsMain data={state} />

          {/* بخش لایک خبر */}
          <div className="mt-6 mb-6 text-center bg-gray-100 rounded-xl p-4 shadow-sm border border-gray-200 relative">
            <p className="text-gray-700 text-lg font-medium mb-3">
              آیا این خبر را دوست داشتید؟
            </p>
            <button
              onClick={handleLike}
              className={`flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full shadow-md text-white transition-all duration-300 ${
                likedStatus === 'liked' ? "bg-red-500 scale-105" : 
                likedStatus === 'disliked' ? "bg-gray-500 scale-105" : 
                "bg-red-400 hover:bg-red-500"
                }`}
            >
              <FaHeart className={`text-xl ${likedStatus === 'liked' ? "animate-pulse" : ""}`} />
              {likedStatus === 'liked' ? "شما لایک کردید" : 
               likedStatus === 'disliked' ? "شما دیسلایک کردید" : 
               "لایک"}
            </button>
          </div>

          {/* دکمه‌های اشتراک گذاری در موبایل */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            {shareButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn.color} text-white p-3 rounded-full hover:scale-110 transition-transform`}
              >
                {btn.icon}
              </a>
            ))}
          </div>

          <hr className="my-6 border-t-2 border-gray-200" />

          {/* فرم و لیست نظرات */}
          <LastRelatedNews />
          <CommentForm />
          <CommentList />
        </div>

        {/* تبلیغات سمت راست */}
        <div className="hidden lg:flex flex-col gap-5 w-1/5 bg-white p-4 rounded-xl shadow-lg border border-gray-200 sticky top-24 h-fit">
          {banners.map((ad, i) => (
            <a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-105"
            >
              <img
                src={ad}
                alt={`banner-${i + 1}`}
                className="rounded-lg shadow-md border border-gray-200 w-full"
              />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
