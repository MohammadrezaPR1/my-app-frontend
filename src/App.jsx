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
import { Routes, Route } from "react-router-dom";
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

function App() {

  const { userId, isLoading } = useContext(AdminContext)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* مسیر های مربوط به خانه  */}
        <Route path='/' element={<HomePage />}  ></Route>
        <Route path="/news-detail/:id" element={<NewsDetail />} />


        <Route path='/login' element={<Login />} ></Route>
        <Route path='/about' element={<AboutUs />} > </Route>
        <Route path='/contact' element={<ContactUs />} > </Route>
        <Route path='*' element={<NotFound />} ></Route>
        {
          userId && (
            <>


              {/* مسیرهایی که فقط کارب ادمین میتونه داشته باشد  */}
              <Route element={<Admin />}>

                <Route path='/admin-view-users' element={<ViewUsers />} ></Route>
                <Route path='/admin-add-user' element={<AddUser />} ></Route>
                <Route path='/admin-edit-user/:id' element={<EditUser />}  ></Route>

                {/* مسیر های مربوط به دسته بندی ها */}
                <Route path='/admin-add-category' element={<AddCategory />} ></Route>
                <Route path='/admin-view-categories' element={<ViewCategories />} ></Route>
                <Route path='/admin-edit-category/:id' element={<EditCategory />} ></Route>


              </Route>



              <Route path='/admin-dashboard' element={<Main />} ></Route>
              <Route path='/admin-update-profile/:id' element={<UpdateProfile />} />
              {/* مسیر های مربوط به خبر ها  */}
              <Route path='/admin-view-news' element={<ViewNews />}></Route>
              <Route path='/admin-add-news' element={<AddNews />} ></Route>
              <Route path='/admin-edit-news/:id' element={<EditNews />} > </Route>

              {/* مسیر های مربوط به ویدیو ها  */}
              <Route path='/admin-view-videos' element={<ViewVideos />} ></Route>
              <Route path='/admin-add-video' element={<AddVideo />} ></Route>
              <Route path='/admin-edit-video/:id' element={<EditVideo />}  ></Route>
              {/* مسیر های مربوط به کامنت ها  */}
              <Route path='/admin-view-comments' element={<ViewComments />} ></Route>
            </>
          )
        }

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
