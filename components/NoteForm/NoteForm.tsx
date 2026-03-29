"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface Props {
  onClose: () => void;
}

export default function NoteForm({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title,
      content,
      tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
      />

      <button type="submit">Create</button>
    </form>
  );
}