import s from "./index.module.scss";
import { Input, InputDate } from "@/shared/ui/input";

export const FilterModalContent = () => {
  return (
    <>
      <ul className={s.content}>
        <h3>Фильтры</h3>
        <li>
          <span>Дата: </span> <InputDate />
        </li>
        <li>
          <span>Категория: </span> <Input placeholder="Введите название" />
        </li>
        <li>
          <span>Место: </span> <Input placeholder="Введите место" />
        </li>
      </ul>
    </>
  );
};
