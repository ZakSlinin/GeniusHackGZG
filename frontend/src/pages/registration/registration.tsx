import s from "./signIn.module.scss";
import { Input } from "@/shared/ui/input";
import { type ChangeEvent, useState } from "react";

export const Registration = () => {
  const [registrationForm, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegistrationFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...registrationForm, [name]: value });
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <h1>Вход</h1>
        <form>

          <Input label={"Имя пользователя"} value={registrationForm.name} onChange={handleRegistrationFormChange}
                 placeholder={"Введите имя пользователя"} />
          <Input label={"Пароль"} value={registrationForm.password} onChange={handleRegistrationFormChange}
                 placeholder={"Введите пароль"} />
          <Input label={"Email"} value={registrationForm.email} onChange={handleRegistrationFormChange}
                 placeholder={"Введите адрес электронной почты"} />


          <button>Войти</button>
          <p>Нет аккаунта? <a>Зарегистрироваться</a></p>
        </form>
      </div>
    </div>
  );
};