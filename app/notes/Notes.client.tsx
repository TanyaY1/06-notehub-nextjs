"use client";

import { useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

interface Props {
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({
  initialPage,
  initialSearch,
}: Props) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debounceSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const updateUrl = (nextPage: number, nextSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    } else {
      params.delete("page");
    }

    if (nextSearch.trim() !== "") {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    debounceSearch(value);
    updateUrl(1, value);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    updateUrl(selectedPage, debouncedSearch);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearchChange} />
        <button onClick={openModal}>Create note</button>
      </header>

      {data && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />

          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </main>
  );
}