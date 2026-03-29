"use client";

import { ReactNode } from "react";
import css from "./Modal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.close} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}