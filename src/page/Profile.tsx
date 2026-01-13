import DialogItems from "@/components/common/DialogItems";
import type { RootState } from "@/store/storeMain";
import { useSelector, useDispatch } from "react-redux";
import { setOpenAddBlog, setOpenUpdateBlog } from "@/store/blogs";
import { Button } from "@/components/ui/button";
import { fetchBlogs } from "@/store/blogs";
import { useEffect } from "react";
import image from "@/assets/Image/Add.png";
import BlogCards from "@/components/common/BlogCards";

const Profile = () => {
  const dispatch = useDispatch();
  const { openAddBlog, openUpdateBlog, blogs } = useSelector(
    (state: RootState) => state.createBlog
  );
  const { user_id } = useSelector(
    (state: RootState) => state.userAuthentication
  );

  useEffect(() => {
    dispatch(fetchBlogs() as any);
  }, [dispatch, user_id]);

  const isDialogOpen = openAddBlog || openUpdateBlog;
  const dialogType = openAddBlog ? "Create" : "Update";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (openAddBlog) {
        dispatch(setOpenAddBlog(false));
      }
      if (openUpdateBlog) {
        dispatch(setOpenUpdateBlog(false));
      }
    }
  };

  const myBlogs = blogs.filter((blog) => blog.user_id === user_id);

  return (
    <div className="flex flex-col gap-20 min-h-screen px-3 items-center">
      <DialogItems
        types={dialogType}
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
      />
      <header className="w-full flex flex-col justify-center items-center text-center min-h-[10rem] gap-5">
        <h1 className=" text-2xl md:text-5xl font-bold text-neutral-700">
          Profile Section
        </h1>
        <p className="text-xl text-gray-500">Can you upload a blog here</p>
      </header>

      <section className="border min-h-[30rem] w-full p-3">
        {myBlogs.length <= 0 && (
          <div className="border min-h-[30rem] w-full p-3 flex flex-col gap-2 justify-center items-center">
            <img
              src={image}
              alt="Image Add Blogs"
              className="h-auto w-[12rem]"
            />
            <p className="text-2xl font-bold text-neutral-700">
              No Blogs Created Yet!{" "}
            </p>
            <Button className="mt-5">Create Blogs</Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {myBlogs?.length > 0 &&
            myBlogs?.length > 0 &&
            myBlogs?.map((blog) => {
              return (
                <div key={blog.blog_id}>
                  <BlogCards
                    image={blog.blog_img}
                    altImage="Blog Card"
                    title={blog.blog_title}
                    subTitle={blog.blog_subtitle}
                    description={blog.blog_description}
                    btnText="" 
                    btnUrl={""}
                    page="profile"
                  />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
