import axios from "axios";
import type { FetchNotesParams, Note, NotesResponse } from "@/types/note";

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page = 1,
  search = "",
}: FetchNotesParams): Promise<NotesResponse> {
  const response = await notehubApi.get<NotesResponse>("/notes", {
    params: {
      page,
      search,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await notehubApi.get<Note>(`/notes/${id}`);
  return response.data;
}