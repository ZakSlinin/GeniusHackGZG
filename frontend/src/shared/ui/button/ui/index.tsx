import s from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "outlined"; // UNFINISHED
}

export const Button = ({ children, className = "" }: ButtonProps) => {
  return <button className={`${s.button} ${className}`}>{children}</button>;
};
