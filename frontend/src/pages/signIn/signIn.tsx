import "./signIn.scss";
import { Input } from "@/shared/ui/input";

export const SignIn = () => {
  return (
    <div className={'body'}>
      <div className={"container"}>
        <h1>Вход</h1>
        <form>
          <Input label={"Email"} placeholder={"Введите адрес электронной почты"} />

          <Input label={"Пароль"} placeholder={"Введите пароль"} />

          <button>Войти</button>
          <p>Нет аккаунта? <a>Зарегистрироваться</a></p>
        </form>
      </div>
    </div>
  );
};