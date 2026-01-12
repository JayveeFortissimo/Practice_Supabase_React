import type { RootState } from "@/store/storeMain";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "@/store/blogs";
import { Button } from "@/components/ui/button";
import SpinnerCircle2 from "@/components/common/Loading";

const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, blogs } = useSelector(
    (state: RootState) => state.createBlog
  );

  useEffect(() => {
    dispatch(fetchBlogs() as any);
  }, [dispatch]);

  if (isLoading) {
    return <SpinnerCircle2 />;
  }

  return (
    <div className="min-h-screen container mx-auto p-2">
      {blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.blog_id}
                className="border rounded-lg overflow-hidden mb-4"
              >
                {blog.blog_img ? (
                  <img
                    src={blog.blog_img}
                    alt={blog.blog_title || "Blog image"}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {blog.blog_title}
                  </h2>
                  {blog.blog_subtitle && (
                    <p className="text-gray-600 mb-2">{blog.blog_subtitle}</p>
                  )}
                  <p className="text-gray-700 line-clamp-1 break-word">
                    {blog.blog_description}
                  </p>
                  <Button className="mt-6" onClick={()=> navigate(`/blogs/${blog.blog_id}`)}>Read More</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blogs;
