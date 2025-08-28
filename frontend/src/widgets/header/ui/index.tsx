import { Logout } from "@/shared/icons/Logout";
import { Link, useLocation, matchPath } from "react-router-dom";
import s from "./index.module.scss";
import { buildLinksByRole } from "../model/constants";
import { HeaderLink } from "./components/link";

export const Header = () => {
  const { pathname } = useLocation();
  const role = "organization";

  return (
    <header className={`${s.header} df aic jcc`}>
      <nav className="df aic jcc">
        {buildLinksByRole(role).map((item) => {
          const isEventsHome = item.path === "/";

          const isActive = isEventsHome
            ? pathname === "/" ||
              (pathname.startsWith("/events/") && pathname !== "/events/new")
            : matchPath({ path: item.path, end: true }, pathname);

          return <HeaderLink item={item} isActive={isActive} key={item.path} />;
        })}

        <button className={`${s.posabs_btn} df aic jcc`}>
          <Logout />
        </button>
      </nav>
    </header>
  );
};
