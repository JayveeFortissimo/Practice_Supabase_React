import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const BlogCards = ({
  image,
  altImage,
  title,
  subTitle,
  description,
  btnText,
  btnUrl,
  page,
}: {
  image: string;
  altImage: string;
  title: string;
  subTitle: string;
  description: string;
  btnText: string;
  btnUrl: string;
  page: "default" | "profile";
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
            <Button>Edit</Button>
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
