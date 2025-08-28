import { lazy, useState } from "react";
import s from "./index.module.scss";

import { EventCard } from "@/entities/event/ui/event-card";
import { SearchInput } from "./components/search-input";
import { FilterModalContent } from "./components/filter-modal-content";
import { Filter, Sliders, SlidersHorizontal } from "lucide-react";

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
            <SlidersHorizontal />
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
