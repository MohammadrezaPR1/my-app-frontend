import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminContext } from "../../context/context";
import Dashboard from "../Dashboard";
import { useParams } from "react-router-dom";
import { FiUser, FiLock, FiCamera, FiSave, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object({
    name: yup.string().required("نام و نام خانوادگی الزامی است"),
    password: yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد").required("رمز عبور الزامی است"),
    confPassword: yup.string().oneOf([yup.ref('password'), null], 'تکرار رمز عبور با رمز عبور مطابقت ندارد')
});

const UpdateProfile = () => {
    const { updateProfile, profileName, profileImage, userInfo } = useContext(AdminContext);
    const { id } = useParams();
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        userInfo();
    }, []);

    useEffect(() => {
        if (profileName) {
            formik.setFieldValue("name", profileName);
        }
        if (profileImage) {
            setPreview(profileImage);
        }
    }, [profileName, profileImage]);

    const loadImage = (e) => {
        const image = e.target.files[0];
        if (image) {
            setFile(image);
            setPreview(URL.createObjectURL(image));
        }
    };

    const formik = useFormik({
        initialValues: {
            name: profileName || "",
            password: "",
            confPassword: "",
            id: id,
            file: "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const data = {
                name: values.name,
                password: values.password,
                confPassword: values.confPassword,
                file: file,
                id: id
            };
            updateProfile(data);
        },
        validationSchema: formSchema,
    });

    return (
        <Dashboard>
            <div dir="rtl" className="max-w-2xl mx-auto py-10 px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">تنظیمات حساب کاربری</h2>
                    <p className="text-slate-500 font-bold text-sm">اطلاعات امنیتی و پروفایل خود را بروزرسانی کنید</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/50"
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-8">

                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-[32px] bg-slate-50 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-slate-300">
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" alt="Profile" />
                                    ) : (
                                        <FiUser size={48} />
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-indigo-700 hover:scale-110 transition-all">
                                    <FiCamera size={18} />
                                    <input type="file" accept="image/*" onChange={loadImage} className="hidden" />
                                </label>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">تغییر تصویر پروفایل</p>
                        </div>

                        <div className="space-y-6">
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
                                    placeholder="مثال: محمد رضایی"
                                />
                                {formik.touched.name && formik.errors.name && <p className="text-[10px] font-black text-red-500 mr-2 uppercase">{formik.errors.name}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiLock size={14} className="text-indigo-400" />
                                    رمز عبور جدید
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
                                {formik.touched.password && formik.errors.password && <p className="text-[10px] font-black text-red-500 mr-2 uppercase">{formik.errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2 flex items-center gap-2">
                                    <FiLock size={14} className="text-slate-400" />
                                    تکرار رمز عبور
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
                                {formik.touched.confPassword && formik.errors.confPassword && <p className="text-[10px] font-black text-red-500 mr-2 uppercase">{formik.errors.confPassword}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 border-t border-slate-50">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                <FiSave size={18} />
                                ذخیره تغییرات
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

export default UpdateProfile;
