import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginations = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxPages = 4;
  const pageNumbers = [];

  // Determine the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = startPage + maxPages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="flex items-center justify-center gap-3 my-10 text-2xl  md:text-4xl">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsArrowLeftShort />
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              onClick={() => onPageChange(page)}
              className={`page-link hover:text-white ${
                currentPage === page
                  ? "bg-primary rounded-full w-14 h-14 flex justify-center items-center text-white p-2"
                  : ""
              } hover:bg-primary hover:scale-90  rounded-full w-14 h-14 flex justify-center items-center hover:p-2 duration-100`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <BsArrowRightShort />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginations;
