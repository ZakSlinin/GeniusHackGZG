import s from "./registration.module.scss";
import { Input } from "@/shared/ui/input";
import { BarSelector } from "@/shared/ui/barSelector/";
import { useForm, Controller } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { authApi } from "@/shared/store/auth";

export type RegisterFormT = {
  name: string;
  email: string;
  password: string;
  tableName: "Волонтёр" | "Координатор" | "Организатор";
};

export const Registration = observer(() => {
  const { register, handleSubmit, control } = useForm<RegisterFormT>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      tableName: "Волонтёр",
    },
  });

  const { reg } = authApi;

  const onSubmit = (data: RegisterFormT) => {
    reg(data);
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            {...register("name", { required: "Введите имя" })}
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

          <Controller
            control={control}
            name="tableName"
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
});
