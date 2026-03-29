import axios from "axios";
import type { Note } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

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

export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await notehubApi.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
}