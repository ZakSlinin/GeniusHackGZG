import s from "./bar.module.scss";

export const Bar = ({ level }: { level: number }) => {
  return (
    <div className={s.barContainer}>
      <div style={
        {
          width: level + "%"
        }
      } className={s.bar}></div>
    </div>
  );
};