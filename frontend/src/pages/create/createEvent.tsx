import "./createEvent.scss";

export function CreateNewEvent() {
  return (
    <div>
      <form className={"container"}>
        <span className={'title'}>
          <h1>Создать новое мероприятие</h1>
        </span>
        <div className={'basicInfo'}>
          <h2>Основная информация</h2>
          <span>
            <label>Название мероприятия
            <input placeholder={"Введите адрес электронной почты"} />
            </label>

            <label>Категория
            <input placeholder={"Введите название категории"} />
            </label>
          </span>

          <label>Краткое описание*
          <input placeholder={"Введите краткое описание"} />
          </label>


          <label>Описание*
          <textarea cols={1} rows={3} placeholder={"Введите описание"} />
          </label>

          <span>
            <label>Дата проведения*
            <input type="date" placeholder={"дд.нн.гггг"} />
            </label>

            <label>Время
            <input type="time" placeholder={"10:00 - 16:00"} />
            </label>

            <label>Место проведения*
            <input placeholder={"Адрес или место"} />
            </label>
          </span>
        </div>
        <div className={'contactInfo'}>
          <h2>Контактная информация</h2>
          <span>
            <label>Email координатора
            <input placeholder={"Введите краткое описание"} />
            </label>

            <label>Номер телефона для связи
            <input type={'tel'} />
            </label>
          </span>
        </div>
      </form>
    </div>
  );
}