import s from "./index.module.scss";
import { useMobile } from "@/shared/hooks/useMobile.ts";

const data = Array.from({ length: 10 }, () => "Роль а (10/10)");

export const EventRoles = () => {
  const maxVisibleRoles = useMobile() ? 2 : 4;
  const visibleRoles = data.slice(0, maxVisibleRoles);
  const hiddenRolesCount = data.length - maxVisibleRoles;

  return (
    <div className={`${s.roles}`}>
      <b>Роли:</b>
      <ul className={s.list}>
        {visibleRoles.map((role, id) => (
          <li key={id}>
            <strong>{role}</strong>
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
