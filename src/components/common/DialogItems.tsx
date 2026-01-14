import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { updateBlogs } from "@/store/blogs";

interface DialogItemsProps {
  types?: "Create" | "Update";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogItems = ({ types, open, onOpenChange }: DialogItemsProps) => {
  const dispatch = useDispatch();
  const {getInputs, blog_Id} = useSelector((state: RootState) => state.createBlog);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
      if(!open) dispatch(setInputs({ blog_image_preview: "", blog_title: "", blog_subtitle: "", blog_description: "" }));
  },[open, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{types}</DialogTitle>
          <DialogDescription>
            {types === "Create"
              ? "Create a blog here 😊"
              : "Update a blog here 😊"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-1 md:flex-row flex-col mt-5">
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
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className="w-full"
            variant={"seemore"}
            onClick={() => {
              if (types === "Create") {
                dispatch(postBlogs(selectedFile) as any);
              }else if(types === "Update"){
                dispatch(updateBlogs({ id: blog_Id, updatedData: getInputs }) as any);
              }
            }}
          >
            {types === "Create" ? (
              <div className="flex items-center gap-2">
                <Notebook /> Create
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Pen /> Edit
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogItems;
