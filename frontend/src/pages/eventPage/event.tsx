import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import { Calendar } from "@/shared/icons/Calendar.tsx";
import { Clock } from "@/shared/icons/Clock.tsx";
import { MapPin } from "@/shared/icons/MapPin.tsx";
import { User } from "@/shared/icons/User.tsx";
import { Bar } from "@/shared/ui/scoreBar/bar.tsx";
import { Phone } from "@/shared/icons/Phone.tsx";
import { Email } from "@/shared/icons/Email.tsx";

export const Event = ({
                        name,
                        category,
                        createdBy,
                        // Мы храним что? имя? userID? Email?
                        date,
                        timeStart,
                        timeEnd,
                        volunteerCount,
                        volunteerNeedCount,
                        shortDescription,
                        description,
                        location,
                        volunteerGroups,
                        number, telegramUsername, email
                      }: Ievent) => {

  return (
    <div className={"body"}>
      <div className={"container"}>
        <h1>Вернуться к списку</h1>
        <div className={"basicInfo"}>
          <span className={"nameAndCategory"}>
            <h2>{name}</h2>
            <button>{category}</button>
          </span>
          <p>{createdBy}</p>
          <span className={"information"}>
            <span>
              <Calendar />
              <p>{String(date)}</p>
            </span>
            <span>
              <Clock />
              <p>{timeStart} - {timeEnd}</p>
            </span>
            <span>
              <MapPin />
              <p>{location}</p>
            </span>
            <span>
              <User />
              <p>{volunteerCount} из {volunteerNeedCount}</p>
              <Bar level={volunteerCount / volunteerNeedCount * 100} />
            </span>
            <span>
              <Phone />
              <p>{number}</p>
              <p>{telegramUsername !== undefined && telegramUsername !== "" ? "Telegram: " + telegramUsername : ""}</p>
            </span>
            <span>
              <Email />
              <p>{email}</p>
            </span>
          </span>
          <span className={"description"}>
            <h3>Описание</h3>
            <p>{description == "" || description == undefined ? shortDescription : description}</p>
          </span>
        </div>
        <div className={"roles"}>
          {
            volunteerGroups.map((item) => (
              <span className={"role"}>
                <span className={"nameAndCount"}>
                  <p>{item["name"]}</p>
                  <p>{item["registered"]}/{item["needed"]}</p>
                </span>
                <span className={"descriptionAndInteractive"}>
                  {
                    item["requirements"] !== undefined ?
                      <span className={"requirements"}>
                        <h2>Обязанности</h2>
                        <p>{item["requirements"]}</p>
                      </span> : ""
                  }
                  <Bar level={item["registered"] / item["needed"] * 100} />
                  <button>{item["registered"] < item["needed"] ? "Записаться" : "нет мест"}</button>
                </span>
              </span>
            ))
          }
        </div>
      </div>
    </div>
  );
};