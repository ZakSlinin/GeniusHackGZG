import type { LinkT } from "@/widgets/header/model/types";
import s from "./index.module.scss";
import { Link, type PathMatch } from "react-router-dom";

interface HeaderLinkProps {
  item: LinkT;
  isActive: boolean | PathMatch<string> | null;
}

export const HeaderLink = ({ item, isActive }: HeaderLinkProps) => {
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
};
