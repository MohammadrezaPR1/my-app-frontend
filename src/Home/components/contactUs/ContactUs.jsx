import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useContext } from "react";
import { HomeContext } from "../../context/context";
import image from "../../../assets/home/contact.jpg";

// اسکیما اعتبارسنجی
const formSchema = yup.object({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  subject: yup.string().required("عنوان پیام الزامی است").min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  message: yup.string().required("متن پیام الزامی است").min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

const ContactUs = () => {
  const { contactUsByEmail } = useContext(HomeContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      contactUsByEmail(values);
      formik.resetForm();
    },
  });

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-10 gap-10">
        {/* فرم تماس */}
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-4 text-center">
            فرم تماس با ما
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            لطفاً اطلاعات خود را وارد کنید تا در سریع‌ترین زمان ممکن با شما تماس بگیریم.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* ایمیل */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">ایمیل</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="ایمیل خود را وارد کنید"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 focus:ring-red-500"
                    : "border-blue-300 focus:ring-blue-400"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* عنوان */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">عنوان</label>
              <input
                type="text"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="عنوان پیام را وارد کنید"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.subject && formik.errors.subject
                    ? "border-red-400 focus:ring-red-500"
                    : "border-blue-300 focus:ring-blue-400"
                }`}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.subject}</p>
              )}
            </div>

            {/* پیام */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">پیام</label>
              <textarea
                name="message"
                rows="5"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="متن پیام خود را وارد کنید"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-400 focus:ring-red-500"
                    : "border-blue-300 focus:ring-blue-400"
                }`}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>

            {/* دکمه ارسال */}
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-lg shadow-lg font-semibold text-lg transition-all"
            >
              ارسال پیام
            </button>
          </form>
        </div>

        {/* تصویر */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={image}
            alt="تماس با ما"
            className="rounded-2xl shadow-xl w-full max-h-[600px] object-cover"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;