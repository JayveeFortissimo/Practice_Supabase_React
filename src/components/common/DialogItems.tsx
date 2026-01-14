import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notebook, Pen } from "lucide-react";
import InputDemo from "./ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { setInputs } from "@/store/blogs";
import { postBlogs } from "@/store/blogs";
import type { RootState } from "@/store/storeMain";
import { useState, useEffect } from "react";
import { updateBlogs, deleteBlogs } from "@/store/blogs";
import SpinnerCircle2 from "./Loading";
interface DialogItemsProps {
  types?: "Create" | "Update" | "Delete";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogItems = ({ types, open, onOpenChange }: DialogItemsProps) => {
  const dispatch = useDispatch();
  const {
    getInputs,
    blog_Id,
    openDeleteBlog,
    isLoading,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDelete,
  } = useSelector((state: RootState) => state.createBlog);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!open)
      dispatch(
        setInputs({
          blog_image_preview: "",
          blog_title: "",
          blog_subtitle: "",
          blog_description: "",
        })
      );
  }, [open, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{types}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-1 md:flex-row flex-col">
          {openDeleteBlog ? (
            <div>Are you sure you want to delete this blog?</div>
          ) : (
            <>
              <div className=" w-full">
                <InputDemo dispatch={dispatch} onFileSelect={setSelectedFile} />
              </div>

              <div className="flex flex-col gap-5 w-full">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="Title">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title ..."
                    value={getInputs.blog_title}
                    onChange={(e) =>
                      dispatch(setInputs({ blog_title: e.target.value }))
                    }
                  />
                </div>

                <div className="grid flex-1 gap-2">
                  <Label htmlFor="Subtitle">Sub-Title</Label>
                  <Input
                    type="text"
                    placeholder="Subtitle ..."
                    value={getInputs.blog_subtitle}
                    onChange={(e) =>
                      dispatch(setInputs({ blog_subtitle: e.target.value }))
                    }
                  />
                </div>

                <div className="grid flex-1 gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    className="border p-2"
                    value={getInputs.blog_description}
                    onChange={(e) =>
                      dispatch(setInputs({ blog_description: e.target.value }))
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className={`w-full py-6`}
            variant={"seemore"}
            disabled={
              isLoading || isLoadingCreate || isLoadingUpdate || isLoadingDelete
            }
            onClick={() => {
              if (types === "Create") {
                dispatch(postBlogs(selectedFile) as any);
              } else if (types === "Update") {
                dispatch(
                  updateBlogs({ id: blog_Id, updatedData: getInputs }) as any
                );
              } else if (types === "Delete") {
                dispatch(deleteBlogs(blog_Id) as any);
              }
            }}
          >
            {isLoadingCreate || isLoadingUpdate || isLoadingDelete ? (
              <SpinnerCircle2 />
            ) : (
              <div>
                {types === "Create" ? (
                  <div className="flex items-center gap-2">
                    <Notebook /> Create
                  </div>
                ) : types === "Update" ? (
                  <div className="flex items-center gap-2">
                    <Pen /> Edit
                  </div>
                ) : (
                  <div className="flex items-center gap-2">Delete</div>
                )}
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogItems;
