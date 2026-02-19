import { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdminContext } from "../../context/context";
import { useLocation, useParams } from "react-router-dom";
import { FiImage, FiVideo, FiFileText, FiLayers, FiSave, FiX, FiCheckCircle, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object({
    title: yup.string().required("عنوان خبر الزامی است"),
    description: yup.string().required("متن خبر الزامی است"),
    catId: yup.string().required("دسته بندی خبر را مشخص کنید"),
});

const EditNews = () => {
    const { getAllCategories, categoryList, updateNews, getNewsById } = useContext(AdminContext);
    const { state: locationData } = useLocation();
    const { id } = useParams();

    const [newsData, setNewsData] = useState(locationData || null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(locationData?.url || "");
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
        if (!newsData) {
            const fetchNews = async () => {
                const data = await getNewsById(id);
                if (data) {
                    setNewsData(data);
                    setPreview(data.url || "");
                }
            };
            fetchNews();
        }
    }, [id, newsData, getAllCategories, getNewsById]);

    const formik = useFormik({
        initialValues: {
            title: newsData?.title || "",
            description: newsData?.description || "",
            catId: newsData?.catId || "",
            file: "",
            id: id,
            subTitle1: newsData?.subTitle1 || "",
            subDescription1: newsData?.subDescription1 || "",
            subTitle2: newsData?.subTitle2 || "",
            subDescription2: newsData?.subDescription2 || "",
            subTitle3: newsData?.subTitle3 || "",
            subDescription3: newsData?.subDescription3 || "",
            subTitle4: newsData?.subTitle4 || "",
            subDescription4: newsData?.subDescription4 || "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const data = {
                id: id,
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
            updateNews(data);
        },
        validationSchema: formSchema,
    });

    const getSafeImages = (imgs) => {
        if (!imgs) return [];
        if (Array.isArray(imgs)) return imgs;
        try {
            const parsed = JSON.parse(imgs);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    };

    return (
        <Dashboard>
            <div dir="rtl" className="max-w-5xl mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">ویرایش و اصلاح خبر</h2>
                        <p className="text-slate-500 font-bold text-sm">تغییرات مورد نیاز را اعمال و مجدداً بازبینی کنید</p>
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
                            className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-black text-sm text-white bg-amber-500 hover:bg-amber-600 shadow-xl shadow-amber-100 transition-all w-full sm:w-auto"
                        >
                            <FiSave />
                            بروزرسانی نهایی
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
                            <h3 className="text-lg font-black text-slate-800">اطلاعات محتوایی</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">عنوان خبر</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-bold text-slate-800 ${formik.touched.title && formik.errors.title ? 'border-red-200' : 'border-slate-50 focus:border-indigo-100'}`}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">متن کامل</label>
                                <textarea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={8}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-medium text-slate-700 leading-loose ${formik.touched.description && formik.errors.description ? 'border-red-200' : 'border-slate-50 focus:border-indigo-100'}`}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 mr-2">دسته‌بندی</label>
                                <select
                                    name="catId"
                                    value={formik.values.catId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-indigo-100 transition-all outline-none font-bold text-slate-800 appearance-none"
                                >
                                    <option value="">انتخاب دسته</option>
                                    {(categoryList || []).map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Media */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <FiImage size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">رسانه های ضمیمه</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">تصویر اصلی</label>
                                <div className="relative group">
                                    <div className="aspect-video rounded-[24px] border-2 border-dashed border-indigo-100 bg-slate-50/50 flex flex-col items-center justify-center overflow-hidden">
                                        {preview ? <img src={preview} className="w-full h-full object-cover" alt="" /> : <FiImage size={32} className="text-slate-300" />}
                                        <input type="file" accept="image/*" onChange={loadImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                    <div className="mt-2 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest italic-none">برای تغییر تصویر کلیک کنید</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">ویدیو خبر</label>
                                <div className="aspect-video rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center relative group">
                                    {video ? <FiCheckCircle size={32} className="text-green-500" /> : <FiVideo size={32} className={`text-slate-300 ${newsData?.videoUrl ? 'text-indigo-400' : ''}`} />}
                                    <input type="file" accept="video/*" onChange={loadVideo} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <div className="mt-2 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest italic-none">
                                        {video ? video.name : newsData?.videoUrl ? "ویدیوی قبلی موجود است" : "آپلود ویدیوی جدید"}
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <label className="text-sm font-black text-slate-700 mr-2 block">گالری تصاویر (جایگزین قبلی ها میشود)</label>
                                <div className="p-10 border-2 border-dashed border-slate-200 rounded-[28px] bg-slate-50/30">
                                    <div className="flex flex-wrap gap-4 items-center">
                                        {images.length > 0 ? (
                                            images.map((img, index) => (
                                                <div key={index} className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                                                    <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            ))
                                        ) : newsData?.imagesUrl ? (
                                            getSafeImages(newsData.imagesUrl).map((url, index) => (
                                                <div key={index} className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white opacity-60">
                                                    <img src={url} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            ))
                                        ) : null}
                                        <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 cursor-pointer hover:border-indigo-400 hover:text-indigo-400 transition-all">
                                            <FiPlus size={28} />
                                            <input type="file" multiple accept="image/*" onChange={loadImages} className="hidden" />
                                        </label>
                                    </div>
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
                            <h3 className="text-lg font-black text-slate-800">بخش‌های مکمل</h3>
                        </div>

                        <div className="space-y-10">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="p-8 rounded-[28px] bg-slate-50/50 border border-slate-100 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <input
                                                name={`subTitle${num}`}
                                                type="text"
                                                value={formik.values[`subTitle${num}`]}
                                                onChange={formik.handleChange}
                                                className="w-full bg-white border-2 border-slate-50 rounded-xl px-4 py-3 focus:border-indigo-100 outline-none font-bold text-sm text-slate-800"
                                                placeholder={`عنوان فرعی ${num}...`}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <textarea
                                                name={`subDescription${num}`}
                                                value={formik.values[`subDescription${num}`]}
                                                onChange={formik.handleChange}
                                                rows={4}
                                                className="w-full bg-white border-2 border-slate-50 rounded-xl px-6 py-4 focus:border-indigo-100 outline-none font-medium text-sm text-slate-600 leading-relaxed"
                                                placeholder="توضیحات تکمیلی..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </form>
            </div>
        </Dashboard>
    );
};

export default EditNews;
