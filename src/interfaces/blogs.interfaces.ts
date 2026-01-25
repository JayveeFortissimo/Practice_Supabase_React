export interface Blog {
  blog_id: number;
  blog_img: string;
  blog_title: string;
  blog_subtitle: string;
  blog_description: string;
  user_id: string;
  created_at: string;
}

export interface States {
  blogs: Blog[];
  userBlogs: Blog[];
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
    comments?: string | null;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  userBlogsPagination: {
    currentPage: number;
    totalPages: number;
  };
  blog_Id: string;
  search: string;
  commentsData: any[];
}
