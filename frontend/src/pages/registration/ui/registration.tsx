import s from "./registration.module.scss";
import { Input } from "@/shared/ui/input";
import { useForm, Controller } from "react-hook-form";
import { BarSelector } from "@/shared/ui/barSelector/";

type RegistrationFormT = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export const Registration = () => {
  const { register, handleSubmit, control } = useForm<RegistrationFormT>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = (data: RegistrationFormT) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"Имя пользователя"}
            placeholder={"Введите имя пользователя"}
            {...register("name", { required: "Введите имя" })}
          />

          <Input
            label={"Пароль"}
            type="password"
            placeholder={"Введите пароль"}
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
          />

          <Input
            label={"Email"}
            placeholder={"Введите адрес электронной почты"}
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный формат email",
              },
            })}
          />

          <Controller
            control={control}
            name="role"
            rules={{ required: "Выберите роль" }}
            render={({ field: { onChange, value } }) => (
              <BarSelector
                values={["Волонтёр", "Координатор", "Организатор"]}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <button type="submit" className={s.signUpButton}>
            Зарегистрироваться
          </button>

          <p>
            Есть аккаунт? <a>Войти</a>
          </p>
        </form>
      </div>
    </div>
  );
};
