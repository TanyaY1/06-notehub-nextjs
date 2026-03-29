"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

interface SelectedItem {
  selected: number;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = ({ selected }: SelectedItem) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakClassName={css.pageItem}
      disabledClassName={css.disabled}
    />
  );
}