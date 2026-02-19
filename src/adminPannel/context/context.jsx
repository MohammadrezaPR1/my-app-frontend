import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../customToast.css";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../config/api";



const toastStyle = {
    direction: "rtl",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "15px",
};

export const AdminContext = createContext();
export const AdminContextProvider = ({ children }) => {

    // برای تغییر مسیر
    const navigate = useNavigate();
    //  تعریف استیت ها 
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(null);
    const [expire, setExpire] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [newsById, setNewsById] = useState([]);
    const [videosList, setVideosList] = useState([]);
    const [errorVideo, setErrorVideo] = useState("");
    const [userList, setUsersList] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [profileName, setProfileName] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingNavigate, setPendingNavigate] = useState(false);

    // این useEffect مطمئن می‌شه که navigation فقط بعد از ثبت شدن userId در state انجام می‌شه
    useEffect(() => {
        if (userId && pendingNavigate) {
            navigate("/admin-dashboard");
            setPendingNavigate(false);
        }
    }, [userId, pendingNavigate]);


    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        try {
            const res = await axios.get(`${API_URL}/token`);
            setToken(res.data.accsessToken);
            const decoded = jwtDecode(res.data.accsessToken);
            //  مقدار دهی استیت ها 
            setName(decoded.name);
            setUserId(decoded.userId);
            setIsAdmin(decoded.isAdmin);
            setEmail(decoded.email);
            setExpire(decoded.exp);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }



    // برای درخواست هایی که به مجوز نیاز دارند  
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get(`${API_URL}/token`);
                config.headers.Authorization = `Bearer ${response.data.accsessToken}`;
                setToken(response.data.accsessToken);
                const decoded = jwtDecode(response.data.accsessToken);
                setName(decoded.name);
                setEmail(decoded.email)
                setUserId(decoded.userId);
                setIsAdmin(decoded.isAdmin);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );



    //  تابع های مربوط به کاربر

    const login = async (input) => {
        try {
            // می خوایم دیتا را به سمت بک اند ارسال کنیم 
            const res = await axios.post(`${API_URL}/users/login`, input)
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
                await refreshToken();
                setPendingNavigate(true);
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


    const getAllUsers = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsersList(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error);
        }
    }

    const register = async (data) => {
        try {
            const res = await axiosJWT.post(`${API_URL}/users/register`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
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
                getAllUsers();
                navigate("/admin-view-users");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const editUser = async (data) => {
        try {
            const res = await axiosJWT.put(`${API_URL}/users/update/${data.id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
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
                getAllUsers();
                navigate("/admin-view-users");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("password", data.password);
        formData.append("confPassword", data.confPassword);
        formData.append("file", data.file);
        try {
            const res = await axiosJWT.put(`${API_URL}/users/update-Profile/${data.id}`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
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
                getAllUsers();
                navigate("/admin-view-users");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const userInfo = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/users/profile`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setProfileImage(res.data.url);
            setProfileName(res.data.name)
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/users/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
                getAllUsers();

            }
        } catch (error) {
            console.log(error);
        }
    }


    // تابع های مربوط یه دسته بندی 
    const getAllCategories = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/get-category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategoryList(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error);
        }
    }

    const createCategory = async (name) => {
        try {
            const res = await axiosJWT.post(`${API_URL}/create-category`, name, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3500,
                closeOnClick: true,
                pauseOnHover: true,
                icon: "✅",
                className: "custom-toast custom-toast-success",
                style: toastStyle,
            });
            getAllCategories()
            navigate("/admin-view-categories");


        } catch (error) {
            console.log(error);
        }
    }

    const editCategory = async (data) => {
        try {
            const res = await axiosJWT.put(`${API_URL}/update-category/${data.id}`, { name: data.name }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3500,
                closeOnClick: true,
                pauseOnHover: true,
                icon: "✅",
                className: "custom-toast custom-toast-success",
                style: toastStyle,
            });

            getAllCategories();
            navigate("/admin-view-categories");
        } catch (error) {
            console.log(error);
        }
    };


    const deleteCategory = async (id) => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/delete-category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(res.data.msg, {
                position: "bottom-center",
                autoClose: 3500,
                closeOnClick: true,
                pauseOnHover: true,
                icon: "✅",
                className: "custom-toast custom-toast-success",
                style: toastStyle,
            });
            getAllCategories();
        } catch (error) {
            console.log(error);
        }
    }


    // توابع مربوط به خبر ها 

    const createNews = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("subTitle1", data.subTitle1);
        formData.append("subDescription1", data.subDescription1);
        formData.append("subTitle2", data.subTitle2);
        formData.append("subDescription2", data.subDescription2);
        formData.append("subTitle3", data.subTitle3);
        formData.append("subDescription3", data.subDescription3);
        formData.append("subTitle4", data.subTitle4);
        formData.append("subDescription4", data.subDescription4);
        formData.append("catId", data.catId);
        formData.append("userId", userId);
        formData.append("file", data.file);

        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }
        if (data.video) {
            formData.append("video", data.video);
        }

        try {
            const res = await axiosJWT.post(
                `${API_URL}/create-news`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
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
                navigate("/admin-view-news");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNews = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/news`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNewsList(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNews = async (id) => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/delete-news/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
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
                handleNews();
                console.log(res);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const getNewsById = async (id) => {
        try {
            const res = await axiosJWT.get(`${API_URL}/news/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNewsById(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateNews = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("subTitle1", data.subTitle1);
        formData.append("subDescription1", data.subDescription1);
        formData.append("subTitle2", data.subTitle2);
        formData.append("subDescription2", data.subDescription2);
        formData.append("subTitle3", data.subTitle3);
        formData.append("subDescription3", data.subDescription3);
        formData.append("subTitle4", data.subTitle4);
        formData.append("subDescription4", data.subDescription4);
        formData.append("catId", data.catId);
        formData.append("userId", userId);
        formData.append("file", data.file);

        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            }
        }
        if (data.video) {
            formData.append("video", data.video);
        }

        try {
            const res = await axiosJWT.put(`${API_URL}/update-news/${data.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
                handleNews();
                navigate('/admin-view-news')
            }

        } catch (error) {
            console.log(error);
        }
    }


    // توابع مربوط به ویدیو ها 
    const getAllVideos = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/get-video`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setVideosList(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error);
        }
    }

    const addVideo = async (data, onProgress) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.file);

        try {
            const res = await axiosJWT.post(
                `${API_URL}/create-video`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        if (onProgress) {
                            const percent = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            onProgress(percent);
                        }
                    },
                }
            );

            if (res.data.error) {
                setErrorVideo(res.data.error);
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
                navigate("/admin-view-videos");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteVideo = async (id) => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/delete-video/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
                getAllVideos();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editVideo = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.file);
        try {
            const res = await axiosJWT.put(`${API_URL}/edit-video/${data.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.error) {
                setErrorVideo(res.data.error);
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
                navigate("/admin-view-videos");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // مسیر های مربو یه کامت ها 
    const getAllComments = async () => {
        try {
            const res = await axiosJWT.get(`${API_URL}/comments`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setCommentsList(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await axiosJWT.delete(`${API_URL}/comments/delete/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
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
                navigate("/admin-view-comments")
                getAllComments()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const activeComment = async (id) => {
        const data = {
            isActive: true
        }
        try {
            const res = await axiosJWT.put(`${API_URL}/comments/active/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
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
                navigate("/admin-view-comments")
                getAllComments()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const unActiveComment = async (id) => {
        const data = {
            isActive: false
        }
        try {
            const res = await axiosJWT.put(`${API_URL}/comments/unactive/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
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
                navigate("/admin-view-comments")
                getAllComments()
            }
        } catch (error) {
            console.log(error);
        }
    }






    return (
        // تمام تابع های مربوط به ادمین را اینجا می گذاریم
        <AdminContext.Provider value={{
            login,
            name,
            isAdmin,
            userId,
            userInfo,
            profileName,
            profileImage,
            error,  //  برای نمایش اررور ورود ، برای استفاده در فرانت
            getAllUsers,
            userList,
            editUser,
            updateProfile,
            deleteUser,
            register,
            logout,

            getAllCategories,
            categoryList,
            createCategory,
            editCategory,
            deleteCategory,

            createNews,
            deleteNews,
            handleNews,
            newsList,
            getNewsById,
            updateNews,

            getAllVideos,
            videosList,
            addVideo,
            errorVideo,
            deleteVideo,
            editVideo,

            getAllComments,
            commentsList,
            deleteComment,
            activeComment,
            unActiveComment,

            isLoading,

        }} >

            {children}

        </AdminContext.Provider>
    )
}