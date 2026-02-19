import { useContext } from "react";
import { motion } from "framer-motion";
import { HomeContext } from "../context/context";

export default function Ticker() {
    const { lastPosts } = useContext(HomeContext);

    if (!lastPosts || lastPosts.length === 0) return null;

    const tickerItems = lastPosts.map(post => post.title).join(" • ");

    return (
        <div className="bg-[#0f172a] text-white py-2 overflow-hidden border-y border-white/10" dir="rtl">
            <div className="container mx-auto px-4 flex items-center">
                <div className="bg-red-600 text-[11px] font-black px-3 py-1 rounded-lg shrink-0 z-10 shadow-lg shadow-red-500/30 ml-4 animate-pulse">
                    خبر فوری
                </div>
                <div className="relative flex-1 overflow-hidden h-6 flex items-center">
                    <motion.div
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: "linear",
                        }}
                        className="whitespace-nowrap text-sm font-medium text-gray-300"
                    >
                        {tickerItems} • {tickerItems}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
