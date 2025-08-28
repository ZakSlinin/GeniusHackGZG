import s from "./registration.module.scss";
import { Input } from "@/shared/ui/input";
import { type ChangeEvent, useState } from "react";
import { BarSelector } from "@/shared/ui/barSelector/BarSelector.tsx";

export const Registration = () => {
  const [registrationForm, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleRegistrationFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...registrationForm, [name]: value });
  };

  const onBarChange = (e: string) => {
    registrationForm["role"] = e;
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

          <BarSelector onChange={(val) => onBarChange(val)} values={["Волонтёр", "Координатор", "Организатор"]} />
          {/*<BarSelector*/}
          {/*  values={["йцуйцу", "123", "Организqweqweатор"]}*/}
          {/*  onChange={(val) => console.log("Выбрано:", val)}   */}
          {/*  className="myBar"*/}
          {/*  fontSize={10}*/}
          {/*/>*/}

          <button className={s.signUpButton}>Зарегистрироваться</button>
          <p>Есть аккаунт? <a>Войти</a></p>
        </form>
      </div>
    </div>
  );
};