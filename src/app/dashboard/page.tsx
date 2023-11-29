"use client";

import DropZoneComponent from "@/components/DropZoneComponent";
import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "@/constants/types";
import FilesTable from "@/components/FilesTable";
import { useCollection } from "react-firebase-hooks/firestore";

const DashBoard = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);

  const [docs, loading, error] = useCollection(
    query(collection(db, "users", "123", "files"), orderBy("timestamp", sort))
  );

  useEffect(() => {
    const fetchData = async () => {
      const docsSnapshot = await getDocs(
        collection(db, "users", "123", "files")
      );

      const filesData: FileType[] = docsSnapshot.docs.map(
        (doc) => doc.data() as FileType
      );
      setFiles(filesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!docs) return;

    const files = docs.docs.map((doc) => doc.data() as FileType);

    setInitialFiles(files);
  }, [docs]);

  return (
    <div>
      <div>
        <DropZoneComponent />
      </div>
      <div className="py-10 px-2">
        <div className="pb-3">
          <h1 className="text-sm font-medium">Drop Table</h1>
        </div>
        <div className="bg-[#171717] py-6 px-3 rounded-md">
          <div className="flex justify-end items-center">
            <button
              type="button"
              className=" bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 text-sm shadow-lg"
              onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
            >
              Sort By {sort === "desc" ? "Newest" : "Oldest"}
            </button>
          </div>
          <FilesTable
            filesData={initialFiles}
            tableHeader={[
              "File Type",
              "file Name",
              "created_by",
              "file_size",
              "actions",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
