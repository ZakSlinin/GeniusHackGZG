import s from "./index.module.scss";

export const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className={s.pageWrapper}>{children}</div>;
};
