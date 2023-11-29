export const getTotalPages = (
  data: Array<any>,
  itemsPerPage: number
): number => {
  return Math.ceil((data?.length || 0) / itemsPerPage);
};

export const getStartIndex = (page: number, itemsPerPage: number): number =>
  (page - 1) * itemsPerPage;

export function getCurrentTableData(
  currentPage: number,
  itemsPerPage: number,
  tableData: Array<any>
): Array<any> {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData?.slice(startIndex, endIndex);

  return currentData;
}

export const calculateDisplayedPages = (
  currentPage: number,
  maximumDisplayedPages: number,
  totalPages: number
): {
  startPage: number;
  endPage: number;
} => {
  let startPage = currentPage - Math.floor(maximumDisplayedPages / 2);
  let endPage = currentPage + Math.floor(maximumDisplayedPages / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + maximumDisplayedPages - 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maximumDisplayedPages + 1;
  }

  return { startPage, endPage };
};

export const getPageNumbers = (totalPages: number): Array<number> =>
  Array.from({ length: totalPages }, (_, index) => index + 1);
