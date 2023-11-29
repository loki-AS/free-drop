"use client";

import {
  itemsPerPage,
  maximumDisplayedPages,
} from "@/constants/TableConstants";
import { FileType } from "@/constants/types";
import {
  calculateDisplayedPages,
  getCurrentTableData,
  getPageNumbers,
  getTotalPages,
} from "@/utils/TablePageFunctions";
import React, { useState } from "react";
import Table from "./common/Table";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import prettyBytes from "pretty-bytes";

interface Props {
  filesData: FileType[];
  tableHeader: string[];
}

const FilesTable = (props: Props) => {
  const { filesData, tableHeader } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = getTotalPages(filesData, itemsPerPage);

  const currentData = getCurrentTableData(currentPage, itemsPerPage, filesData);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const displayPages = calculateDisplayedPages(
    currentPage,
    maximumDisplayedPages,
    totalPages
  );

  const pageNumbers = getPageNumbers(totalPages);

  const handleCopyClick = (textToCopy: string): void => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success(`Copied url to your clipboard!`);
      })
      .catch((error) => {
        toast.error(`failed to copy url to your clipboard`);
      });
  };

  const handleDelete = (id: string) => {
    console.log("id", id);
  };

  console.log("files", filesData);

  return (
    <>
      <Table
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        startPage={displayPages.startPage}
        pageNumbers={pageNumbers}
        endPage={displayPages.endPage}
        totalPages={totalPages}
        tableHeaders={tableHeader}
      >
        {filesData.length > 0 ? (
          <>
            {currentData?.map((item: FileType) => (
              <tr
                key={item.id}
                className="whitespace-nowrap text-sm border-b-[1px] border-[color:var(--border-color)]"
              >
                <td className="text-left px-6 py-4 font-normal capitalize">
                  {item.type}
                </td>
                <td className="text-left px-6 py-4 font-normal capitalize">
                  {item.filename}
                </td>
                <td className="text-left px-6 py-4 font-normal capitalize">
                  {item.fullName}
                </td>
                <td className="text-left px-6 py-4 font-normal capitalize">
                  {prettyBytes(parseFloat(item.size))}
                </td>
                <td className="text-left px-6 py-4 font-normal capitalize">
                  <button
                    onClick={(): void => {
                      handleCopyClick(item.downloadURL);
                    }}
                    className=" bg-gray-700 hover:bg-gray-800 p-2 rounded-full"
                  >
                    <FaRegCopy size={16} />
                  </button>
                  <button
                    className="ml-3 bg-gray-700 hover:bg-gray-800 p-2 rounded-full"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr className="">
            <td
              colSpan={5}
              style={{ textAlign: "center", verticalAlign: "middle" }}
              className="p-2 py-4 text-sm font-semibold"
            >
              You have No Files
            </td>
          </tr>
        )}
      </Table>
    </>
  );
};

export default FilesTable;
