"use client";

import Pagination from "./Pagination";

interface Props {
  children: Array<Element> | any;
  handlePageClick: (page: number) => void;
  currentPage: number;
  startPage: number;
  pageNumbers: Array<number>;
  endPage: number;
  totalPages: number;
  tableHeaders: Array<string>;
}

const Table = (props: Props) => {
  const {
    tableHeaders,
    children,
    handlePageClick,
    currentPage,
    startPage,
    pageNumbers,
    endPage,
    totalPages,
  } = props;

  return (
    <div>
      <div className="overflow-x-auto border-[1px] border-[color:var(--border-color)] table-shadow rounded-lg">
        <div
          className="table-container"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="min-w-full">
            <thead>
              <tr className="border-b-[1px] border-[color:var(--border-color)]">
                {tableHeaders?.map((header, index) => (
                  <th
                    key={`${index + header}`}
                    className="text-left px-6 py-4 text-xs font-medium uppercase leading-[0.6px]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
      <div>
        <Pagination
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          startPage={startPage}
          pageNumbers={pageNumbers}
          endPage={endPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Table;
