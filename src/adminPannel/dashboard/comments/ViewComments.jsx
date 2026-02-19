import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiSearch, FiMessageSquare, FiCheckCircle, FiXCircle, FiAlertTriangle, FiX, FiMail, FiClock } from "react-icons/fi";
import { AdminContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const ViewComments = () => {
  const {
    getAllComments,
    commentsList,
    deleteComment,
    activeComment,
    unActiveComment,
  } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    getAllComments();
  }, []);

  const filteredComments = (commentsList || []).filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleDeleteClick = (item) => {
    setCommentToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (commentToDelete) {
      deleteComment(commentToDelete.id);
    }
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const handleToggleStatus = (id, isActive) => {
    if (isActive) {
      unActiveComment(id);
    } else {
      activeComment(id);
    }
  };

  return (
    <Dashboard>
      <div dir="rtl" className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">مدیریت نظرات</h2>
            <p className="text-slate-500 font-bold text-sm">بررسی و تایید دیدگاه‌های کاربران پلتفرم</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 w-full md:flex-1 md:max-w-md">
            <FiSearch className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="جستجو در نام، ایمیل یا متن..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container - Desktop */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hidden md:block">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">فرستنده</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">تاریخ</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">وضعیت انتشار</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredComments.length > 0 ? filteredComments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shadow-sm group-hover:scale-105 transition-transform">
                        {item.name?.charAt(0) || "C"}
                      </div>
                      <div className="max-w-xs overflow-hidden">
                        <div className="font-black text-slate-800 text-sm mb-1 truncate">{item.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 truncate flex items-center gap-1">
                          <FiMail size={12} className="shrink-0" />
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
                      <FiClock size={12} />
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <button
                      onClick={() => handleToggleStatus(item.id, item.isActive)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black tracking-tight transition-all active:scale-95 ${item.isActive
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}
                    >
                      {item.isActive ? <><FiCheckCircle /> منتشر شده</> : <><FiClock /> در انتظار تایید</>}
                    </button>
                  </td>

                  <td className="p-6 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedComment(item)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-indigo-500 bg-indigo-50 hover:bg-indigo-100 hover:scale-110 transition-all"
                      >
                        <FiEye size={16} />
                      </button>
                      <Link
                        to={`/admin-edit-comment/${item.id}`}
                        state={item}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-amber-500 bg-amber-50 hover:bg-amber-100 hover:scale-110 transition-all"
                      >
                        <FiEdit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-rose-500 bg-rose-50 hover:bg-rose-100 hover:scale-110 transition-all"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiMessageSquare size={32} /></div>
                      <p className="text-slate-400 font-bold">هیچ نظری یافت نشد.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>

        {/* Cards Container - Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredComments.length > 0 ? filteredComments.map((item) => (
            <div key={item.id} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shadow-sm">
                  {item.name?.charAt(0) || "C"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-slate-800 text-sm mb-1 truncate">{item.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-2">
                    <FiMail size={12} className="shrink-0" />
                    {item.email}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <FiClock size={12} />
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(item.id, item.isActive)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black tracking-tight transition-all active:scale-95 ${item.isActive
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}
                    >
                      {item.isActive ? <><FiCheckCircle size={10} /> منتشر شده</> : <><FiClock size={10} /> در انتظار تایید</>}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedComment(item)}
                  className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  <FiEye size={16} />
                </button>
                <Link
                  to={`/admin-edit-comment/${item.id}`}
                  state={item}
                  className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                >
                  <FiEdit size={16} />
                </Link>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center bg-white rounded-[24px] border border-slate-100">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiMessageSquare size={32} /></div>
                <p className="text-slate-400 font-bold">هیچ نظری یافت نشد.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comment Details Modal */}
      <AnimatePresence>
        {selectedComment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedComment(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[40px] shadow-2xl relative z-10 w-full max-w-xl overflow-hidden"
              dir="rtl"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 font-black text-xl">
                    {selectedComment.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedComment.name}</h3>
                    <p className="text-xs font-bold text-slate-400">{selectedComment.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComment(null)}
                  className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:text-rose-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">متن پیام ارسالی</span>
                </div>
                <div className="bg-slate-50 rounded-[32px] p-8 text-slate-700 font-bold text-sm leading-8 whitespace-pre-line border border-slate-100">
                  {selectedComment.description}
                </div>
              </div>
              <div className="p-8 pt-0 flex justify-end">
                <button
                  onClick={() => setSelectedComment(null)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-100"
                >
                  بستن پنجره
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[32px] p-8 shadow-2xl relative z-10 w-full max-w-sm text-center"
              dir="rtl"
            >
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiAlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">حذف دیدگاه</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                آیا از حذف دیدگاه <span className="text-slate-800">"{commentToDelete?.name}"</span> مطمئن هستید؟ این پیام برای همیشه پاک خواهد شد.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 h-12 rounded-2xl font-black text-sm transition-all"
                >
                  انصراف
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-rose-500 hover:bg-rose-600 text-white h-12 rounded-2xl font-black text-sm shadow-lg shadow-rose-100 transition-all"
                >
                  حذف قطعی
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Dashboard>
  );
};

export default ViewComments;
