import { useContext } from "react";
import Dashboard from "../Dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminContext } from "../../context/context";
import { FiGrid, FiSave, FiX, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object({
    name: yup.string().required("عنوان دسته‌بندی الزامی است"),
});

const AddCategory = () => {
    const { createCategory } = useContext(AdminContext);
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values) => {
            createCategory(values);
        },
        validationSchema: formSchema,
    });

    return (
        <Dashboard>
            <div dir="rtl" className="max-w-2xl mx-auto py-12 px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <FiGrid />
                        </div>
                        ایجاد دسته‌بندی جدید
                    </h2>
                    <p className="text-slate-500 font-bold text-sm">یک عنوان منحصر به فرد برای گروه‌بندی اخبار تعریف کنید</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/50"
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-8">
                        {/* Category Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                <FiTag size={14} className="text-indigo-400" />
                                عنوان دسته‌بندی
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.name && formik.errors.name ? 'border-red-100' : 'border-slate-50 focus:border-indigo-100'}`}
                                placeholder="مثال: ورزشی، اقتصادی و ..."
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.name}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 border-t border-slate-50">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                <FiSave size={18} />
                                ثبت دسته‌بندی
                            </button>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="w-full sm:w-auto px-8 bg-slate-100 hover:bg-slate-200 text-slate-500 h-14 rounded-2xl font-black text-sm transition-all"
                            >
                                انصراف
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </Dashboard>
    );
};

export default AddCategory;
