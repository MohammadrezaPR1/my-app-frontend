import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeContext } from "../context/context";

export default function FeaturedNews() {
    const { lastPosts, loadingLastPost } = useContext(HomeContext);

    if (loadingLastPost) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
                <div className="md:col-span-2 bg-gray-200 animate-pulse rounded-3xl"></div>
                <div className="md:col-span-2 grid grid-rows-2 gap-4">
                    <div className="bg-gray-200 animate-pulse rounded-3xl"></div>
                    <div className="bg-gray-200 animate-pulse rounded-3xl"></div>
                </div>
            </div>
        );
    }

    const posts = lastPosts?.slice(0, 3) || [];

    if (posts.length === 0) return null;

    return (
        <section className="relative z-10 mt-6 px-4" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto">
                {/* Main Featured Post */}
                {posts[0] && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-premium h-[400px] md:h-[500px]"
                    >
                        <Link to={`/news-detail/${posts[0].id}`} state={posts[0]}>
                            <img
                                src={posts[0].url}
                                alt={posts[0].title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                                <span className="bg-blue-600 text-[12px] px-3 py-1 rounded-full w-fit mb-4 font-bold">
                                    {posts[0].category?.name}
                                </span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-snug group-hover:text-blue-400 transition-colors">
                                    {posts[0].title}
                                </h2>
                                <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl opacity-90">
                                    {posts[0].description}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* side Featured Posts */}
                <div className="md:col-span-2 grid grid-cols-1 grid-rows-2 gap-4 h-[500px]">
                    {posts.slice(1, 3).map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="group relative overflow-hidden rounded-3xl shadow-premium border border-white/10"
                        >
                            <Link to={`/news-detail/${post.id}`} state={post}>
                                <img
                                    src={post.url}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                                    <span className="bg-yellow-500 text-black text-[10px] font-black px-2.5 py-1 rounded-lg w-fit mb-2">
                                        {post.category?.name}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-black leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
