import s from "./index.module.scss";

import { Calendar } from "@/shared/icons/Calendar";
import { Clock } from "@/shared/icons/Clock";
import { MapPin } from "@/shared/icons/MapPin";
import { User } from "@/shared/icons/User";

export const EventInformation = () => {
  return (
    <div className={`${s.information}`}>
      <div className={s.date}>
        <span>
          <Calendar /> 27 августа 2025
        </span>
        <span>
          <Clock />
          {"10:00"} - {"16:00"}
        </span>
      </div>
      <span>
        <MapPin />
        JDFLAG, ул. FLAГSTRИК
      </span>
      <span>
        <User />
        10000 из 8500
      </span>
    </div>
  );
};
