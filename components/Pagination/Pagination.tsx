"use client";

import css from "./Pagination.module.css";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <div className={css.pagination}>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={page === currentPage ? css.active : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}