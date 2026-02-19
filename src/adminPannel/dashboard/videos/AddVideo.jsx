import { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FiVideo, FiSave, FiX, FiInfo, FiUpload, FiPlay } from "react-icons/fi";
import { AdminContext } from "../../context/context";
import Dashboard from "../Dashboard";
import { motion } from "framer-motion";

const formSchema = yup.object({
  title: yup.string().required("عنوان ویدیو الزامی است"),
  description: yup.string().required("توضیحات ویدیو الزامی است"),
});

const AddVideo = () => {
  const { addVideo, errorVideo } = useContext(AdminContext);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        file: file,
      };
      addVideo(data);
    },
    validationSchema: formSchema,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Dashboard>
      <div dir="rtl" className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">افزودن ویدیو</h2>
            <p className="text-slate-500 font-bold text-sm">انتشار محتوای ویدیویی جدید در سامانه</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />

            <div className="relative space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">اطلاعات ویدیو</label>
                </div>

                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-slate-50 border-2 ${formik.touched.title && formik.errors.title ? 'border-rose-100' : 'border-slate-50'} focus:border-indigo-500 focus:bg-white rounded-[24px] px-6 py-4 text-sm font-bold text-slate-700 transition-all outline-none placeholder:text-slate-300`}
                      placeholder="عنوان جذاب ویدیو را اینجا بنویسید..."
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-rose-500 text-[10px] font-black mt-2 mr-4 flex items-center gap-1">
                        <FiInfo size={12} /> {formik.errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="description"
                      rows="4"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-slate-50 border-2 ${formik.touched.description && formik.errors.description ? 'border-rose-100' : 'border-slate-50'} focus:border-indigo-500 focus:bg-white rounded-[24px] px-6 py-4 text-sm font-bold text-slate-700 transition-all outline-none placeholder:text-slate-300 resize-none`}
                      placeholder="توضیحات مربوط به ویدیو را وارد کنید..."
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="text-rose-500 text-[10px] font-black mt-2 mr-4 flex items-center gap-1">
                        <FiInfo size={12} /> {formik.errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">فایل ویدیو</label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Dropzone */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="h-[250px] border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50 flex flex-col items-center justify-center p-8 text-center group hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
                        <FiUpload size={28} />
                      </div>
                      <p className="text-sm font-black text-slate-700 mb-1">انتخاب یا درگ فایل ویدیو</p>
                      <p className="text-[10px] font-bold text-slate-400">MP4, WebM up to 100MB</p>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="h-[250px] rounded-[32px] bg-slate-900 overflow-hidden flex items-center justify-center relative">
                    {previewUrl ? (
                      <video src={previewUrl} className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <div className="text-center">
                        <FiVideo size={48} className="text-slate-800 mx-auto mb-2" />
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-tight">پیش‌نمایش ویدیو</p>
                      </div>
                    )}
                    {previewUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
                          <FiPlay size={32} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {errorVideo && (
                  <p className="text-rose-500 text-[10px] font-black mt-2 mr-4 flex items-center gap-1">
                    <FiInfo size={12} /> {errorVideo}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-4 rounded-[20px] font-black text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-[20px] font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiSave size={20} />
              <span>ذخیره ویدیو</span>
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddVideo;
