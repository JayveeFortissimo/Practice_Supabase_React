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
  getInputsAdd: {
    blog_image_preview: string | null;
    blog_title: string;
    blog_subtitle: string;
    blog_description: string;
  };
}

const initialState: States = {
  blogs: [],
  isLoading: false,
  openAddBlog: false,
  openUpdateBlog: false,
  getInputsAdd: {
    blog_image_preview: null,
    blog_title: "",
    blog_subtitle: "",
    blog_description: "",
  },
};

export const postBlogs = createAsyncThunk(
  "post/blogs",
  async (blogImage: File | null, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;
    const { getInputsAdd } = state.createBlog;
    const userId = state.userAuthentication.user_id;

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
        blog_title: getInputsAdd.blog_title,
        blog_subtitle: getInputsAdd.blog_subtitle,
        blog_description: getInputsAdd.blog_description,
        user_id: userId,
      });

      if (dbError) throw dbError;

      toast.success("Blog Uploaded Successfully.");

      dispatch(setInputs({
        blog_image_preview: null,
        blog_title: "",
        blog_subtitle: "",
        blog_description: "",
      }));

      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to upload blog.");
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("Blogs").select();

      if (error) throw error;
      return data ?? [];
    } catch (err: any) {
      return rejectWithValue(err.message);
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
    setInputs: (
      state,
      action: PayloadAction<Partial<States["getInputsAdd"]>>
    ) => {
      state.getInputsAdd = {
        ...state.getInputsAdd,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder: any) => {
    builder
      .addCase(fetchBlogs.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state: any, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.blogs = action.payload;
        }
      )
      .addCase(fetchBlogs.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export default createBlog.reducer;

export const { setOpenAddBlog, setOpenUpdateBlog, setInputs } = createBlog.actions;
