import s from "./index.module.scss";
import { useMobile } from "@/shared/hooks/useMobile.ts";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";


export const EventRoles = ({ volunteerGroups }: { volunteerGroups: IvolunteerGroup[] }) => {
  const maxVisibleRoles = useMobile() ? 2 : 4;
  const visibleRoles = volunteerGroups.slice(0, maxVisibleRoles);
  const hiddenRolesCount = volunteerGroups.length - maxVisibleRoles;

  return (
    <div className={`${s.roles}`}>
      <b>Роли:</b>
      <ul className={s.list}>
        {visibleRoles.map((role, id) => (
          <li key={id}>
            <strong>{role.name} ({role.registered}/{role.needed})</strong>
          </li>
        ))}
        {hiddenRolesCount > 0 && (
          <li>
            <strong>+{hiddenRolesCount}</strong>
          </li>
        )}
      </ul>
    </div>
  );
};