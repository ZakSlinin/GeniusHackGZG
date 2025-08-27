import { Bar } from "../../scoreBar/bar";
import "./roleBox.css";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";

/**
 * progress bar + role visualizer
 *
 * использовать на странице "координировать"
 */

export const RoleBox = ({ name, needed, registered }: IvolunteerGroup) => {
  const level = needed > 0 ? (registered / needed) * 100 : 0;
  const colorOfPreview = needed == registered ? "CEFBB9" : "auto"

  return (
    <div className={"roleContainer"}>
      <span className={"roleTitle"}>
        <p>{name}</p>
        <button className={'neededPreview'} style={
          {
            backgroundColor: "#" + colorOfPreview
          }
        }>
          {registered}/{needed}
        </button>
      </span>
      <Bar level={level}/>
    </div>
  );
};

