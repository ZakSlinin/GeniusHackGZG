import { lazy, useEffect, useState } from "react";
import s from "./index.module.scss";

import { EventCard } from "@/entities/event/ui/event-card";
import { SlidersHorizontal } from "lucide-react";
import { FilterModalContent } from "./components/filter-modal-content";
import { SearchInput } from "./components/search-input";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";

const Modal = lazy(() => import("@/shared/ui/modal/"));

export const EventsPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [events, setEvents] = useState<Ievent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEventsFromStorage = (): Ievent[] => {
    try {
      const stored = localStorage.getItem('events');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Ошибка при чтении из LocalStorage:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEvents = () => {
      try {
        setLoading(true);
        const storedEvents = getEventsFromStorage();

        const eventsWithParsedDates = storedEvents.map(event => ({
          ...event,
          date: new Date(event.date)
        }));

        setEvents(eventsWithParsedDates);
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке событий:", err);
        // setError("Не удалось загрузить события");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className={s.loading}>Загрузка событий...</div>;
  }

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  return (
    <>
      <Modal isOpen={isFilterOpened} onClose={() => setIsFilterOpened(false)}>
        <FilterModalContent />
      </Modal>

      <div className={s.eventsPage}>
        <div className={s.searchSection}>
          <SearchInput />
          <button
            className={s.filter}
            title="Фильтр/Сортировка"
            onClick={() => setIsFilterOpened(true)}
          >
            <SlidersHorizontal />
          </button>
        </div>

        <ul className={s.eventsList}>
          {events.map((event, index) => (
            <li key={index}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};