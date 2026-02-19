// CommentForm.jsx
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { HomeContext } from "../../context/context";

const formSchema = yup.object({
  name: yup.string().required("عنوان خبر الزامی است"),
  email: yup.string().required("متن خبر الزامی است"),
  subject: yup.string().required("دسته بندی خبر را مشخص کنید"),
  description: yup.string().required("متن نظر الزامی است")
})

export default function CommentForm() {
  const {createComment} = useContext(HomeContext)
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      description: "",
      newsId: id
    },
    onSubmit: (values) => {
     createComment(values)
    },
    validationSchema: formSchema,
  })



  return (

    < form
      onSubmit={formik.handleSubmit}
      className="mt-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4 text-right"
    >
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        ارسال نظر
      </h2>

      {/* Name & Email in one row */}
      <div className="flex gap-4" >
        {/* Name */}
        < div className="flex-1" >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            نام
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-right placeholder:text-right"
            placeholder="نام خود را وارد کنید"
          />
            <p className="text-red-700">
            {formik.touched.name && formik.errors.name}
          </p>
        </div>

        {/* Email */}
        < div className="flex-1" >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-right placeholder:text-right"
            placeholder="example@email.com"
          />
            <p className="text-red-700">
            {formik.touched.email && formik.errors.email}
          </p>
        </div >
      </div >

      {/* Subject */}
      < div >
        <label className="block text-sm font-medium text-gray-600 mb-1">
          موضوع
        </label>
        <input
          type="text"
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange("subject")}
          onBlur={formik.handleBlur("subject")}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-right placeholder:text-right"
          placeholder="موضوع نظر خود را وارد کنید"
        />
          <p className="text-red-700">
            {formik.touched.subject && formik.errors.subject}
          </p>
      </div >

      {/* Comment */}
      < div >
        <label className="block text-sm font-medium text-gray-600 mb-1">
          متن نظر
        </label>
        <textarea
          name="comment"
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-right placeholder:text-right"
          rows="4"
          placeholder="نظر خود را بنویسید..."
        ></textarea>
          <p className="text-red-700">
            {formik.touched.description && formik.errors.description}
          </p>
      </div >

      {/* Submit */}
      < button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
      >
        ارسال نظر
      </button >
    </form >
  );
}
