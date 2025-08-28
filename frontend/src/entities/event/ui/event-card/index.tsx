import { Button } from "@/shared/ui/button/ui";
import { EventIdentity } from "./components/identity";
import { EventInformation } from "./components/information";
import { EventRoles } from "./components/roles";
import s from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export const EventCard = () => {
  const navigate = useNavigate();

  return (
    <div className={s.event}>
      <EventIdentity />
      <EventInformation />
      <EventRoles />
      <Button onClick={() => navigate("/events/iboibroibnornb")}>
        Подробнее
      </Button>
    </div>
  );
};
