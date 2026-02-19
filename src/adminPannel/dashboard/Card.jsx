const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  purple: "bg-purple-50 text-purple-600",
  pink: "bg-pink-50 text-pink-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
};

export default function Card({ title, icon, number, color = "blue" }) {
  const styles = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${styles}`}>
          <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-slate-900 leading-none mb-1">
            {(number || 0).toLocaleString()}
          </p>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">آمار کل</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-50">
        <h3 className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}