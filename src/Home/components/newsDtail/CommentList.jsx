// CommentList.jsx
import React, { useContext, useEffect } from "react";
import { HomeContext } from "../../context/context";
import { useParams } from "react-router-dom";



export default function CommentList() {

  const { getCommentsForNews, commentsForNews } = useContext(HomeContext);
  const { id } = useParams()

  useEffect(() => {
    getCommentsForNews(id)
  }, [])


  return (

    <>
      <div className="mt-6 text-right" dir="rtl">
        <h2 className="text-lg font-bold text-gray-800 mb-3">نظرات کاربران</h2>
        <div className="space-y-4">
          {commentsForNews.map((c) => (
            <>
              {
                c.isActive ? (<div
                  key={c.id}
                  className="bg-white p-4 rounded-lg shadow border-r-4 border-blue-500"
                >
                  <p className="font-bold text-gray-900 mb-5">"{c.name}"  گفته : </p>
                  <p className="text-gray-700 whitespace-pre-line">{c.description}</p>
                </div>) : (
                  ""
                )
              }
            </>
          ))}
        </div>
      </div>
    </>

  );
}
