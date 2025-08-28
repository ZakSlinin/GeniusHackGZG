import s from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "outlined"; // UNFINISHED
}

export const Button = ({ className = "", children, ...props }: ButtonProps) => {
  return (
    <button className={`${s.button} ${className}`} {...props}>
      {children}
    </button>
  );
};
