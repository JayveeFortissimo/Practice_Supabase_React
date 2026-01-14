import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setBlogId } from "@/store/blogs";
const BlogCards = ({
  id,
  page,
  image,
  title,
  btnUrl,
  btnText,
  altImage,
  subTitle,
  description,
  dispatch,
  setOpenUpdateBlog,
}: {
  id?: string | undefined;
  page: "default" | "profile";
  image: string;
  title: string;
  altImage: string;
  btnUrl: string;
  btnText: string;
  subTitle: string;
  description: string;
  dispatch?: any;
  setOpenUpdateBlog?: any;
}) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      {image ? (
        <img
          src={image}
          alt={altImage || "Blog image"}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {subTitle && <p className="text-gray-600 mb-2">{subTitle}</p>}

        <p className="text-gray-700 line-clamp-1 break-word">{description}</p>

        {page === "profile" ? (
          <div className="mt-6 flex gap-2">
            <Button
              onClick={() => {
                dispatch(
                  setBlogId({
                    blog_Id: id as string,
                    getInputs: {
                      blog_image_preview: image,
                      blog_title: title,
                      blog_subtitle: subTitle,
                      blog_description: description,
                    },
                  })
                );

                dispatch(setOpenUpdateBlog(true));
              }}
            >
              Edit
            </Button>
            <Button className="bg-[#BD3144]">Delete</Button>
          </div>
        ) : (
          <Button className="mt-6" onClick={() => navigate(btnUrl)}>
            {btnText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogCards;
