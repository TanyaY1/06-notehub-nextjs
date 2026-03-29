"use client";

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string()
    .trim()
    .max(500, "Content must be at most 500 characters"),
  tag: Yup.string().required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    mutate(
      {
        title: values.title.trim(),
        content: values.content.trim(),
        tag: values.tag,
      },
      {
        onSuccess: () => {
          actions.resetForm();
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field
            className={css.input}
            type="text"
            name="title"
            placeholder="Enter title"
          />
          <ErrorMessage className={css.error} name="title" component="span" />
        </label>

        <label className={css.label}>
          Content
          <Field
            className={css.textarea}
            as="textarea"
            name="content"
            placeholder="Enter note content"
          />
          <ErrorMessage className={css.error} name="content" component="span" />
        </label>

        <label className={css.label}>
          Tag
          <Field className={css.select} as="select" name="tag">
            <option value="">Select a tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage className={css.error} name="tag" component="span" />
        </label>

        <div className={css.actions}>
          <button
            className={css.cancelButton}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className={css.submitButton} type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}