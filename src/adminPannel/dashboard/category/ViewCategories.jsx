import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { FiEdit, FiTrash2, FiSearch, FiPlus, FiGrid, FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const ViewCategories = () => {
  const { getAllCategories, categoryList, deleteCategory } = useContext(AdminContext);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const filteredCategories = (categoryList || []).filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (item) => {
    setCategoryToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
    }
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  return (
    <Dashboard>
      <div dir="rtl" className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">مدیریت دسته‌بندی‌ها</h2>
            <p className="text-slate-500 font-bold text-sm">ایجاد و ویرایش گروه‌های موضوعی اخبار</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 w-full sm:w-80">
              <FiSearch className="text-slate-400" size={20} />
              <input
                type="text"
                placeholder="جستجو در نام دسته‌ها..."
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link
              to="/admin-add-category"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <FiPlus size={20} />
              <span>افزودن دسته</span>
            </Link>
          </div>
        </div>

        {/* Table Container - Desktop */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest w-24">ردیف</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">نام دسته‌بندی</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCategories.length > 0 ? filteredCategories.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="font-black text-slate-700 text-base">{item.name}</span>
                    </td>
                    <td className="p-6 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin-edit-category/${item.id}`}
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
                    <td colSpan="3" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiGrid size={32} /></div>
                        <p className="text-slate-400 font-bold">هیچ دسته‌بندی یافت نشد.</p>
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
          {filteredCategories.length > 0 ? filteredCategories.map((item, index) => (
            <div key={item.id || index} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xs">
                    {index + 1}
                  </div>
                  <span className="font-black text-slate-700 text-base">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin-edit-category/${item.id}`}
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
            </div>
          )) : (
            <div className="p-20 text-center bg-white rounded-[24px] border border-slate-100">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><FiGrid size={32} /></div>
                <p className="text-slate-400 font-bold">هیچ دسته‌بندی یافت نشد.</p>
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
              <h3 className="text-xl font-black text-slate-900 mb-2">حذف دسته‌بندی</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                آیا از حذف دسته‌بندی <span className="text-slate-800">"{categoryToDelete?.name}"</span> مطمئن هستید؟ تمامی اخبار مرتبط بدون دسته خواهند شد.
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
    </Dashboard >
  );
};

export default ViewCategories;
