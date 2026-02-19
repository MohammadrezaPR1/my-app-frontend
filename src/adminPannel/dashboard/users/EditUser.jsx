import { useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import { AdminContext } from "../../context/context";
import { FiUserCheck, FiUser, FiMail, FiLock, FiShield, FiSave, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object({
    name: yup.string().required("نام کاربر الزامی است"),
    email: yup.string().email("فرمت ایمیل نامعتبر است").required("ایمیل کاربر الزامی است"),
    password: yup.string().min(6, "پسورد باید حداقل ۶ کاراکتر باشد").optional(),
    confPassword: yup.string().oneOf([yup.ref('password'), null], 'تکرار پسورد با پسورد اصلی مطابقت ندارد'),
    isAdmin: yup.string().required("نقش کاربر باید مشخص شود"),
});

const EditUser = () => {
    const { editUser } = useContext(AdminContext);
    const { id } = useParams();
    const { state } = useLocation();

    const formik = useFormik({
        initialValues: {
            name: state?.name || "",
            email: state?.email || "",
            password: "",
            confPassword: "",
            isAdmin: state?.isAdmin?.toString() || "false",
            id: id
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            editUser(values);
        },
        validationSchema: formSchema,
    });

    return (
        <Dashboard>
            <div dir="rtl" className="max-w-3xl mx-auto px-4 py-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                                <FiUserCheck />
                            </div>
                            ویرایش اطلاعات کاربر
                        </h2>
                        <p className="text-slate-500 font-bold text-sm">بروزرسانی مشخصات و سطح دسترسی کاربر انتخابی</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/30"
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiUser size={14} className="text-indigo-400" />
                                    نام و نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.name && formik.errors.name ? 'border-red-100' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="مثال: سهراب سپهری"
                                />
                                {formik.touched.name && formik.errors.name && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiMail size={14} className="text-indigo-400" />
                                    آدرس ایمیل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.email && formik.errors.email ? 'border-red-100' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="mail@example.com"
                                />
                                {formik.touched.email && formik.errors.email && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiLock size={14} className="text-indigo-400" />
                                    تغییر رمز عبور (اختیاری)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.password && formik.errors.password ? 'border-red-100' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="••••••••"
                                />
                                {formik.touched.password && formik.errors.password && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiLock size={14} className="text-slate-400" />
                                    تکرار رمز عبور جدید
                                </label>
                                <input
                                    type="password"
                                    name="confPassword"
                                    value={formik.values.confPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.confPassword && formik.errors.confPassword ? 'border-red-100' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="••••••••"
                                />
                                {formik.touched.confPassword && formik.errors.confPassword && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.confPassword}</p>}
                            </div>

                            {/* Role */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiShield size={14} className="text-indigo-400" />
                                    سطح دسترسی کاربر
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => formik.setFieldValue('isAdmin', 'false')}
                                        className={`cursor-pointer p-6 rounded-[24px] border-2 transition-all flex items-center gap-4 ${formik.values.isAdmin === 'false' ? 'bg-indigo-50 border-indigo-200 shadow-lg shadow-indigo-100/50' : 'bg-slate-50 border-slate-50 hover:bg-slate-100'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formik.values.isAdmin === 'false' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-white text-slate-400'}`}>
                                            <FiUser size={20} />
                                        </div>
                                        <div>
                                            <div className={`text-sm font-black ${formik.values.isAdmin === 'false' ? 'text-indigo-900' : 'text-slate-600'}`}>خبرنگار</div>
                                            <div className="text-[10px] font-bold text-slate-400 tracking-tight">دسترسی به انتشار خبر</div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => formik.setFieldValue('isAdmin', 'true')}
                                        className={`cursor-pointer p-6 rounded-[24px] border-2 transition-all flex items-center gap-4 ${formik.values.isAdmin === 'true' ? 'bg-rose-50 border-rose-200 shadow-lg shadow-rose-100/50' : 'bg-slate-50 border-slate-50 hover:bg-slate-100'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formik.values.isAdmin === 'true' ? 'bg-white text-rose-600 shadow-sm' : 'bg-white text-slate-400'}`}>
                                            <FiShield size={20} />
                                        </div>
                                        <div>
                                            <div className={`text-sm font-black ${formik.values.isAdmin === 'true' ? 'text-rose-900' : 'text-slate-600'}`}>مدیر ارشد</div>
                                            <div className="text-[10px] font-bold text-slate-400 tracking-tight">مدیریت کل سامانه</div>
                                        </div>
                                    </div>
                                </div>
                                {formik.touched.isAdmin && formik.errors.isAdmin && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.isAdmin}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 border-t border-slate-50">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                <FiSave size={18} />
                                بروزرسانی اطلاعات
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

export default EditUser;
