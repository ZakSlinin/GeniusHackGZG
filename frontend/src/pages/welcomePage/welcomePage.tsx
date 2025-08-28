import s from "./welcomePage.scss";

export const WelcomePage = () => {
  return (
    <div>
      <div className={s.container}>
        <div className={s.welcomeRow}>
          <h2>Стать волонтёром - легко</h2>
          <div className={s.searchBar}>
            <input placeholder={"Поиск по мероприятиям"} />
            <button className={s.searchButton}>Найти</button>
          </div>
          <p>Я хочу создать маршрут</p>
        </div>
      </div>
    </div>
  );
};

//  Будет вырезано (вероятно)