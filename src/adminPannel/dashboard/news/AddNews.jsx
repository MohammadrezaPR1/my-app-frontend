import { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminContext } from "../../context/context";
import { FiImage, FiVideo, FiFileText, FiLayers, FiSave, FiX, FiCheckCircle, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object({
    title: yup.string().required("عنوان خبر الزامی است"),
    description: yup.string().required("متن خبر الزامی است"),
    catId: yup.string().required("دسته بندی خبر را مشخص کنید"),
});

const AddNews = () => {
    const { getAllCategories, categoryList, createNews } = useContext(AdminContext);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);

    const loadImage = (e) => {
        const image = e.target.files[0];
        if (image) {
            setFile(image);
            setPreview(URL.createObjectURL(image));
        }
    };

    const loadImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };

    const loadVideo = (e) => {
        const selectedVideo = e.target.files[0];
        setVideo(selectedVideo);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            catId: "",
            file: "",
            subTitle1: "",
            subDescription1: "",
            subTitle2: "",
            subDescription2: "",
            subTitle3: "",
            subDescription3: "",
            subTitle4: "",
            subDescription4: ""
        },
        onSubmit: (values) => {
            const data = {
                title: values.title,
                description: values.description,
                catId: values.catId,
                file: file,
                images: images,
                video: video,
                subTitle1: values.subTitle1,
                subDescription1: values.subDescription1,
                subTitle2: values.subTitle2,
                subDescription2: values.subDescription2,
                subTitle3: values.subTitle3,
                subDescription3: values.subDescription3,
                subTitle4: values.subTitle4,
                subDescription4: values.subDescription4
            };
            createNews(data);
        },
        validationSchema: formSchema,
    });

    return (
        <Dashboard>
            <div dir="rtl" className="max-w-5xl mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">انتشار خبر جدید</h2>
                        <p className="text-slate-500 font-bold text-sm">محتوای غنی و جذاب برای مخاطبان خود ایجاد کنید</p>
                    </div>
                    <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all w-full sm:w-auto"
                        >
                            <FiX />
                            انصراف
                        </button>
                        <button
                            onClick={formik.handleSubmit}
                            className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-black text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all w-full sm:w-auto"
                        >
                            <FiSave />
                            آماده انتشار
                        </button>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-8 pb-20">

                    {/* Section 1: General Info */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <FiFileText size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">اطلاعات پایه خبر</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">عنوان جذاب برای خبر</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.title && formik.errors.title ? 'border-red-200' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="مثال: کشف جدید در حوزه تکنولوژی هوش مصنوعی..."
                                />
                                {formik.touched.title && formik.errors.title && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.title}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">بدنه اصلی محتوا</label>
                                <textarea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={8}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-medium text-slate-700 leading-loose ${formik.touched.description && formik.errors.description ? 'border-red-200' : 'border-slate-50 focus:border-indigo-100'}`}
                                    placeholder="شرح کامل خبر را اینجا بنویسید..."
                                ></textarea>
                                {formik.touched.description && formik.errors.description && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">دسته‌بندی موضوعی</label>
                                <select
                                    name="catId"
                                    value={formik.values.catId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-indigo-100 transition-all outline-none font-bold text-slate-800 appearance-none"
                                >
                                    <option value="">انتخاب دسته مناسب</option>
                                    {categoryList.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {formik.touched.catId && formik.errors.catId && <p className="text-[10px] font-black text-red-500 mr-2 uppercase tracking-tighter">! {formik.errors.catId}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Media */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <FiImage size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">رسانه و گالری</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">تصویر شاخص هوشمند</label>
                                <div className="relative group">
                                    <div className={`aspect-video rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${preview ? 'border-indigo-200' : 'border-slate-200 hover:border-indigo-300 bg-slate-50/50'}`}>
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <>
                                                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform"><FiPlus size={24} /></div>
                                                <p className="text-xs font-black text-slate-400 italic-none">برای انتخاب تصویر شاخص کلیک کنید</p>
                                            </>
                                        )}
                                        <input type="file" accept="image/*" onChange={loadImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                    {preview && <button type="button" onClick={() => { setPreview(""); setFile([]) }} className="absolute top-4 left-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">✕</button>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">ویدیو خبر (مکمل محتوا)</label>
                                <div className="aspect-video rounded-[24px] border-2 border-dashed border-slate-200 hover:border-indigo-300 bg-slate-50/50 transition-all flex flex-col items-center justify-center gap-4 relative group">
                                    {video ? (
                                        <div className="flex flex-col items-center">
                                            <FiCheckCircle size={40} className="text-green-500 mb-2" />
                                            <p className="text-xs font-black text-slate-700 italic-none line-clamp-1 px-4">{video.name}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform"><FiVideo size={24} /></div>
                                            <p className="text-xs font-black text-slate-400 italic-none">آپلود ویدیوی اختصاصی (اختیاری)</p>
                                        </>
                                    )}
                                    <input type="file" accept="video/*" onChange={loadVideo} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">گالری تصاویر خبر</label>
                                <div className="p-10 border-2 border-dashed border-slate-200 rounded-[28px] bg-slate-50/30">
                                    <div className="flex flex-wrap gap-4 items-center">
                                        {images.map((img, index) => (
                                            <div key={index} className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white relative group">
                                                <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="" />
                                                <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))} className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">✕</button>
                                            </div>
                                        ))}
                                        <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 cursor-pointer hover:border-indigo-400 hover:text-indigo-400 transition-all">
                                            <FiPlus size={28} />
                                            <input type="file" multiple accept="image/*" onChange={loadImages} className="hidden" />
                                        </label>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 mt-6 uppercase tracking-widest italic-none">میتوانید چندین تصویر همزمان انتخاب کنید تا یک اسلایدر در خبر داشته باشید</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Sub-Sections */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                <FiLayers size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">بخش‌های تکمیلی (ساب‌تیتر)</h3>
                        </div>

                        <div className="space-y-10">
                            {[1, 2, 3, 4].map((num) => (
                                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} key={num} className="p-8 rounded-[28px] bg-slate-50/50 border border-slate-100 space-y-6">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">۰{num}</span>
                                        <h4 className="text-sm font-black text-slate-700 italic-none tracking-tight">بخش تکمیلی شماره {num}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <input
                                                name={`subTitle${num}`}
                                                type="text"
                                                value={formik.values[`subTitle${num}`]}
                                                onChange={formik.handleChange}
                                                className="w-full bg-white border-2 border-slate-50 rounded-xl px-4 py-3 focus:border-indigo-100 outline-none font-bold text-sm text-slate-800 placeholder:text-slate-300"
                                                placeholder={`عنوان فرعی ${num}...`}
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <textarea
                                                name={`subDescription${num}`}
                                                value={formik.values[`subDescription${num}`]}
                                                onChange={formik.handleChange}
                                                rows={4}
                                                className="w-full bg-white border-2 border-slate-50 rounded-xl px-6 py-4 focus:border-indigo-100 outline-none font-medium text-sm text-slate-600 leading-relaxed placeholder:text-slate-300"
                                                placeholder="توضیحات این بخش را وارد کنید..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddNews;
