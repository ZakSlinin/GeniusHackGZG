import "./welcomePage.scss";

export function WelcomePage() {
  return (
    <div>
      <div className={"container"}>
        <div className={"welcomeRow"}>
          <h1>Стать волонтёром - легко</h1>
          <div className={"searchBar"}>
            <input placeholder={"Поиск по мероприятиям"} />
            <span className={"filtersButton"}>
              <span className={"bar"}></span>
              <span className={"bar"}></span>
              <span className={"bar"}></span>
            </span>
            <button className={"searchButton"}>Найти</button>
          </div>
          <p>Я хочу создать маршрут</p>
        </div>
      </div>
    </div>
  );
}