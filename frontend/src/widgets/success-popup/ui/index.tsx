import { useEffect, useRef, useState } from "react";
import s from "./index.module.scss";
import type { PopupProps } from "../model/types";
import { Calendar } from "@/shared/icons/Calendar.tsx";
import { Clock } from "lucide-react";
import { MapPin } from "@/shared/icons/MapPin.tsx";

export const Popup = ({
                        isOpen, name,
                        location, timeStart,
                        timeEnd, date, onClose
                      }: PopupProps) => {
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
        className={`${s.modal} ${isClosing ? s.modalClosing : ""}`}
      >
        <div className={s.content}>
          <span className={s.message}>
            <h1>🎉</h1>
            <h2>Вы успешно записались</h2>
            <h3>{name}</h3>
          </span>
          <span className={s.information}>
            <span className={s.spanWithInformation}>
              <Calendar /> {String(date.getDay()) +
              " " +
              String(date.getMonth()) +
              " " +
              String(date.getFullYear())}
            </span>
            <span className={s.spanWithInformation}>
              <Clock /> {timeStart} - {timeEnd}
            </span>
            <span className={s.spanWithInformation}>
              <MapPin /> {location}
            </span>
          </span>
          <button className={s.closeButton} onClick={startClosing}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
