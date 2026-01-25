import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/storeMain";
import { useEffect, useState } from "react";
import { fetchBlogs, setInputs } from "@/store/blogs";
import {
  DynamicSkeletone,
  CommentsSkeletone,
} from "@/components/common/SkeletonLoading";
import { HeroSection } from "@/components/sections/Hero";
import { useNavigate } from "react-router-dom";
import violin from "@/assets/Image/Violin.jpg";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ImagePicker from "@/components/common/ImagePicker";
import { commentsPost, commentsFetch } from "@/store/blogs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/formatDates";

const ViewMore = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const { blogId } = useParams<{ blogId: string }>();
  const { blogs, isLoading, commentsData, isLoadingCreate } = useSelector((state: RootState) => state.createBlog);
  const [comment, setComment] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchBlogs() as never);
  }, [dispatch, blogId]);

  useEffect(() => {
    dispatch(commentsFetch() as any);
  }, [dispatch, comment]);

  const blogIdNumber = blogId ? parseInt(blogId) : null;
  const findBlog = blogs.find((blog) => blog.blog_id === blogIdNumber);
  const findComments = commentsData.filter((comment) => comment.blogID === blogIdNumber);

  console.log("Comments Data:", findComments);
  return (
    <div>
  
      <div className="min-h-screen container mx-auto p-2 flex justify-center flex-col ">
        {isLoading ? (
          <DynamicSkeletone />
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="rounded-lg overflow-hidden w-full lg:h-[35rem] mb-4">
              <img
                src={findBlog?.blog_img}
                alt=""
                className="w-full object-cover"
              />
            </div>

            <div className="py-5 w-full">
              <h2 className="text-xl  md:text-2xl lg:text-4xl font-semibold mb-2">
                {findBlog?.blog_title}
              </h2>
              {findBlog?.blog_subtitle && (
                <p className="text-gray-600 mb-2 text-lg  md:text-xl lg:text-xl ">
                  {findBlog?.blog_subtitle}
                </p>
              )}
              <p className="text-gray-700 text-2xl">
                {findBlog?.blog_description}
              </p>
            </div>
          </div>
        )}

        {/* Commnet Sections! */}
        <div className="w-full">
          <button
            className="flex items-center space-x-2 mb-5 cursor-pointer"
            onClick={() => setComment((pro) => !pro)}
          >
            <MessageCircle className="h-6 w-6 text-gray-600" />{" "}
            <span>Comments</span>
          </button>

          {comment && (
            <div>
              <section className="h-[20rem] border p-2 rounded shadow-md mb-3 overflow-auto">
                {isLoading ? (
                  <CommentsSkeletone />
                ) : findComments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">No Comment Yet</p>
                ) : (
                  <div className="flex flex-col gap-5">
                    {findComments.map((allComments) => (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="cursor-pointer">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="text-sm"> {allComments?.user_name}</p>
                        </div>
                        <p className="text-sm mb-2">{allComments?.comments}</p>
                        <img
                          src={allComments?.img}
                          className="h-auto w-[15%] mb-1"
                        />
                        <p className="text-sm text-gray-500 mb-2">{formatDate(allComments?.created_at)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
              {/* Comment Section */}
              <div>
                <p className="text-gray-500 text-sm">Comment</p>
                <textarea
                  className="border p-2 rounded w-full"
                  onChange={(e) =>
                    dispatch(setInputs({ comments: e.target.value }))
                  }
                ></textarea>
                <div className="flex items-center gap-5">
                  <ImagePicker
                    type="comment"
                    dispatch={dispatch}
                    onFileSelect={setSelectedFile}
                  />
                  <Button
                    disabled={isLoadingCreate}
                    onClick={() =>
                      dispatch(
                        commentsPost({
                          blogImage: selectedFile,
                          blogID: blogIdNumber,
                        }) as any,
                      )
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <header className="w-full mt-5">
        <HeroSection
          variant="outlined"
          backgroundImage={violin}
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

export default ViewMore;
