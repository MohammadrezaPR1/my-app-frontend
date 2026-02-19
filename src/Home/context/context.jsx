import { createContext, useEffect, useReducer, useState } from "react";
import { videoReducer } from "./reducers/reducerVideo";
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "./constants/videoConstants";
import axios from "axios";
import { API_URL } from "../../config/api";
import { lastPostReducer } from "./reducers/reducerLastPost";
import { LAST_POST_REQUEST, LAST_POST_SUCCESS, LAST_POST_FAIL } from "./constants/lastPostConstants";
import { popularNewsReducer } from "./reducers/reducerPopularNews";
import { POPULAR_NEWS_FAIL, POPULAR_NEWS_REQUEST, POPULAR_NEWS_SUCCESS } from "./constants/popularNewsConstants";
import { categoryNewsReducer } from "./reducers/reducerCategoryNews";
import { CATEGORY_NEWS_FAIL, CATEGORY_NEWS_REQUEST, CATEGORY_NEWS_SUCCESS } from "./constants/categoryNewsConstants";
import { RELATED_NEWS_REQUEST, RELATED_NEWS_SUCCESS, RELATED_NEWS_FAIL } from "./constants/relatedNewsConstants";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../customToast.css";
import { relatedNewsReducer } from "./reducers/reducerRelatedNews";
import { mostViewReducer } from "./reducers/reducerMostView";
import { MOST_VIEW_FAIL, MOST_VIEW_REQUEST, MOST_VIEW_SUCCESS } from "./constants/mostViewConstants";

const toastStyle = {
    direction: "rtl",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "15px",
};

export const HomeContext = createContext();

//  برای دریافت آخرین ویدیو ها 
const INITIAL_STATE = {
    loading: true,
    error: "",
    videos: []
}
// برای دریافت آخرین اخبار
const INITIAL_STATE_LAST_POST = {
    loading: true,
    error: "",
    lastPosts: []
}
//  برای دریافت محبوب ترین خبر ها
const INITIAL_STATE_POPULAR_NEWS = {
    loading: true,
    error: "",
    popularNews: []
}
// برای دریافت اخبار یک دسته بندی خاص 
const INITIAL_STATE_CATEGORY_NEWS = {
    loading: true,
    error: "",
    categoryNews: []
}

// استیت جدید برای اخبار مرتبط
const INITIAL_STATE_RELATED_NEWS = {
    loading: true,
    error: "",
    relatedNews: []
};

//  برای چر بازدید ترین خبر ها 

const INITIAL_STATE_MOST_VIEW = {
    loading: true,
    error: "",
    mostView: []
};


export const HomeContextProvider = ({ children }) => {

    //  برای دریافت آخرین ویدیو ها 
    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
    //  برای دریافت آخرین پست ها 
    const [stateLastPost, lsatPostDispatch] = useReducer(lastPostReducer, INITIAL_STATE_LAST_POST)
    //  برای ریافت محبوب ترین خبر ها 
    const [statePopularNews, popularNewsDispatch] = useReducer(popularNewsReducer, INITIAL_STATE_POPULAR_NEWS)
    // ذخیره و ارسال دسته بندی ها 
    const [categories, setCategories] = useState([]);
    // دریافت اخبار یک دسته بندی خاص 
    const [stateCategoryNews, categoryNewsDispatch] = useReducer(categoryNewsReducer, INITIAL_STATE_CATEGORY_NEWS)
    const [stateRelatedNews, relatedNewsDispatch] = useReducer(relatedNewsReducer, INITIAL_STATE_RELATED_NEWS)
    const [stateMostView, mostViewDispatch] = useReducer(mostViewReducer, INITIAL_STATE_MOST_VIEW)
    const [commentsForNews, setCommentsForNews] = useState([]);
    // دریافت آخرین اخبار مرتبط 
    const [users, setUsers] = useState([]);
    const cat = useLocation().search;




    useEffect(() => {
        loadVideo()
        loadLastPosts()
        loadPopularNews()
        loadCategory()
        loadCategoryNews()
        loadMostView()
    }, [])




    //  تابع دریافت آخرین ویدیو
    const loadVideo = async () => {
        try {
            dispatch({ type: VIDEO_REQUEST });
            const { data } = await axios.get(`${API_URL}/single-video`);
            dispatch({ type: VIDEO_SUCCESS, pyload: data })
        } catch (error) {
            dispatch({ type: VIDEO_FAIL, pyload: error.response.data.message })
        }
    }

    // تابع دریافت آخرین اخبار 
    const loadLastPosts = async () => {
        try {
            lsatPostDispatch({ type: LAST_POST_REQUEST });
            const { data } = await axios.get(`${API_URL}/news/lastnews`);
            lsatPostDispatch({ type: LAST_POST_SUCCESS, pyload: data })
        } catch (error) {
            lsatPostDispatch({ type: LAST_POST_FAIL, pyload: error.response.data.message })
        }
    }
    // تابع دریافت محبوب ترین خبر ها
    const loadPopularNews = async () => {
        try {
            popularNewsDispatch({ type: POPULAR_NEWS_REQUEST });
            const { data } = await axios.get(`${API_URL}/news/popular`);
            popularNewsDispatch({ type: POPULAR_NEWS_SUCCESS, pyload: data })
        } catch (error) {
            popularNewsDispatch({ type: POPULAR_NEWS_FAIL, pyload: error.response.data.message })
        }
    }
    // تابع دریافت اخبار یک دسته بندی خاص 
    const loadCategoryNews = async () => {
        try {
            categoryNewsDispatch({ type: CATEGORY_NEWS_REQUEST });
            const { data } = await axios.get(`${API_URL}/news/cat-news${cat}`);
            categoryNewsDispatch({ type: CATEGORY_NEWS_SUCCESS, pyload: data })
        } catch (error) {
            categoryNewsDispatch({ type: CATEGORY_NEWS_FAIL, pyload: error.response.data.message })
        }
    }
    // تابع دریافت پر بازدید ترین خبر ها  
    const loadMostView = async () => {
        try {
            mostViewDispatch({ type: MOST_VIEW_REQUEST });
            const { data } = await axios.get(`${API_URL}/news/mostView`);
            mostViewDispatch({ type: MOST_VIEW_SUCCESS, pyload: data });
        } catch (error) {
            mostViewDispatch({ type: MOST_VIEW_FAIL, pyload: error.response.data.message })
        }
    }
    // تابع دریافت اخبار مرتبط با دسته بندی حال حاضر
    const getRelatedNews = async (id) => {
        try {
            relatedNewsDispatch({ type: RELATED_NEWS_REQUEST });
            const { data } = await axios.get(`${API_URL}/news/related/${id}`);
            relatedNewsDispatch({ type: RELATED_NEWS_SUCCESS, pyload: data });
        } catch (error) {
            relatedNewsDispatch({ type: RELATED_NEWS_FAIL, pyload: error.response.data.message })
        }
    }



    // تابع دریافت دسته بندی ها 
    const loadCategory = async () => {
        try {
            const res = await axios.get(`${API_URL}/home/get-category`);
            setCategories(Array.isArray(res.data) ? res.data : [])
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const loadNewsDtail = async (id) => {
        try {
            await axios.get(`${API_URL}/news/detail/${id}`);

        } catch (error) {
            console.log(error);
        }
    }

    const createComment = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/comments/create`, data);
            if (res.data.error) {
                toast.error(res.data.error, {
                    position: "bottom-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "🚫",
                    className: "custom-toast custom-toast-error",
                    style: toastStyle,
                });
            } else {
                toast.success(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 3500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "✅",
                    className: "custom-toast custom-toast-success",
                    style: toastStyle,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getCommentsForNews = async (id) => {
        try {
            const res = await axios.get(`${API_URL}/comments/get/${id}`);
            setCommentsForNews(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const contactUsByEmail = async (data) => {
        try {
            const res = await axios.post(`${API_URL}/send-email`, data)
           if (res.data.error) {
                toast.error(res.data.error, {
                    position: "bottom-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "🚫",
                    className: "custom-toast custom-toast-error",
                    style: toastStyle,
                });
            } else {
                toast.success(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 3500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "✅",
                    className: "custom-toast custom-toast-success",
                    style: toastStyle,
                });
            }
            Navigate("/")

        } catch (error) {
            console.log(error);
        }
    }

    const getUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/get-users`);
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const likeNews = async (id) => {
        try {
            const res = await axios.put(`${API_URL}/news/like/${id}`);
            if (res.data.error) {
                toast.error(res.data.error, {
                    position: "bottom-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "🚫",
                    className: "custom-toast custom-toast-error",
                    style: toastStyle,
                });
            } else {
                toast.success(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 3500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "✅",
                    className: "custom-toast custom-toast-success",
                    style: toastStyle,
                });
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const dislikeNews = async (id) => {
        try {
            const res = await axios.put(`${API_URL}/news/dislike/${id}`);
            if (res.data.error) {
                toast.error(res.data.error, {
                    position: "bottom-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "🚫",
                    className: "custom-toast custom-toast-error",
                    style: toastStyle,
                });
            } else {
                toast.success(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 3500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    icon: "✅",
                    className: "custom-toast custom-toast-success",
                    style: toastStyle,
                });
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <HomeContext.Provider value={{
            loading: state.loading,
            error: state.error,
            videos: state.videos,

            loadingLastPost: stateLastPost.loading,
            errorLastPost: stateLastPost.error,
            lastPosts: stateLastPost.lastPosts,

            loadingPopularNews: statePopularNews.loading,
            errorPopularNews: statePopularNews.error,
            popularNews: statePopularNews.popularNews,

            categories,

            loadCategoryNews,
            loadingCategoryNews: stateCategoryNews.loading,
            errorCategoryNews: stateCategoryNews.error,
            categoryNews: stateCategoryNews.categoryNews,


            loadNewsDtail,

            createComment,
            getCommentsForNews,
            commentsForNews,
            contactUsByEmail,

            getUsers,
            users,

            getRelatedNews,
            loadingRelatedNews: stateRelatedNews.loading,
            errorRelatedNews: stateRelatedNews.error,
            relatedNews: stateRelatedNews.relatedNews,

            loadMostView,
            loadingMostView: stateMostView.loading,
            errorMostView: stateMostView.error,
            mostView: stateMostView.mostView,

            likeNews,
            dislikeNews,
        }}>
            {children}
        </HomeContext.Provider>
    )
}