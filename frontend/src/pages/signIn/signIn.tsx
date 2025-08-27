import "./signIn.scss";

export function SignIn() {
  return (
    <div>
      <div className={"container"}>
        <h1>Вход</h1>
        <form>
          <label>Email</label>
          <input placeholder={"Введите адрес электронной почты"} />

          <label>Пароль</label>
          <input placeholder={"Введите пароль"} />

          <button>Войти</button>
          <p>Нет аккаунта? <a>Зарегистрироваться</a></p>
        </form>
      </div>
    </div>
  );
}