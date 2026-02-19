import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaCalendarAlt, FaFolder } from "react-icons/fa";

export default function NewsMain({ data }) {
  if (!data) {
    return (
      <div className="text-center text-gray-500 py-10">
        در حال بارگذاری اطلاعات خبر...
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "تاریخ نامشخص";
    }
  };

  return (
    <motion.div
      className="space-y-6 text-right max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200"
      dir="rtl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* تصویر خبر */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-lg w-full group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={data.url}
          alt={data.title}
          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* دسته‌بندی روی تصویر */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1 rounded-lg text-sm shadow-lg">
          {data.category?.name || "بدون دسته‌بندی"}
        </span>
      </motion.div>

      {/* عنوان خبر */}
      <h1 className="text-3xl font-extrabold text-gray-900 leading-snug hover:text-blue-600 transition-colors">
        {data.title}
      </h1>

      {/* متادیتا - بالای توضیحات */}
      <motion.div
        className="flex flex-wrap items-center gap-6 text-gray-600 text-sm border-y border-gray-200 py-4 justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {/* تاریخ */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow hover:shadow-lg hover:bg-red-50 transition-all duration-300 cursor-default">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full shadow-md">
            <FaCalendarAlt className="text-white text-base" />
          </div>
          <span className="font-medium">{formatDate(data.createdAt)}</span>
        </div>

        {/* نویسنده */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition-all duration-300 cursor-default">
          <img
            src={data.user?.url || "/default-user.jpg"}
            alt={data.user?.name}
            className="w-9 h-9 rounded-full border border-gray-300 object-cover shadow"
          />
          <span className="font-medium">{data.user?.name || "نویسنده نامشخص"}</span>
        </div>

        {/* دسته‌بندی */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow hover:shadow-lg hover:bg-green-50 transition-all duration-300 cursor-default">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-full shadow-md">
            <FaFolder className="text-white text-base" />
          </div>
          <span className="font-medium">{data.category?.name || "بدون دسته‌بندی"}</span>
        </div>

        {/* بازدید */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow hover:shadow-lg hover:bg-purple-50 transition-all duration-300 cursor-default">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-full shadow-md">
            <FaEye className="text-white text-base" />
          </div>
          <span className="font-medium">{data.numViews} بازدید</span>
        </div>
      </motion.div>

      {/* توضیحات اصلی خبر */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="leading-9 text-gray-800 text-justify text-lg mb-6">
          {data.description}
        </p>
      </motion.div>

      {/* ویدیو خبر */}
      {data.videoUrl && (
        <motion.div
          className="my-8 rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <video
            controls
            className="w-full max-h-[500px] bg-black"
            src={data.videoUrl}
          >
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </motion.div>
      )}

      {/* حذف بخش قدیمی نمایش انبوه تصاویر از اینجا */}

      {/* جزئیات تکمیلی */}
      {(data.subTitle1 || data.subDescription1 || data.subTitle2 || data.subDescription2 ||
        data.subTitle3 || data.subDescription3 || data.subTitle4 || data.subDescription4) && (
          <motion.div
            className="mt-5 rounded-2xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* بخش اول */}
            {(data.subTitle1 || data.subDescription1) && (
              <div>
                {data.subTitle1 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {data.subTitle1}
                  </h3>
                )}
                {data.subDescription1 && (
                  <p className="text-gray-700 text-lg leading-8 text-justify whitespace-pre-wrap">
                    {data.subDescription1}
                  </p>
                )}
                {/* تصاویر بعد از بخش اول */}
                {JSON.parse(data.imagesUrl || "[]").slice(0, 2).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {JSON.parse(data.imagesUrl || "[]").slice(0, 2).map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64">
                        <img src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* بخش دوم */}
            {(data.subTitle2 || data.subDescription2) && (
              <div>
                {data.subTitle2 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {data.subTitle2}
                  </h3>
                )}
                {data.subDescription2 && (
                  <p className="text-gray-700 text-lg leading-8 text-justify whitespace-pre-wrap">
                    {data.subDescription2}
                  </p>
                )}
                {/* تصاویر بعد از بخش دوم */}
                {JSON.parse(data.imagesUrl || "[]").slice(2, 4).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {JSON.parse(data.imagesUrl || "[]").slice(2, 4).map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64">
                        <img src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* بخش سوم */}
            {(data.subTitle3 || data.subDescription3) && (
              <div>
                {data.subTitle3 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {data.subTitle3}
                  </h3>
                )}
                {data.subDescription3 && (
                  <p className="text-gray-700 text-lg leading-8 text-justify whitespace-pre-wrap">
                    {data.subDescription3}
                  </p>
                )}
                {/* تصاویر بعد از بخش سوم */}
                {JSON.parse(data.imagesUrl || "[]").slice(4, 6).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {JSON.parse(data.imagesUrl || "[]").slice(4, 6).map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64">
                        <img src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* بخش چهارم */}
            {(data.subTitle4 || data.subDescription4) && (
              <div>
                {data.subTitle4 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {data.subTitle4}
                  </h3>
                )}
                {data.subDescription4 && (
                  <p className="text-gray-700 text-lg leading-8 text-justify whitespace-pre-wrap">
                    {data.subDescription4}
                  </p>
                )}
                {/* تصاویر بعد از بخش چهارم */}
                {JSON.parse(data.imagesUrl || "[]").slice(6, 8).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {JSON.parse(data.imagesUrl || "[]").slice(6, 8).map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64">
                        <img src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* اگر تصاویر بیشتری باقی مانده باشد */}
            {JSON.parse(data.imagesUrl || "[]").slice(8).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {JSON.parse(data.imagesUrl || "[]").slice(8).map((url, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64">
                    <img src={url} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
    </motion.div>
  );
}