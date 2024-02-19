"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

import Dropzone from "react-dropzone";
const UploadDropZone = () => {
  return (
    <Dropzone
      multiple={false}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className=" border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className=" flex items-center justify-center  h-full w-full">
            <label
              htmlFor=" dropzone-file"
              className=" flex flex-col items-center justify-center w-full  h-full rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
            >
              <div className="  flex flex-col items-center justify-center pt-5 pb-6 ">
                exjhidcf
              </div>
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};
export default UploadButton;
