import "./bars.css";
import type { VolunteerGroup } from "@/shared/types/volunteerGroup.ts";

/**
 * progress bar + role visualizer
 *
 * использовать на странице "координировать"
 */

export const RoleBox = ({ name, needed, registered }: VolunteerGroup) => {
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
      <div className={"barContainer"}>
        <div style={
          {
            width: level + "%",
          }
        } className={"bar"}></div>
      </div>
    </div>
  );
};

