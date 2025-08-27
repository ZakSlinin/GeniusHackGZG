import { EventCard } from "@/entities/event/ui/event-card";
import s from "./index.module.scss";

export const EventsPage = () => {
  return (
    <div className={s.eventsPage}>
      {Array.from({ length: 20 }, () => (
        <EventCard />
      ))}
    </div>
  );
};
