import s from "./index.module.scss";

export const EventIdentity = () => {
  return (
    <div className={s.identity}>
      <strong className={s.category}>Экология</strong>
      <h3>Помощь растениям на планете Марс приспособиться к Земле</h3>
      <p className={s.organization}>Имя организации</p>
      <p className={s.description}>
        Краткое описание для всей идеи Краткое описание для всей идеи Краткое
        описание для всей идеи Краткое описание для всей идеи Краткое описание
        для всей идеи
      </p>
    </div>
  );
};
