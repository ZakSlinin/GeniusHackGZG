import { Logout } from "@/shared/icons/Logout";
import { Link, matchPath, useLocation } from "react-router-dom";
import s from "./index.module.scss";
import { buildLinksByRole } from "./model/constants";
import { useMobile } from "@/shared/hooks/useMobile.ts";
import { useState } from "react";

export const Header = () => {
  const { pathname } = useLocation();
  const role = "organization";
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMobile();
  const [isLogin] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((value) => !value);
  };

  return (
    <header style={
      {
        background: `${isMobile ? "transparent" : "var(--header-bg)"}`
      }
    } className={`${s.header} df aic jcc`}>
      {isMobile ? (
        <div className={s.burger}>
          <button
            className={`${s.burger_btn} df aic jcc`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <p className={s.burger_icon}>{isMenuOpen ? "✕" : "☰"}</p>
          </button>
          <nav className={`${s.mobile_nav} ${isMenuOpen ? s.open : ""} df fdc aic`}>
            {buildLinksByRole(role).map((item) => {
              const isActive = matchPath({ path: item.path, end: true }, pathname);
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`${s.link} ${isActive ? s.active : ""} df aic`}
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <strong>{item.title}</strong>
                </Link>
              );
            })}
            <button className={`${s.posabs_btn} df aic jcc`} onClick={toggleMenu}>
              {isLogin ? (
                  <div className={"invertDiv"}>
                    <Logout />
                    <strong>Выход</strong>
                  </div>
                ) :
                <>
                  <span>
                    <a href={"/sign-in"}>Войти</a>
                    <p>или</p>
                    <a href={"/registration"}>Зарегистрироваться</a>
                  </span>
                </>
              }
            </button>
          </nav>
        </div>
      ) : (
        <nav className={`${s.desktop_nav} df aic jcc`}>
          <span className={s.links}>
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
          </span>
          <span className={s.buttons}>
            <button className={`${s.posabs_btn} df aic jcc`}>
              {isLogin ? (
                  <>
                    <Logout />
                  </>
                ) :
                <>
                  <span>
                    <a href={"/sign-in"}>Войти</a>
                    <p>или</p>
                    <a href={"/registration"}>Зарегистрироваться</a>
                  </span>
                </>
              }
            </button>
          </span>
        </nav>
      )}
    </header>
  );
};
