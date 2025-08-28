import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import { Calendar } from "@/shared/icons/Calendar.tsx";
import { Clock } from "@/shared/icons/Clock.tsx";
import { MapPin } from "@/shared/icons/MapPin.tsx";
import { User } from "@/shared/icons/User.tsx";
import { Bar } from "@/shared/ui/scoreBar/";
import { Phone } from "@/shared/icons/Phone.tsx";
import { Email } from "@/shared/icons/Email.tsx";
import s from "./event.module.scss";
import { Role } from "@/pages/eventPage/ui/components/role/role";
import { useState } from "react";
import Popup from "@/widgets/success-popup";

export const Event = ({
                        name,
                        category,
                        createdBy,
                        date,
                        timeStart,
                        timeEnd,
                        volunteerCount,
                        volunteerNeedCount,
                        shortDescription,
                        description,
                        location,
                        volunteerGroups,
                        number,
                        telegramUsername,
                        email
                      }: Ievent) => {

  const [isPopupOpened, setIsPopupOpened] = useState(false);


  const onGettedClick = () => {
    setIsPopupOpened(true);
  };

  return (
    <>
      <Popup isOpen={isPopupOpened} onClose={() => setIsPopupOpened(false)} name={name}
             date={date} timeEnd={timeEnd} timeStart={timeStart} location={location}
      />

      <div className={s.body}>
        <div className={s.container}>
          <h1>Вернуться к списку</h1>
          <div className={s.basicInfo}>
            <span className={s.nameAndCategory}>
              <h2>{name}</h2>
              <button>{category}</button>
            </span>
            <p>{createdBy}</p>
            <span className={s.information}>
              <span>
                <Calendar />
                <p>
                  {String(date.getDay()) +
                    " " +
                    String(date.getMonth()) +
                    " " +
                    String(date.getFullYear())}
                </p>
              </span>
              <span>
                <Clock />
                <p>
                  {timeStart} - {timeEnd}
                </p>
              </span>
              <span>
                <MapPin />
                <p>{location}</p>
              </span>
              <span>
                <User />
                <p>
                  {volunteerCount} из {volunteerNeedCount}
                </p>
                <Bar level={(volunteerCount / volunteerNeedCount) * 100} />
              </span>
              <span>
                <Phone />
                <p>{number}</p>
                <p>
                  {telegramUsername !== undefined && telegramUsername !== ""
                    ? "Telegram: " + telegramUsername
                    : ""}
                </p>
              </span>
              <span>
                <Email />
                <p>{email}</p>
              </span>
            </span>
            <span className={s.description}>
              <h3>Описание</h3>
              <p>
                {description == "" || description == undefined
                  ? shortDescription
                  : description}
              </p>
            </span>
          </div>
          <div className={s.roles}>
            {volunteerGroups.map((item) => (
              <Role
                name={item.name}
                needed={item.needed}
                registered={item.registered}
                requirements={item["requirements"]}
                click={onGettedClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};