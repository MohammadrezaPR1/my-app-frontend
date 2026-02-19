import "swiper/css";
import Navbar from "./components/Navbar";
import LastThings from "./components/LastThings";
import MoreNews from "./components/MoreNews";
import PopularNews from "./components/PopularNews";
import MostViewNews from "./components/MostViewNews";
import Footer from "./components/Footer";
import Ticker from "./components/Ticker";
import FeaturedNews from "./components/FeaturedNews";

import banner1 from "../assets/home/banner1.gif";
import banner2 from "../assets/home/banner2.gif";
import banner3 from "../assets/home/banner3.gif";
import banner4 from "../assets/home/banner4.gif";
import banner5 from "../assets/home/banner5.gif";
import banner6 from "../assets/home/banner6.gif";
import banner7 from "../assets/home/banner7.gif";

const sidebarBanners = [banner1, banner2, banner3, banner4, banner5, banner6];

export default function HomePage() {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen selection:bg-blue-100 italic-none">
      <Navbar />
      <Ticker />

      <main className="max-w-[1400px] mx-auto pb-20">

        {/* ۱. بخش ویژه (Hero Section) */}
        <FeaturedNews />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 mt-20 relative z-0">

          {/* ستون اصلی - محتوای خبری (8 ستون) */}
          <div className="lg:col-span-8 space-y-16">

            {/* آخرین اخبار و ویدیوها با استایل مدرن */}
            <section className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-[80px]"></div>
              <LastThings />
            </section>

            {/* گالری اخبار دسته‌بندی شده */}
            <section dir="rtl" className="bg-white rounded-[40px] shadow-premium border border-slate-100 overflow-hidden transition-all hover:shadow-2xl">
              <div className="p-2 md:p-8">
                <div className="flex items-center gap-4 mb-8 px-4">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <h2  className="text-3xl font-black text-slate-800">برگزیده دسته‌ها</h2>
                </div>
                <MoreNews />
              </div>
            </section>

            <section className="space-y-8">
              <PopularNews />
            </section>
          </div>

          {/* ستون کناری - سایدبار (4 ستون) */}
          <aside className="lg:col-span-4 space-y-10">

            {/* بخش پربازدیدترین‌ها در سایدبار (استایل فشرده‌تر و مدرن‌تر) */}
            <div className="bg-white rounded-[32px] shadow-premium border border-slate-100 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                <h2 className="text-xl font-black text-slate-800">پیشنهاد سردبیر</h2>
              </div>
              <MostViewNews isSidebar={true} />

              {/* بخش تبلیغات متمرکز در سایدبار */}
              <div className="mt-10 space-y-4">
                <p className="text-[10px] text-center font-bold text-slate-300 uppercase tracking-widest mb-2">تبلیغات</p>
                {sidebarBanners.slice(0, 4).map((ad, i) => (
                  <a
                    key={i}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-2xl  hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <img
                      src={ad}
                      alt={`AD-${i}`}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}



//  کد با حذف تبلیغات

// import "swiper/css";
// import Navbar from "./components/Navbar";
// import LastThings from "./components/LastThings";
// import MoreNews from "./components/MoreNews";
// import PopularNews from "./components/PopularNews";
// import MostViewNews from "./components/MostViewNews";
// import Footer from "./components/Footer";

// // بنرهای تبلیغاتی
// import banner1 from "../assets/home/banner1.gif";
// import banner2 from "../assets/home/banner2.gif";
// import banner3 from "../assets/home/banner3.gif";
// import banner4 from "../assets/home/banner4.gif";
// import banner5 from "../assets/home/banner5.gif";
// import banner6 from "../assets/home/banner6.gif";
// import banner7 from "../assets/home/banner7.gif";

// // آرایه بنرهای چپ و راست
// const leftBanners = [banner1, banner2, banner3];
// const rightBanners = [banner4, banner5, banner7, banner6];

// export default function HomePage() {
//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 min-h-screen">

//       <Navbar />

//       {/* تبلیغات ثابت کنار صفحه (فقط در صفحه‌های خیلی عریض - 2xl و بالاتر) */}
//       {/* چپ */}
//       <div className="hidden 2xl:fixed 2xl:inset-y-0 2xl:left-0 2xl:w-64 2xl:-translate-x-8 2xl:z-10 2xl:pointer-events-none">
//         <div className="sticky top-24 space-y-8 2xl:pointer-events-auto">
//           {leftBanners.map((ad, i) => (
//             <a
//               key={i}
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block transition-transform duration-300 hover:scale-105"
//             >
//               <img
//                 src={ad}
//                 alt={`تبلیغات کناری چپ ${i + 1}`}
//                 className="rounded-xl shadow-2xl border border-gray-300 w-full"
//               />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* راست */}
//       <div className="hidden 2xl:fixed 2xl:inset-y-0 2xl:right-0 2xl:w-64 2xl:translate-x-8 2xl:z-10 2xl:pointer-events-none">
//         <div className="sticky top-24 space-y-8 2xl:pointer-events-auto">
//           {rightBanners.map((ad, i) => (
//             <a
//               key={i}
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block transition-transform duration-300 hover:scale-105"
//             >
//               <img
//                 src={ad}
//                 alt={`تبلیغات کناری راست ${i + 1}`}
//                 className="rounded-xl shadow-2xl border border-gray-300 w-full"
//               />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* محتوای اصلی - همیشه وسط و تمیز */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 gap-10">

//           {/* تمام محتوا در یک ستون مرکزی (موبایل و دسکتاپ) */}
//           <main className="space-y-10">

//             {/* آخرین ویدیوها و اخبار */}
//             <section className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//               <div className="p-6 md:p-8 lg:p-10">
//                 <LastThings />
//               </div>
//             </section>

//             {/* اخبار بیشتر */}
//             <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
//               <div className="p-6 md:p-8 lg:p-10">
//                 <MoreNews />
//               </div>
//             </section>

//             {/* اخبار پرطرفدار */}
//             <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
//               <div className="p-6 md:p-8 lg:p-10">
//                 <PopularNews />
//               </div>
//             </section>

//             {/* پربازدیدترین اخبار */}
//             <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
//               <div className="p-6 md:p-8 lg:p-10">
//                 <MostViewNews />
//               </div>
//             </section>

//           </main>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

