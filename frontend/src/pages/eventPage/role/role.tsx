import { Bar } from "@/shared/ui/scoreBar/";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";
import s from "./role.module.scss";

export const Role = (item: IvolunteerGroup) => {
  return (
    <span className={s.role}>
      <span className={s.nameAndCount}>
        <p>{item["name"]}</p>
        <p>
          {item["registered"]}/{item["needed"]}
        </p>
      </span>
      <span className={s.descriptionAndInteractive}>
        {item["requirements"] !== undefined ? (
          <span className={s.requirements}>
            <h2>Обязанности</h2>
            <p>{item["requirements"]}</p>
          </span>
        ) : (
          ""
        )}
        <Bar level={(item["registered"] / item["needed"]) * 100} />
        <button
          style={{
            backgroundColor: `${
              item["registered"] < item["needed"] ? "#000" : "#767676"
            }`,
          }}
        >
          {item["registered"] < item["needed"] ? "Записаться" : "нет мест"}
        </button>
      </span>
    </span>
  );
};
