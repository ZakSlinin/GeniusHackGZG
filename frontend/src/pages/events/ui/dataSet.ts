import type { Ievent } from "@/shared/interfaces/Ievent.tsx";

export const dataSet: Ievent[] = [
  {
    name: "Помочь приюту",
    category: "Зооволонтерство",
    createdBy: "org1",
    date: new Date("2024-04-13"),
    timeStart: "12:00",
    timeEnd: "16:00",
    location: "Москва",
    volunteerNeedCount: 5,
    volunteerCount: 0,
    shortDescription: "Помочь с кормлением",
    description: "В приюте нужна помощь с уборкой и кормлением животных",
    volunteerGroups: [{
      name: "Кормить питомцев",
      registered: 0,
      needed: 5
    }],
    coordinator: "Иван Иванов",
    number: "88005553535",
    email: "org@mail.ru",
    telegramUsername: "@org"
  },
  {
    name: "Убрать парк",
    category: "Эко-волонтерство",
    createdBy: "eco_org",
    date: new Date("2024-05-20"),
    timeStart: "10:00",
    timeEnd: "14:00",
    location: "Санкт-Петербург",
    volunteerNeedCount: 10,
    volunteerCount: 2,
    shortDescription: "Собрать мусор в парке",
    description: "Помощь по уборке городского парка и сортировке отходов",
    volunteerGroups: [{
      name: "Сбор мусора",
      registered: 2,
      needed: 10
    }],
    coordinator: "Мария Петрова",
    number: "88001234567",
    email: "eco@mail.ru",
    telegramUsername: "@eco_org"
  },
  {
    name: "Помощь детям",
    category: "Социальные проекты",
    createdBy: "help_kids",
    date: new Date("2024-06-01"),
    timeStart: "09:00",
    timeEnd: "12:00",
    location: "Казань",
    volunteerNeedCount: 8,
    volunteerCount: 1,
    shortDescription: "Игры и занятия с детьми",
    description: "Организация досуга для детей в приюте",
    volunteerGroups: [{
      name: "Игровая комната",
      registered: 1,
      needed: 8
    }],
    coordinator: "Ольга Смирнова",
    number: "88007654321",
    email: "kids@mail.ru",
    telegramUsername: "@help_kids"
  },
  {
    name: "Помощь пожилым",
    category: "Социальные проекты",
    createdBy: "senior_help",
    date: new Date("2024-07-15"),
    timeStart: "11:00",
    timeEnd: "15:00",
    location: "Новосибирск",
    volunteerNeedCount: 6,
    volunteerCount: 0,
    shortDescription: "Посещение дома престарелых",
    description: "Помощь пожилым людям: прогулки, общение, доставка продуктов",
    volunteerGroups: [{
      name: "Прогулки и общение",
      registered: 0,
      needed: 6
    }],
    coordinator: "Сергей Иванов",
    number: "88009876543",
    email: "senior@mail.ru",
    telegramUsername: "@senior_help"
  },
  {
    name: "Сбор одежды для нуждающихся",
    category: "Благотворительность",
    createdBy: "charity_org",
    date: new Date("2024-08-10"),
    timeStart: "13:00",
    timeEnd: "17:00",
    location: "Екатеринбург",
    volunteerNeedCount: 12,
    volunteerCount: 3,
    shortDescription: "Сортировка и упаковка одежды",
    description: "Помощь в сборе, сортировке и упаковке одежды для нуждающихся",
    volunteerGroups: [{
      name: "Сортировка одежды",
      registered: 3,
      needed: 12
    }],
    coordinator: "Елена Кузнецова",
    number: "88001112233",
    email: "charity@mail.ru",
    telegramUsername: "@charity_org"
  },
  {
    name: "Помочь приюту",
    category: "Зооволонтерство",
    createdBy: "org1",
    date: new Date(),
    timeStart: "12:00",
    timeEnd: "16:00",
    location: "Москва",
    volunteerNeedCount: 5,
    volunteerCount: 0,
    shortDescription: "Помочь с кормлением",
    description: "В приюте нужна помощь с уборкой и кормлением животных",
    volunteerGroups: [{
      name: "Кормить питомцев",
      registered: 0,
      needed: 5
    }],
    coordinator: "Иван Иванов",
    number: "88005553535",
    email: "org@mail.ru",
    telegramUsername: "@org"
  },
  {
    name: "Уборка территории парка",
    category: "Экология",
    createdBy: "eco_org",
    date: new Date(Date.now() + 86400000),
    timeStart: "10:00",
    timeEnd: "14:00",
    location: "Санкт-Петербург",
    volunteerNeedCount: 15,
    volunteerCount: 8,
    shortDescription: "Субботник в центральном парке",
    description: "Уборка мусора, посадка цветов и благоустройство территории",
    volunteerGroups: [
      { name: "Уборка мусора", registered: 4, needed: 8 },
      { name: "Посадка растений", registered: 3, needed: 5 },
      { name: "Покраска скамеек", registered: 1, needed: 2 }
    ],
    coordinator: "Мария Петрова",
    number: "88001234567",
    email: "eco@mail.ru",
    telegramUsername: "@eco_spb"
  },
  {
    name: "Помощь пожилым людям",
    category: "Социальная помощь",
    createdBy: "care_org",
    date: new Date(Date.now() + 172800000),
    timeStart: "09:00",
    timeEnd: "13:00",
    location: "Казань",
    volunteerNeedCount: 10,
    volunteerCount: 10,
    shortDescription: "Доставка продуктов",
    description: "Доставка продуктов и лекарств пожилым людям",
    volunteerGroups: [
      { name: "Доставка продуктов", registered: 6, needed: 6 },
      { name: "Доставка лекарств", registered: 4, needed: 4 }
    ],
    coordinator: "Алексей Смирнов",
    number: "88009876543",
    email: "care@mail.ru",
    telegramUsername: "@care_kazan"
  },
  {
    name: "Обучение компьютерной грамотности",
    category: "Образование",
    createdBy: "edu_org",
    date: new Date(Date.now() + 259200000),
    timeStart: "15:00",
    timeEnd: "18:00",
    location: "Екатеринбург",
    volunteerNeedCount: 8,
    volunteerCount: 3,
    shortDescription: "Помощь пенсионерам",
    description: "Обучение базовым компьютерным навыкам людей старшего поколения",
    volunteerGroups: [
      { name: "Преподаватели", registered: 2, needed: 4 },
      { name: "Помощники", registered: 1, needed: 4 }
    ],
    coordinator: "Ольга Васильева",
    number: "88005551234",
    email: "edu@mail.ru",
    telegramUsername: "@edu_ekb"
  },
  {
    name: "Благотворительный забег",
    category: "Спорт",
    createdBy: "sport_org",
    date: new Date(Date.now() + 345600000),
    timeStart: "08:00",
    timeEnd: "12:00",
    location: "Новосибирск",
    volunteerNeedCount: 20,
    volunteerCount: 18,
    shortDescription: "Сбор средств для детского дома",
    description: "Благотворительный забег на 5 км с сбором средств",
    volunteerGroups: [
      { name: "Регистрация участников", registered: 5, needed: 6 },
      { name: "Раздача воды", registered: 3, needed: 4 },
      { name: "Маршрутные волонтеры", registered: 7, needed: 8 },
      { name: "Медицинская помощь", registered: 3, needed: 2 }
    ],
    coordinator: "Дмитрий Козлов",
    number: "88001112233",
    email: "sport@mail.ru",
    telegramUsername: "@sport_nsk"
  }
];