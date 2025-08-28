import s from "./roleBox.module.scss";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";
import { Bar } from "@/shared/ui/scoreBar";


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

