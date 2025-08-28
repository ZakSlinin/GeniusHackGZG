import s from "./index.module.scss";

import { EventCard } from "@/entities/event/ui/event-card";
import { FilterModal } from "./ui/filter-modal";
import { SearchInput } from "./ui/search-input";
import { useState } from "react";

export const EventsPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <>
      <FilterModal
        isOpen={isFilterOpened}
        onClose={() => setIsFilterOpened(!isFilterOpened)}
      />
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
