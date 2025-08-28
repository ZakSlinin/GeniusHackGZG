import s from "./createEvent.module.scss";
import { Input, InputDate, InputTime, Textarea } from "@/shared/ui/input/";
import { type ChangeEvent, type FormEvent, useState } from "react";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";
import { TrashBucket } from "@/shared/icons/TrashBucket.tsx";
import { creatingEventAPI } from "@/Processes/CreatingEvent/CreatingEvent.ts";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";

export const CreateNewEvent = () => {
  const { CreateNewEvent } = creatingEventAPI;

  const [createEventForm, setEventForm] = useState<Ievent>({
    coordinator: "",
    createdBy: "",
    email: "",
    location: "",
    number: "",
    telegramUsername: "",
    volunteerCount: 0,
    volunteerGroups: [],
    volunteerNeedCount: 0,
    name: "",
    category: "",
    shortDescription: "",
    description: "",
    date: "",
    timeStart: "",
    timeEnd: ""
  });

  const handleCreateEventFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventForm({ ...createEventForm, [name]: value });
  };

  const [roles, setRoles] = useState<IvolunteerGroup[]>([{
    name: "",
    needed: 0,
    registered: 0,
    requirements: ""
  }]);

  const addRole = (e: React.FormEvent) => {
    e.preventDefault();

    if (JSON.stringify(roles.at(-1)) !== JSON.stringify({
      name: "",
      needed: 0,
      registered: 0,
      requirements: ""
    })) {
      setRoles([...roles, {
        name: "",
        needed: 0,
        registered: 0,
        requirements: ""
      }]);
    }
  };

  const editRole = (index: number, roleObject: string, textValue: string) => {
    setRoles(prevRoles => {
      const newRoles = [...prevRoles];
      newRoles[index] = {
        ...newRoles[index],
        [roleObject]: textValue
      };
      return newRoles;
    });
  };

  const deleteRole = (index: number) => {
    setRoles(prevRoles => {
      const newRoles = [...prevRoles];
      newRoles.splice(index, 1);
      return newRoles;
    });
  };

  const createEvent = (e: FormEvent) => {
    e.preventDefault();

    if (roles[0]["name"] === "") return;

    /**
     * Сделать, что допуск, только если все requrenments выполнены
     */

    const targets: HTMLElement = e.target as HTMLElement;

    const basicBlock = targets.querySelector(".basicInfo") as HTMLElement;
    const basicInputs = basicBlock.querySelectorAll("input");
    const basicTextarea = basicBlock.querySelectorAll("textarea");
    const contactBlock = targets.querySelector(".contactInfo") as HTMLElement;
    const contactInputs = contactBlock.querySelectorAll("input");

    CreateNewEvent(basicInputs, basicTextarea, contactInputs, roles);
  };

  return (
    <div>
      <form onSubmit={e => createEvent(e)} className={s.container}>
        <span className={s.title}>
          <h1>Создать новое мероприятие</h1>
        </span>
        <div className={s.basicInfo}>
          <h2>Основная информация</h2>
          <span>
            <Input label={"Название мероприятия"} required placeholder={"Введите адрес электронной почты"} />
            <Input label={"Категория"} placeholder={"Введите название категории"} />
          </span>

          <Input label={"Краткое описание"} required placeholder={"Введите краткое описание"} />

          <Textarea label={"Описание"} placeholder={"Введите описание"} />

          <span>
            <InputDate label={"Дата проведения"} required placeholder={"дд.нн.гггг"} />

            <InputTime label={"Время начала"} placeholder={"10:00"} />

            <InputTime label={"Время конца"} placeholder={"12:00"} />

            <InputDate label={"Место проведения"} placeholder={"Адрес или место"} />
          </span>
        </div>
        <div className={s.contactInfo}>
          <h2>Контактная информация</h2>
          <span>
            <Input label={"Email координатора"} required placeholder={"Введите электронную почту координатора"} />
            <Input label={"Номер телефона"} required placeholder={"+7 ... ... .. .."} />
          </span>
          <span>
            <Input label={"Email организатора"} required placeholder={"Введите электронную почту организатора"} />
            <Input label={"Telegram организатора"} required placeholder={"@"} />
          </span>
        </div>
        <div className={s.rolesOfVolunteers}>
          <span className={s.informationBar}>
            <h2>Роли волонтёров</h2>
            <button className={s.addRoleButton} onClick={addRole}>Добавить роль</button>
          </span>
          {
            roles.map((_, i) => (
              <div className={s.newRouteContainer}>
                <span>
                  <Input onChange={e => editRole(i, "name", e.target.value)} required label={"Название роли"}
                         placeholder={"Введите название роли"} />

                  <div className={s.combinedInput}>
                    <Input onChange={e => editRole(i, "needed", e.target.value)} required label={"Количество человек"}
                           type={"number"} placeholder={"1"} />
                    <div onClick={() => deleteRole(i)} className={s.deleteRoleButton}>
                      <TrashBucket />
                    </div>
                  </div>
                </span>

                <Textarea label={"Описание обязанностей"} required placeholder={"Опишите обязанности волонтёров"} />
              </div>
            ))
          }
        </div>

        <button type={"submit"} className={s.submitButton}>Создать</button>
      </form>
    </div>
  );
};