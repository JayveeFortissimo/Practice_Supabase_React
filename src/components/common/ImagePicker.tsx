import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { setInputs } from "@/store/blogs";
import type { AppDispatch } from "@/store/storeMain";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/storeMain";

const ImagePreview = ({url, onRemove,}: { url: string; onRemove: () => void;}) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <img
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

interface InputDemoProps {
  dispatch: AppDispatch;
  onFileSelect: (file: File | null) => void;
}

export default function InputDemo({ dispatch, onFileSelect }: InputDemoProps) {
  const blogImagePreview = useSelector(
    (state: RootState) => state.createBlog.getInputs.blog_image_preview
  );

  const handleRemove = () => {
    onFileSelect(null);
    dispatch(setInputs({ blog_image_preview: null }));
  };

  return (
    <div className="w-full max-w-40">
      <Label htmlFor="profile">Picture</Label>
      <div className="mt-2 w-full">
        {blogImagePreview ? (
          <ImagePreview
            url={blogImagePreview}
            onRemove={handleRemove}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                onFileSelect(file);
                dispatch(setInputs({ blog_image_preview: imageUrl }));
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-hidden focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id="profile" />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
