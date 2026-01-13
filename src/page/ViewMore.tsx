import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/storeMain";
import { useEffect } from "react";
import { fetchBlogs } from "@/store/blogs";
import { DynamicSkeletone } from "@/components/common/SkeletonLoading";

const ViewMore = () => {
  const dispatch = useDispatch();

  const { blogId } = useParams<{ blogId: string }>();
  const { blogs, isLoading } = useSelector((state: RootState) => state.createBlog);

  useEffect(() => {
    dispatch(fetchBlogs() as never);
  }, [dispatch, blogId]);

  const blogIdNumber = blogId ? parseInt(blogId) : null;
  const findBlog = blogs.find((blog) => blog.blog_id === blogIdNumber);

  return (
    <div className="min-h-screen container mx-auto p-2 flex justify-center">
    {
      isLoading ? (
        <DynamicSkeletone />
      ) : (
         <div className="w-full flex flex-col items-center">
       <div className="rounded-lg overflow-hidden w-full lg:h-[40rem] mb-4">
        <img src={findBlog?.blog_img} alt="" className="w-full object-cover"/>
       </div>

      <div className="py-5 w-full">
        <h2 className="text-xl  md:text-2xl lg:text-4xl font-semibold mb-2">{findBlog?.blog_title}</h2>
        {findBlog?.blog_subtitle && (
          <p className="text-gray-600 mb-2 text-lg  md:text-xl lg:text-2xl ">{findBlog?.blog_subtitle}</p>
        )}
        <p className="text-gray-700 line-clamp-1 break-word">
          {findBlog?.blog_description}
        </p>
      </div>
     </div>
      )
    }
    </div>
  );
};

export default ViewMore;
