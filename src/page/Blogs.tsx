import type { RootState } from "@/store/storeMain";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs } from "@/store/blogs";
import BlogCards from "@/components/common/BlogCards";
import { SkeletonCardGrid } from "@/components/common/SkeletonLoading";

const Blogs = () => {
  const dispatch = useDispatch();
  const { isLoading, blogs } = useSelector(
    (state: RootState) => state.createBlog
  );

  useEffect(() => {
    dispatch(fetchBlogs() as never);
  }, [dispatch]);

  return (
    <div className="min-h-screen container mx-auto p-2">
      {isLoading ? (
        <SkeletonCardGrid count={6} />
      ) : blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {blogs.map((blog) => {
            return (
               <div    key={blog.blog_id}>
               <BlogCards 
                image={blog.blog_img}
                altImage="Blog Card"
                title={blog.blog_title}
                subTitle={blog.blog_subtitle}
                description={blog.blog_description}
                btnText="Read More"
                btnUrl={`/blogs/${blog.blog_id}`}
                page={"default"}
               />
               </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blogs;
