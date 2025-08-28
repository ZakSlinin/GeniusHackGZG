import s from "./index.module.scss";

export const SearchInput = () => {
  return (
    <div className={s.inputWrapper}>
      <input type="text" className={s.input} placeholder="Поиск..." />
      <div className={s.endElement}>поиск</div>
    </div>
  );
};
