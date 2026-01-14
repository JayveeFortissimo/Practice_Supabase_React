import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeMain";
import { toast } from "sonner";
import supabase from "@/Supabase";

interface States {
  blogs: any[];
  isLoading: boolean;
  openAddBlog: boolean;
  openUpdateBlog: boolean;
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
  openAddBlog: false,
  openUpdateBlog: false,
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
  async (blogImage: File | null, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;
    const { getInputs } = state.createBlog;
    const userId = state.userAuthentication.user_id;
    const { blog_title, blog_description, blog_subtitle } = getInputs;

    if (
      (blog_title || blog_description || blog_subtitle) === "" ||
      blogImage === null
    )
      return toast.error("Fields are required!");

    try {
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

      const { error: dbError } = await supabase.from("Blogs").insert({
        blog_img: publicImageUrl,
        blog_title: getInputs.blog_title,
        blog_subtitle: getInputs.blog_subtitle,
        blog_description: getInputs.blog_description,
        user_id: userId,
      });

      if (dbError) throw dbError;

      toast.success("Blog Uploaded Successfully.");

      dispatch(
        setInputs({
          blog_image_preview: null,
          blog_title: "",
          blog_subtitle: "",
          blog_description: "",
        })
      );

      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to upload blog.");
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { pagination } = state.createBlog;

    try {
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
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateBlogs = createAsyncThunk(
  "update/updateBlogs",
  async ({id , updatedData}:{id: string, updatedData: any}, { getState }) => {
    const state = getState() as RootState;
    const userId = state.userAuthentication.user_id;
 
    const { data, error } = await supabase
      .from("Blogs")
      .update({
        blog_title: updatedData.blog_title,
        blog_subtitle: updatedData.blog_subtitle,
        blog_description: updatedData.blog_description,
        blog_img: updatedData.blog_image_preview,
        user_id:userId
      })
      .eq("blog_id", Number(id))
      .select();
       
       console.log("Updating blog with ID:", id);
    console.log("Update Data:", updatedData);
    if (error) {
      console.error("Error updating Blogs:", error.message);
    } else {
      console.log("Blog updated successfully:", data);
      return data;
    }
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
    setBlogId: (state: any, actions: PayloadAction<{blog_Id:string, getInputs:any}>) => {
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
        }
      )
      .addCase(fetchBlogs.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export default createBlog.reducer;

export const {
  setOpenAddBlog,
  setOpenUpdateBlog,
  setInputs,
  setPagination,
  setBlogId,
} = createBlog.actions;
