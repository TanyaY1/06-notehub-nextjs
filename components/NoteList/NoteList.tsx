"use client";

import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button type="button" onClick={() => mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}