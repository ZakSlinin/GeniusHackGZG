import { Search } from "lucide-react";
import s from "./index.module.scss";

export const SearchInput = () => {
  return (
    <div className={s.inputWrapper}>
      <input type="text" className={s.input} placeholder="Поиск..." />
      <button className={s.endElement} title="Искать">
        <Search />
      </button>
    </div>
  );
};
