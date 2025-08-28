import { Input, InputDate, InputTime, Textarea } from "@/shared/ui/input/";
import { useFormContext } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import s from "../createEvent.module.scss";

export const BasicInfoSection = () => {
  const { register } = useFormContext<Ievent>();

  return (
    <div className={s.basicInfo}>
      <h2>Основная информация</h2>
      <span>
        <Input
          label={"Название мероприятия"}
          required
          placeholder={"Введите название"}
          {...register("name", { required: true })}
        />
        <Input
          label={"Категория"}
          placeholder={"Введите название категории"}
          {...register("category", { required: true })}
        />
      </span>

      <Input
        label={"Краткое описание"}
        required
        placeholder={"Введите краткое описание"}
        {...register("shortDescription", { required: true })}
      />

      <Textarea
        label={"Описание"}
        placeholder={"Введите описание"}
        {...register("description", { required: true })}
      />

      <span>
        <InputDate
          label={"Дата проведения"}
          required
          placeholder={"дд.нн.гггг"}
          {...register("date", { required: true })}
        />

        <InputTime
          label={"Время начала"}
          placeholder={"10:00"}
          {...register("timeStart", { required: true })}
        />

        <InputTime
          label={"Время конца"}
          placeholder={"12:00"}
          {...register("timeEnd", { required: true })}
        />

        <Input
          label={"Место проведения"}
          placeholder={"Адрес или место"}
          {...register("location", { required: true })}
        />
      </span>
    </div>
  );
};
