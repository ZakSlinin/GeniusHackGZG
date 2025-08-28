import { useEffect, useRef } from "react";
import s from "./index.module.scss";
import type { ModalProps } from "../model/types";

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={`${s.modal} ${className}`} ref={modalRef}>
        <button className={s.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
