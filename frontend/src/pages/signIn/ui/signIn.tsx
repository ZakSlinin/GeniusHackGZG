import { Input } from "@/shared/ui/input";
import s from "./signIn.module.scss";
import { useForm } from "react-hook-form";

type SignInFormT = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInFormT>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormT) => {
    console.log("Sign in with:", data);
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="Введите адрес электронной почты"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный формат email",
              },
            })}
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
          />

          <button type="submit" className={s.signInButton}>
            Войти
          </button>

          <p>
            Нет аккаунта? <a>Зарегистрироваться</a>
          </p>
        </form>
      </div>
    </div>
  );
};
