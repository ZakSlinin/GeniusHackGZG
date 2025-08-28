import { lazy, useState } from "react";
import s from "./index.module.scss";

import { EventCard } from "@/entities/event/ui/event-card";
import { SearchInput } from "./ui/search-input";
import { FilterModalContent } from "./ui/filter-modal-content";

const Modal = lazy(() => import("@/shared/ui/modal/"));

export const EventsPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

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
            FF.
          </button>
        </div>

        <ul className={s.eventsList}>
          {Array.from({ length: 20 }, () => (
            <li>
              <EventCard />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
