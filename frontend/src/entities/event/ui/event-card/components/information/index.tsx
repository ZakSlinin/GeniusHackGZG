import s from "./index.module.scss";

import { Calendar } from "@/shared/icons/Calendar";
import { Clock } from "@/shared/icons/Clock";
import { MapPin } from "@/shared/icons/MapPin";
import { User } from "@/shared/icons/User";

export const EventInformation = ({
                                   date,
                                   timeStart,
                                   timeEnd,
                                   location,
                                   volunteerCount,
                                   volunteerNeedCount
                                 }: {
  date: Date;
  timeStart: string;
  timeEnd: string;
  location: string;
  volunteerCount: number;
  volunteerNeedCount: number;
}) => {
  return (
    <div className={`${s.information}`}>
      <div className={s.date}>
        <span>
          <Calendar /> {date.toLocaleDateString("ru-RU")}
        </span>
        <span>
          <Clock />
          {timeStart} - {timeEnd}
        </span>
      </div>
      <span>
        <MapPin />
        {location}
      </span>
      <span>
        <User />
        {volunteerCount} из {volunteerNeedCount}
      </span>
    </div>
  );
};
