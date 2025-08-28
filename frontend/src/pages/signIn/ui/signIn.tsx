import { Input } from "@/shared/ui/input";
import s from "./signIn.module.scss";
import { type ChangeEvent, useState } from "react";

export const SignIn = () => {
  const [signInForm, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSignInFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...signInForm, [name]: value });
  };

  return (
    <div className={s.body}>
      <div className={s.container}>
        <h1>Вход</h1>
        <form>
          <Input label={"Email"} value={signInForm.email} onChange={handleSignInFormChange}
                 placeholder={"Введите адрес электронной почты"} />

          <Input label={"Пароль"} value={signInForm.password} onChange={handleSignInFormChange}
                 placeholder={"Введите пароль"} />

          <button>Войти</button>
          <p>Нет аккаунта? <a href={'/auth/reg'}>Зарегистрироваться</a></p>
        </form>
      </div>
    </div>
  );
};