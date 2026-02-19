import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiSearch, FiPlus, FiClock, FiUser } from "react-icons/fi";
import { AdminContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const ViewNews = () => {
  const { handleNews, newsList, deleteNews } = useContext(AdminContext);
  const [search, setSearch] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  useEffect(() => {
    handleNews();
  }, []);

  const filteredNews = (newsList || []).filter(
    (n) =>
      n.title?.includes(search) ||
      n.author?.includes(search) ||
      n.text?.includes(search)
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleDeleteClick = (item) => {
    setNewsToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (newsToDelete) {
      deleteNews(newsToDelete.id);
    }
    setShowDeleteModal(false);
    setNewsToDelete(null);
  };

  return (
    <Dashboard>
      <div dir="rtl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-full md:flex-1 md:max-w-md">
            <FiSearch className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="جستجو در بین اخبار مدیریت شده..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link
            to="/admin-add-news"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5 w-full md:w-auto"
          >
            <FiPlus size={20} />
            <span>انتشار خبر جدید</span>
          </Link>
        </div>

        {/* Table Container - Desktop */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">تصویر و عنوان</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">نویسنده</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">تاریخ انتشار</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">وضعیت</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredNews.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-slate-100 shrink-0">
                          <img src={item.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="max-w-xs transition-colors group-hover:text-indigo-600">
                          <p className="font-black text-sm text-slate-800 line-clamp-2 leading-snug">{item.title}</p>
                          <span className="text-[10px] font-bold text-indigo-500 mt-1 inline-block uppercase bg-indigo-50 px-2 py-0.5 rounded-md">
                            {item.category?.name || "بدون دسته"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                          <FiUser size={14} className="text-slate-400" />
                        </div>
                        <span className="text-xs font-bold">{item?.user?.name || "نامشخص"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FiClock size={14} />
                        <span className="text-[11px] font-bold tracking-tighter">
                          {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black border border-green-100">منتشر شده</span>
                    </td>
                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedNews(item)}
                          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-100"
                        >
                          <FiEye size={18} />
                        </button>
                        <Link
                          to={`/admin-edit-news/${item.id}`}
                          state={item}
                          className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-100"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-100"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredNews.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <FiSearch size={32} className="text-slate-300" />
              </div>
              <p className="font-black text-slate-400">نتیجه‌ای یافت نشد...</p>
            </div>
          )}
        </div>

        {/* Cards Container - Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredNews.length > 0 ? filteredNews.map((item, index) => (
            <div key={item.id} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-slate-100 shrink-0">
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-800 line-clamp-2 leading-snug mb-2">{item.title}</p>
                  <span className="text-[10px] font-bold text-indigo-500 inline-block uppercase bg-indigo-50 px-2 py-0.5 rounded-md mb-2">
                    {item.category?.name || "بدون دسته"}
                  </span>
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <FiUser size={12} className="text-slate-400" />
                    </div>
                    <span className="text-xs font-bold">{item?.user?.name || "نامشخص"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <FiClock size={12} />
                    <span className="text-[11px] font-bold">
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black border border-green-100">منتشر شده</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedNews(item)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <FiEye size={16} />
                </button>
                <Link
                  to={`/admin-edit-news/${item.id}`}
                  state={item}
                  className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <FiEdit size={16} />
                </Link>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center bg-white rounded-[24px] border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <FiSearch size={32} className="text-slate-300" />
              </div>
              <p className="font-black text-slate-400">نتیجه‌ای یافت نشد...</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
              dir="rtl"
            >
              <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-50">
                <h2 className="text-xl font-black text-slate-900">پیش‌نمایش محتوا</h2>
                <button onClick={() => setSelectedNews(null)} className="w-10 h-10 rounded-full bg-slate-50 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {selectedNews.url && (
                  <img src={selectedNews.url} className="w-full aspect-video object-cover rounded-[32px] shadow-lg shadow-slate-200" alt="" />
                )}

                <div className="max-w-3xl">
                  <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-4 inline-block">{selectedNews.category?.name}</span>
                  <h1 className="text-3xl font-black text-slate-800 leading-tight mb-6">{selectedNews.title}</h1>

                  <div className="flex items-center gap-6 text-sm font-bold text-slate-400 border-y border-slate-50 py-4 mb-8">
                    <span className="flex items-center gap-2"><FiUser className="text-indigo-500" /> {selectedNews?.user?.name}</span>
                    <span className="flex items-center gap-2"><FiClock className="text-indigo-500" /> {new Date(selectedNews.createdAt).toLocaleString("fa-IR")}</span>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-[2] text-lg text-justify whitespace-pre-line">{selectedNews.description}</p>
                  </div>

                  {/* Sub Content Sections */}
                  <div className="mt-12 space-y-12">
                    {[1, 2, 3, 4].map(idx => {
                      const st = selectedNews[`subTitle${idx}`];
                      const sd = selectedNews[`subDescription${idx}`];
                      if (!st && !sd) return null;
                      return (
                        <div key={idx} className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                          <h3 className="text-xl font-black text-slate-800 mb-4">{st}</h3>
                          <p className="text-slate-600 leading-loose text-justify whitespace-pre-line underline-offset-8">{sd}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white p-8 rounded-[32px] shadow-2xl w-full max-w-sm text-center"
              dir="rtl"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-red-50/50">
                <FiTrash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">تأیید عملیات حذف</h3>
              <p className="text-slate-500 text-sm font-bold mb-8 italic-none">آیا از حذف این خبر اطمینان دارید؟ این عملیات غیرقابل بازگشت است.</p>
              <div className="flex gap-4">
                <button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-black transition-all shadow-lg shadow-red-100">بله، حذف کن</button>
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3.5 rounded-2xl font-black transition-all">انصراف</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Dashboard>
  );
};

export default ViewNews;
