import s from "./index.module.scss";
import { InputDate } from "@/shared/ui/input";

export const FilterModalContent = () => {
  return (
    <>
      {" "}
      <h3>Фильтры</h3>
      <ul className={s.content}>
        <li>
          <span>Дата: </span> <InputDate />
        </li>
      </ul>
    </>
  );
};
