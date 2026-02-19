import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch, FiUser, FiMail, FiShield, FiAlertTriangle, FiX } from "react-icons/fi";
import { AdminContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const ViewUsers = () => {
  const { getAllUsers, userList, deleteUser, isAdmin } = useContext(AdminContext);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = (userList || []).filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleDeleteClick = (user) => {
    if (!isAdmin) {
      setAccessMessage("فقط مدیران ارشد مجاز به حذف کاربران هستند.");
      setShowAccessDeniedModal(true);
      return;
    }
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleEditClick = (e, user) => {
    if (!isAdmin) {
      e.preventDefault();
      setAccessMessage("شما اجازه ویرایش اطلاعات سایر کاربران را ندارید.");
      setShowAccessDeniedModal(true);
    }
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <Dashboard>
      <div dir="rtl" className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">مدیریت کاربران</h2>
            <p className="text-slate-500 font-bold text-sm">لیست تمامی کاربران، خبرنگاران و مدیران سیستم</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 w-full md:flex-1 md:max-w-md">
            <FiSearch className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="جستجو با نام، ایمیل یا نقش..."
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
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">کاربر</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">نقش کاربری</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">تاریخ عضویت</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shadow-sm group-hover:scale-105 transition-transform">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="font-black text-slate-800 text-sm mb-1">{user.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <FiMail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-6 text-center">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-tighter">
                          <FiShield size={12} />
                          مدیر ارشد
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter">
                          <FiUser size={12} />
                          خبرنگار
                        </span>
                      )}
                    </td>

                    <td className="p-6 text-center">
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </td>

                    <td className="p-6 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin-edit-user/${user.id}`}
                          state={user}
                          onClick={(e) => handleEditClick(e, user)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isAdmin ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 hover:scale-110' : 'text-slate-300 bg-slate-50 cursor-not-allowed'}`}
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isAdmin ? 'text-rose-500 bg-rose-50 hover:bg-rose-100 hover:scale-110' : 'text-slate-300 bg-slate-50 cursor-not-allowed'}`}
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
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiUser size={32} /></div>
                        <p className="text-slate-400 font-bold">هیچ کاربری با این مشخصات یافت نشد.</p>
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
          {filteredUsers.length > 0 ? filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shadow-sm">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-slate-800 text-sm mb-1">{user.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-2">
                    <FiMail size={12} />
                    {user.email}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    {user.isAdmin ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-tighter">
                        <FiShield size={10} />
                        مدیر ارشد
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter">
                        <FiUser size={10} />
                        خبرنگار
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Link
                  to={`/admin-edit-user/${user.id}`}
                  state={user}
                  onClick={(e) => handleEditClick(e, user)}
                  className={`p-2 rounded-lg transition-all ${isAdmin ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 cursor-not-allowed'}`}
                >
                  <FiEdit size={16} />
                </Link>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className={`p-2 rounded-lg transition-all ${isAdmin ? 'text-rose-500 hover:bg-rose-50' : 'text-slate-300 cursor-not-allowed'}`}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center bg-white rounded-[24px] border border-slate-100">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiUser size={32} /></div>
                <p className="text-slate-400 font-bold">هیچ کاربری با این مشخصات یافت نشد.</p>
              </div>
            </div>
          )}
        </div>
      </div>

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
              <h3 className="text-xl font-black text-slate-900 mb-2">حذف حساب کاربری</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                آیا از حذف حساب <span className="text-slate-800">"{userToDelete?.name}"</span> مطمئن هستید؟ این عمل غیرقابل بازگشت است.
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

      {/* Access Denied Modal */}
      <AnimatePresence>
        {showAccessDeniedModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAccessDeniedModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[32px] p-8 shadow-2xl relative z-10 w-full max-w-sm text-center"
              dir="rtl"
            >
              <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiShield size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">عدم دسترسی کافی</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">{accessMessage}</p>
              <button
                onClick={() => setShowAccessDeniedModal(false)}
                className="w-full bg-indigo-600 text-white h-12 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-100"
              >
                متوجه شدم
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Dashboard>
  );
};

export default ViewUsers;
