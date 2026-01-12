import DialogItems from "@/components/common/DialogItems";
import type { RootState } from "@/store/storeMain";
import { useSelector, useDispatch } from "react-redux";
import { setOpenAddBlog, setOpenUpdateBlog } from "@/store/blogs";
import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

import image from '@/assets/Image/Add.png'

const Profile = () => {
  const dispatch = useDispatch();
  const { openAddBlog, openUpdateBlog, blogs } = useSelector((state: RootState) => state.createBlog);

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

  return (
    <div className="flex flex-col gap-20 min-h-screen px-3 items-center">
      <DialogItems
        types={dialogType}
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
      />
      <header className="w-full flex flex-col justify-center items-center text-center min-h-[10rem] gap-5">
        <h1 className="text-5xl font-bold text-neutral-700">Profile Section</h1>
        <p className="text-xl text-gray-500">Can you Upload a blog here</p>
      </header>

      <section className="border min-h-[30rem] w-full p-3">
        {blogs.length <= 0 && (
          <div className="border min-h-[30rem] w-full p-3 flex flex-col gap-2 justify-center items-center">
           <img src={image} alt="Image Add Blogs" className="h-auto w-[12rem]"/>
            <p className="text-2xl font-bold text-neutral-700">No Blogs Created Yet! </p>
            <Button className="mt-5">Create Blogs</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
