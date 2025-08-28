import { useEffect, useState, useRef } from "react";
import s from "./index.module.scss";
import type { ModalProps } from "../model/types";

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        startClosing();
      }
    };

    if (isOpen || isClosing) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      startClosing();
    }
  };

  const startClosing = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`${s.overlay} ${isClosing ? s.overlayClosing : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${s.modal} ${isClosing ? s.modalClosing : ""} ${className}`}
      >
        <button className={s.closeButton} onClick={startClosing}>
          ×
        </button>

        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
