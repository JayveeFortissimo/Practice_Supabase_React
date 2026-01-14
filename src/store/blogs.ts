import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeMain";
import { toast } from "sonner";
import supabase from "@/Supabase";
interface Blog {
  blog_id: number;
  blog_img: string;
  blog_title: string;
  blog_subtitle: string;
  blog_description: string;
  user_id: string;
  created_at: string;
}

interface States {
  blogs: Blog[];
  isLoading: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;

  openAddBlog: boolean;
  openUpdateBlog: boolean;
  openDeleteBlog: boolean;
  getInputs: {
    blog_image_preview: string | null;
    blog_title: string;
    blog_subtitle: string;
    blog_description: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  blog_Id: string;
}

const initialState: States = {
  blogs: [],
  isLoading: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,

  openAddBlog: false,
  openUpdateBlog: false,
  openDeleteBlog: false,
  getInputs: {
    blog_image_preview: null,
    blog_title: "",
    blog_subtitle: "",
    blog_description: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    page: 1,
    limit: 6,
  },
  blog_Id: "",
};

export const postBlogs = createAsyncThunk(
  "post/blogs",
  async (blogImage: File | null, { getState }) => {
    const state = getState() as RootState;
    const { getInputs } = state.createBlog;
    const userId = state.userAuthentication.user_id;
    const { blog_title, blog_description, blog_subtitle } = getInputs;

    if ((blog_title || blog_description || blog_subtitle) === "" || blogImage === null) return toast.error("Fields are required!");

      let publicImageUrl = "";

      if (blogImage) {
        const file = blogImage;
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("BlogsImages")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("BlogsImages")
          .getPublicUrl(filePath);

        publicImageUrl = urlData.publicUrl;
      }

        await supabase.from("Blogs").insert({
        blog_img: publicImageUrl,
        blog_title: getInputs.blog_title,
        blog_subtitle: getInputs.blog_subtitle,
        blog_description: getInputs.blog_description,
        user_id: userId,
      });

      return {
         blog_img: publicImageUrl,
        blog_title: getInputs.blog_title,
        blog_subtitle: getInputs.blog_subtitle,
        blog_description: getInputs.blog_description,
        user_id: userId,
      };
    
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { pagination } = state.createBlog;

      const ITEMS_PER_PAGE = pagination.limit;
      const currentPage = pagination.currentPage;

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("Blogs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data: data ?? [],
        total: count ?? 0,
      };
    } 
);

export const updateBlogs = createAsyncThunk(
  "update/updateBlogs",
  async (
    { id, updatedData }: { id: string; updatedData?: any },
    { getState }
  ) => {
    const state = getState() as RootState;
    const userId = state.userAuthentication.user_id;

    const { data } = await supabase
      .from("Blogs")
      .update({
        blog_title: updatedData.blog_title,
        blog_subtitle: updatedData.blog_subtitle,
        blog_description: updatedData.blog_description,
        blog_img: updatedData.blog_image_preview,
        user_id: userId,
      })
      .eq("blog_id", Number(id))
      .select();

    return { data, updatedData, blogId: id };
  }
);

export const deleteBlogs = createAsyncThunk(
  "delete/deleteBlogs",
  async (blog_id: string) => {
    await supabase.from("Blogs").delete().eq("blog_id", Number(blog_id));
    return blog_id;
  }
);

export const createBlog = createSlice({
  name: "createBlog",
  initialState,
  reducers: {
    setOpenAddBlog: (state, action: PayloadAction<boolean>) => {
      state.openAddBlog = action.payload;
    },
    setOpenUpdateBlog: (state, action: PayloadAction<boolean>) => {
      state.openUpdateBlog = action.payload;
    },
    setOpenDeleteBlog: (state, action: PayloadAction<boolean>) => {
      state.openDeleteBlog = action.payload;
    },
    setInputs: (state, action: PayloadAction<Partial<States["getInputs"]>>) => {
      state.getInputs = {
        ...state.getInputs,
        ...action.payload,
      };
    },
    setPagination: (
      state,
      action: PayloadAction<Partial<States["pagination"]>>
    ) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
    setBlogId: (
      state: any,
      actions: PayloadAction<{ blog_Id: number; getInputs: any }>
    ) => {
      state.blog_Id = actions.payload.blog_Id;
      state.getInputs = actions.payload.getInputs;
    },
  },

  extraReducers: (builder: any) => {
    builder
      .addCase(fetchBlogs.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state: any, action: PayloadAction<{ data: any[]; total: number }>) => {
          state.isLoading = false;
          state.blogs = action.payload.data;
          state.pagination.totalPages = Math.ceil(
            action.payload.total / state.pagination.limit
          );
          state.isLoadingCreate = false;
        }
      )
      .addCase(fetchBlogs.rejected, (state: any) => {
        state.isLoading = false;
        toast.error("Failed to fetch blogs please try again.");
      })

      .addCase(updateBlogs.pending, (state: any) => {
        state.isLoadingUpdate = true;
      })
      .addCase(updateBlogs.rejected, (state: any) => {
        state.isLoadingUpdate = false;
        toast.error("Failed to update blog.");
      })
      .addCase(
        updateBlogs.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: any; updatedData: any; blogId: string }>
        ) => {
          state.isLoadingUpdate = false;
          state.openUpdateBlog = false;
          state.blogs = state.blogs.map((blog: any) => {
            if (blog.blog_id === Number(action.payload.blogId)) {
              return {
                ...blog,
                blog_title: action.payload.updatedData.blog_title,
                blog_subtitle: action.payload.updatedData.blog_subtitle,
                blog_description: action.payload.updatedData.blog_description,
                blog_img: action.payload.updatedData.blog_image_preview,
              };
            }
            return blog;
          });
          toast.success("Blog Updated Successfully.");
        }
      )

      .addCase(postBlogs.pending, (state: any) => {
        state.isLoadingCreate = true;
      })
      .addCase(postBlogs.rejected, (state: any) => {
        state.isLoadingCreate = false;
      })
      .addCase(postBlogs.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.isLoadingCreate = false;
        state.blogs.unshift(action.payload);
        state.getInputs = {
          blog_image_preview: null,
          blog_title: "",
          blog_subtitle: "",
          blog_description: "",
        }
        state.openAddBlog = false;
        toast.success("Blog Uploaded Successfully.");
      })

      .addCase(deleteBlogs.pending, (state: any) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteBlogs.rejected, (state: any) => {
        state.isLoadingDelete = false;
        toast.error("Failed to delete blog.");
      })
      .addCase(
        deleteBlogs.fulfilled,
        (state: any, action: PayloadAction<string>) => {
          state.isLoadingDelete = false;
          state.openDeleteBlog = false;
          state.blogs = state.blogs.filter(
            (blog: any) => blog.blog_id !== Number(action.payload)
          );
          toast.success("Blog Deleted Successfully.");
        }
      );
  },
});

export default createBlog.reducer;

export const {
  setOpenAddBlog,
  setOpenUpdateBlog,
  setInputs,
  setPagination,
  setBlogId,
  setOpenDeleteBlog,
} = createBlog.actions;
