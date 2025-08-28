import { Bar } from "@/shared/ui/scoreBar/";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";
import s from "./role.module.scss";

interface IvolunteerGroupWithOutput extends IvolunteerGroup {
  click: () => void;
}

export const Role = ({
                       name,
                       needed,
                       registered,
                       requirements,
                       click
                     }: IvolunteerGroupWithOutput) => {
  return (
    <span className={s.role}>
        <span className={s.nameAndCount}>
          <p>{name}</p>
          <p>
            {registered}/{needed}
          </p>
        </span>
        <span className={s.descriptionAndInteractive}>
          {requirements !== undefined ? (
            <span className={s.requirements}>
              <h2>Обязанности</h2>
              <p>{requirements}</p>
            </span>
          ) : (
            ""
          )}
          <Bar level={(registered / needed) * 100} />
          <button
            onClick={click}
            style={{
              backgroundColor: `${
                registered < needed ? "#000" : "#767676"
              }`
            }}
          >
            {registered < needed ? "Записаться" : "нет мест"}
          </button>
        </span>
      </span>
  );
};
