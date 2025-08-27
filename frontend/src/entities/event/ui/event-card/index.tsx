import { EventIdentity } from "./components/identity";
import { EventInformation } from "./components/information";
import { EventRoles } from "./components/roles";
import s from "./index.module.scss";

export const EventCard = () => {
  return (
    <div className={`${s.event}`}>
      <EventIdentity />
      <EventInformation />
      <EventRoles />
    </div>
  );
};
