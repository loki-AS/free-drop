"use client";

import {
  addDoc,
  collection,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DropZoneComponent = () => {
  const maxSize = 20971520;

  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "users", "123", "files"), {
      userId: "123",
      filename: selectedFile.name,
      fullName: "john",
      profileImg:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/123/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", "123", "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    setLoading(false);
  };

  return (
    <>
      <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
          return (
            <section className="m-2">
              <div
                {...getRootProps()}
                className={`w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center ${
                  isDragActive
                    ? "bg-[#035FFE] text-white animate-pulse"
                    : "bg-slate-100/50 text-slate-400"
                }`}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && (
                  <div className="text-red-500 mt-2">File is too large.</div>
                )}
              </div>
            </section>
          );
        }}
      </Dropzone>
    </>
  );
};

export default DropZoneComponent;
