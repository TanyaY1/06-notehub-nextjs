"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

interface Props {
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({ initialPage, initialSearch }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", initialPage, initialSearch],
    queryFn: () => fetchNotes({ page: initialPage, search: initialSearch }),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.container}>
      <h1 className={css.title}>Notes</h1>

      {data && data.notes.length > 0 ? (
        <ul>
          {data.notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </main>
  );
}