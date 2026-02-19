import Navbar from "../Navbar";
import Footer from "../Footer";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../context/context";
import image from "../../../assets/home/about.jpg";

const AboutUs = () => {
  const { getUsers, users } = useContext(HomeContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir="rtl">
      <Navbar />

      {/* محتوای اصلی */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-10">
        {/* متن درباره ما */}
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-blue-300">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center">
            درباره ما
          </h1>

          <p className="text-gray-700 leading-8 text-justify mb-6">
            ما یک تیم خلاق و پرانرژی هستیم که هدف اصلی‌مان ایجاد تجربه‌های دیجیتال
            منحصربه‌فرد برای کاربران است. با استفاده از
            <span className="text-blue-600 font-semibold"> فناوری‌های نوین </span>
            و رویکردهای خلاقانه، محصولات و خدماتی توسعه می‌دهیم که ساده، سریع و کاربرپسند باشند.
          </p>

          <p className="text-gray-700 leading-8 text-justify mb-6">
            مأموریت ما ارائه راهکارهای نوآورانه در حوزه فناوری و بهبود تجربه
            کاربران است. ما متعهد هستیم که با کیفیت بالا، سرعت و امنیت، بهترین خدمات را ارائه دهیم.
          </p>
        </div>

        {/* تصویر */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={image}
            alt="تیم ما"
            className="rounded-2xl shadow-xl w-full max-h-[600px] object-cover"
          />
        </div>
      </div>

      {/* اعضای تیم */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            اعضای تیم ما
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-blue-300 transition-all duration-300 flex flex-col items-center"
              >
                <img
                  src={user.url}
                  alt={user.name}
                  className="w-28 h-28 rounded-full shadow-lg mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-blue-600 text-sm mt-1">
                  {user.isAdmin ? "نویسنده - ادمین" : "نویسنده"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
