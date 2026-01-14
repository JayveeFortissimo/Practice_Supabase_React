import type { RootState } from "@/store/storeMain";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs } from "@/store/blogs";
import BlogCards from "@/components/common/BlogCards";
import { SkeletonCardGrid } from "@/components/common/SkeletonLoading";
import { useId } from "react";
import PaginationWithPrimaryButton from "@/components/common/Pagination";
import { Input } from "@/components/ui/input";
import { HeroSection } from "@/components/sections/Hero";
import Sax from "@/assets/Image/Sax.jpg";
import Violin from "@/assets/Image/Violin.jpg";
import { setPagination } from "@/store/blogs";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogID = useId();
  const { isLoading, blogs, pagination } = useSelector(
    (state: RootState) => state.createBlog
  );
  const router = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs() as never);
  }, [dispatch, pagination.currentPage]);

  return (
    <div className="min-h-screen">
      <header className="w-full">
        <HeroSection
          variant="outlined"
          backgroundImage={Sax}
          title={"HERE'S THE GREATEST MUSICIAN'S AROUND THE WORLD."}
          description={
            "These people are so humble and the skills is outstanding around the world."
          }
          className="min-h-[26.25rem]! mb-5 bg-[#111820]"
        />
      </header>

      <main className="container mx-auto px-5 md:px-0" id={blogID}>
        <section className="mb-10">
          <Input type="text" placeholder="search ..." />
        </section>
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
                <div key={blog.blog_id}>
                  <BlogCards
                    id={blog.blog_id}
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

        <div className="col-span-full w-full mt-5">
          <PaginationWithPrimaryButton
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) =>
              dispatch(setPagination({ currentPage: page }))
            }
            id={blogID as string}
          />
        </div>
      </main>

      <header className="w-full mt-20">
        <HeroSection
          variant="outlined"
          backgroundImage={Violin}
          title={"CREATE AND POST A BLOG NOW"}
          description={
            "We encourage all of the musicians around the world that use this platform to motivate young musicians"
          }
          className="min-h-[26.25rem]! mb-5 bg-[#111820]"
          button={"Create Account Now!"}
          onClick={() => router("/register")}
        />
      </header>
    </div>
  );
};

export default Blogs;
