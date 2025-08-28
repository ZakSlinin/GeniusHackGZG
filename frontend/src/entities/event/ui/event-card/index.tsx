import { Button } from "@/shared/ui/button/ui";
import { EventIdentity } from "./components/identity";
import { EventInformation } from "./components/information";
import { EventRoles } from "./components/roles";
import s from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";

export const EventCard = ({ event }: { event: Ievent }) => {
  const navigate = useNavigate();

  return (
    <div className={s.event}>
      <EventIdentity
        category={event.category}
        name={event.name}
        organization={event.createdBy}
        description={event.shortDescription}
      />
      <EventInformation
        date={event.date}
        timeStart={event.timeStart}
        timeEnd={event.timeEnd}
        location={event.location}
        volunteerCount={event.volunteerCount}
        volunteerNeedCount={event.volunteerNeedCount}
      />
      <EventRoles volunteerGroups={event.volunteerGroups} />
      <Button onClick={() => navigate(`/events/${event.name}`)}>
        Подробнее
      </Button>
    </div>
  );
};