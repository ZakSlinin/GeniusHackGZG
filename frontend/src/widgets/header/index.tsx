import { Logout } from "@/shared/icons/Logout";
import { Link, useLocation, matchPath } from "react-router-dom";
import s from "./index.module.scss";
import { buildLinksByRole } from "./model/constants";

export const Header = () => {
  const { pathname } = useLocation();
  const role = "organization";

  return (
    <header className={`${s.header} df aic jcc`}>
      <nav className="df aic jcc">
        {buildLinksByRole(role).map((item) => {
          const isActive = matchPath({ path: item.path, end: true }, pathname);

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`${s.link} ${isActive ? s.active : ""} df aic`}
            >
              {item.icon}
              <strong>{item.title}</strong>
            </Link>
          );
        })}
        <button className={`${s.posabs_btn} df aic jcc`}>
          <Logout />
        </button>
      </nav>
    </header>
  );
};
