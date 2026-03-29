"use client";

import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: Props) {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search notes..."
    />
  );
}