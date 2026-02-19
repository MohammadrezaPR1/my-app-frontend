import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaLock, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { AdminContext } from "../context/context";

// تصاویر
import userIcon from "../../assets/login/user-avatar-svgrepo-com.svg";
import login_baner from "../../assets/login/login_baner.avif";

const formSchema = yup.object({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup.string().required("رمز عبور الزامی است")
});

const Login = () => {
  const { login, error } = useContext(AdminContext);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => login(values),
    validationSchema: formSchema
  });

  return (
    <div className="min-h-screen flex w-full bg-[#f8fafc] overflow-hidden font-['vazir']" dir="rtl">
      
      {/* سمت راست: کادر لاگین داخل باکس شیک */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 bg-white lg:bg-slate-50 shadow-2xl z-20">
        
        {/* باکس اصلی فرم */}
        <div className="w-full max-w-[420px] glass rounded-[28px] p-8 shadow-premium border border-slate-100">
          
          <div className="text-center mb-10">
            <div className="inline-block relative animate-float">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1 shadow-glow">
                <div className="bg-white w-full h-full rounded-full flex items-center justify-center p-2">
                  <img src={userIcon} alt="user" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-black text-slate-800 mt-6 tracking-tight">پنل مدیریت</h1>
            <p className="text-slate-500 font-bold text-sm mt-2">خوش آمدید، لطفاً وارد شوید</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* نمایش ارور (بدون انیمیشن) */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 mr-2">پست الکترونیک</label>
              <div className="relative group">
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="ایمیل مدیریت"
                  className="w-full bg-transparent border border-slate-200 rounded-2xl py-4 pr-12 pl-4 outline-none transition-all focus:border-blue-600 focus:bg-white/60 font-bold text-slate-800"
                />
                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-[10px] mt-1 mr-2 font-bold">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 mr-2">رمز عبور</label>
              <div className="relative group">
                <input
                  {...formik.getFieldProps("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  className="w-full bg-transparent border border-slate-200 rounded-2xl py-4 pr-12 pl-4 outline-none transition-all focus:border-blue-600 focus:bg-white/60 font-bold text-slate-800"
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-[10px] mt-1 mr-2 font-bold">{formik.errors.password}</p>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-200 text-white font-black py-4.5 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg mt-4 shadow-md"
            >
              <span>تایید و ورود</span>
              <FaArrowLeft size={16} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"><FaGoogle /></button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"><FaGithub /></button>
            </div>
            <div className="mt-4">
              <Link to="/" className="text-slate-400 hover:text-blue-700 font-black text-sm transition-colors pb-1">
                بازگشت به سایت اصلی
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* سمت چپ: بنر سرزنده و مدرن (بدون انیمیشن) */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* تصویر پس‌زمینه ثابت */}
        <img 
          src={login_baner} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt="Banner"
        />
        
        {/* اشکال انتزاعی نوری (ثابت) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-right px-16">
          <h2 className="text-6xl font-black text-white leading-tight">
            نبض اخبار <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-cyan-300">در دستان شماست</span>
          </h2>
          <p className="text-xl text-slate-300 mt-6 max-w-xl font-medium leading-relaxed">
            با ورود به پنل مدیریت مونیوز، محتوای خود را با ابزارهای نسل جدید مدیریت کنید و تجربه‌ای متفاوت از روزنامه‌نگاری دیجیتال داشته باشید.
          </p>
        </div>

        {/* خطوط تزئینی پایین */}
        <div className="absolute bottom-10 left-10 flex gap-2">
          <div className="h-1 w-12 rounded-full bg-blue-500"></div>
          <div className="h-1 w-4 rounded-full bg-white/20"></div>
          <div className="h-1 w-4 rounded-full bg-white/20"></div>
        </div>
      </div>

    </div>
  );
};

export default Login;