import { lazy, useState } from "react";
import s from "./index.module.scss";

import { EventCard } from "@/entities/event/ui/event-card";
import { SlidersHorizontal } from "lucide-react";
import { FilterModalContent } from "./components/filter-modal-content";
import { SearchInput } from "./components/search-input";
import { dataSet } from "./dataSet.ts";

const Modal = lazy(() => import("@/shared/ui/modal/"));

export const EventsPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const events = dataSet;

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