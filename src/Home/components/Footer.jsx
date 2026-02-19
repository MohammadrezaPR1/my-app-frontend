import { FaFacebookF, FaTwitter, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import logo from "../../assets/home/logo/logo.png"; // مسیر لوگو

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12" dir="rtl">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* درباره ما با لوگو */}
        <div>
          {/* لوگو */}
          <div className="mb-4">
            <img src={logo} alt="لوگو مونیوز" className="h-12 w-auto object-contain" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-yellow-600 inline-block pb-1">درباره ما</h3>
          <p className="text-sm leading-6">
            این سایت خبری با هدف ارائه‌ی سریع و دقیق آخرین اخبار داخلی و بین‌المللی ایجاد شده است.
            ما تلاش می‌کنیم محتوایی معتبر و به‌روز را برای شما فراهم کنیم.
          </p>
        </div>

        {/* لینک‌های مفید */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-blue-600 inline-block pb-1">لینک‌های مفید</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-blue-600 transition-colors">خانه</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">آخرین اخبار</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">محبوب‌ترین‌ها</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">تماس با ما</a></li>
          </ul>
        </div>

        {/* خبرنامه */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-yellow-600 inline-block pb-1">عضویت در خبرنامه</h3>
          <p className="text-sm mb-3">با وارد کردن ایمیل خود، آخرین اخبار را در صندوق ورودی‌تان دریافت کنید.</p>
          <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="ایمیل شما..."
              className="flex-1 px-3 py-2 bg-transparent text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-sm font-semibold"
            >
              ارسال
            </button>
          </form>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-blue-600 inline-block pb-1">ما را دنبال کنید</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTelegramPlane /></a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © 2025 تمامی حقوق محفوظ است | طراحی توسط تیم خبری
      </div>
    </footer>
  );
}
