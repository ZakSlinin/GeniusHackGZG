import { Bar } from "../../scoreBar/bar";
import s from "./roleBox.module.css";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";

/**
 * progress bar + role visualizer
 *
 * использовать на странице "координировать"
 */

export const RoleBox = ({ name, needed, registered }: IvolunteerGroup) => {
  const level = needed > 0 ? (registered / needed) * 100 : 0;
  const colorOfPreview = needed == registered ? "CEFBB9" : "auto";

  return (
    <div className={s.roleContainer}>
      <span className={s.roleTitle}>
        <p>{name}</p>
        <button className={s.neededPreview} style={
          {
            backgroundColor: "#" + colorOfPreview
          }
        }>
          {registered}/{needed}
        </button>
      </span>
      <Bar level={level} />
    </div>
  );
};

