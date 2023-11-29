import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

interface Props {
  handlePageClick: (page: number) => void;
  currentPage: number;
  startPage: number;
  pageNumbers: Array<number>;
  endPage: number;
  totalPages: number;
}

const Pagination = (props: Props) => {
  const {
    handlePageClick,
    currentPage,
    startPage,
    pageNumbers,
    endPage,
    totalPages,
  } = props;

  return (
    <div>
      <div className="flex justify-between items-center mt-5 mx-6 border-t-[1px] border-[color:var(--border-color)] pt-4">
        <button
          className="text-sm font-medium text-[color:var(--table-text-color)] flex items-center gap-3"
          onClick={(): void => {
            handlePageClick(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
        <div className="flex items-center gap-4 text-sm font-medium text-[color:var(--table-text-color)]">
          {startPage > 1 && (
            <button
              key="page-1"
              onClick={(): void => {
                handlePageClick(1);
              }}
            >
              1
            </button>
          )}
          {startPage > 2 && <span key="ellipsis-start">...</span>}
          {pageNumbers.slice(startPage - 1, endPage).map((page) => (
            <div key={`page-${page}`}>
              <button
                onClick={(): void => {
                  handlePageClick(page);
                }}
                className={`mx-1 text-sm font-medium ${
                  currentPage === page
                    ? "text-[color:var(--primary-color)]"
                    : ""
                }`}
              >
                {page}
              </button>
              <div
                className={`${
                  currentPage === page
                    ? "text-[color:var(--primary-color)] border-t-2 border-[color:var(--primary-color)] relative bottom-[2.35rem] w-full"
                    : ""
                }`}
              />
            </div>
          ))}
          {endPage < totalPages - 1 && <span key="ellipsis-end">...</span>}
          {endPage < totalPages && (
            <button
              key={`page-${totalPages}`}
              onClick={(): void => {
                handlePageClick(totalPages);
              }}
            >
              {totalPages}
            </button>
          )}
        </div>
        <button
          className="text-sm font-medium text-[color:var(--table-text-color)] flex items-center gap-3"
          onClick={(): void => {
            handlePageClick(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
