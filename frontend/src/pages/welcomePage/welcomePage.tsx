import "./welcomePage.scss";

export function WelcomePage() {
  return (
    <div>
      <div className={"container"}>
        <div className={"welcomeRow"}>
          <h2>Стать волонтёром - легко</h2>
          <div className={"searchBar"}>
            <input placeholder={"Поиск по мероприятиям"} />
            <button className={"searchButton"}>Найти</button>
          </div>
          <p>Я хочу создать маршрут</p>
        </div>
      </div>
    </div>
  );
}