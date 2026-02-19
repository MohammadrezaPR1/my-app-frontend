import AddCategory from './adminPannel/dashboard/category/AddCategory';
import EditCategory from './adminPannel/dashboard/category/EditCategory';
import ViewCategories from './adminPannel/dashboard/category/ViewCategories';
import Dashboard from './adminPannel/dashboard/Dashboard';
import Main from './adminPannel/dashboard/Main';
import AddNews from './adminPannel/dashboard/news/AddNews';
import EditNews from './adminPannel/dashboard/news/EditNews';
import ViewNews from './adminPannel/dashboard/news/ViewNews';

import Login from './adminPannel/login/Login'
import './index.css'
import './customToast.css'
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ViewVideos from './adminPannel/dashboard/videos/ViewVideos';
import AddVideo from './adminPannel/dashboard/videos/AddVideo';
import EditVideo from './adminPannel/dashboard/videos/EditVideo';
import ViewUsers from './adminPannel/dashboard/users/ViewUsers';
import AddUser from './adminPannel/dashboard/users/AddUser';
import EditUser from './adminPannel/dashboard/users/EditUser';
import UpdateProfile from './adminPannel/dashboard/users/UpdateProfile';
import HomePage from './Home/HomePage';
import NewsDetail from './Home/components/newsDtail/NewsDetail';
import ViewComments from './adminPannel/dashboard/comments/ViewComments';
import { useContext } from 'react';
import { AdminContext } from './adminPannel/context/context';
import NotFound from './Home/NotFound';
import Admin from './adminPannel/dashboard/Admin';
import AboutUs from './Home/components/aboutUs/AboutUs';
import ContactUs from './Home/components/contactUs/ContactUs';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

// ProtectedRoute: اگر لاگین نباشد به /login هدایت می‌کند، از Outlet برای nested routes استفاده می‌کند
const ProtectedRoute = () => {
  const { userId, isLoading } = useContext(AdminContext);
  if (isLoading) return <LoadingSpinner />;
  if (!userId) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function App() {
  const { isLoading } = useContext(AdminContext);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        {/* مسیرهای عمومی */}
        <Route path='/' element={<HomePage />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />

        {/* مسیرهای محافظت‌شده ادمین - همه زیر یک ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          {/* مسیرهایی که نیاز به layout Admin دارند */}
          <Route element={<Admin />}>
            <Route path='/admin-view-users' element={<ViewUsers />} />
            <Route path='/admin-add-user' element={<AddUser />} />
            <Route path='/admin-edit-user/:id' element={<EditUser />} />
            <Route path='/admin-add-category' element={<AddCategory />} />
            <Route path='/admin-view-categories' element={<ViewCategories />} />
            <Route path='/admin-edit-category/:id' element={<EditCategory />} />
          </Route>

          {/* مسیرهای ادمین بدون layout Admin */}
          <Route path='/admin-dashboard' element={<Main />} />
          <Route path='/admin-update-profile/:id' element={<UpdateProfile />} />
          <Route path='/admin-view-news' element={<ViewNews />} />
          <Route path='/admin-add-news' element={<AddNews />} />
          <Route path='/admin-edit-news/:id' element={<EditNews />} />
          <Route path='/admin-view-videos' element={<ViewVideos />} />
          <Route path='/admin-add-video' element={<AddVideo />} />
          <Route path='/admin-edit-video/:id' element={<EditVideo />} />
          <Route path='/admin-view-comments' element={<ViewComments />} />
        </Route>

        {/* صفحه 404 - آخرین route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App
