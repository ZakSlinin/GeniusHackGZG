import { Input } from "@/shared/ui/input/";
import { useFormContext } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import s from "../createEvent.module.scss";

export const ContactInfoSection = () => {
  const { register } = useFormContext<Ievent>();

  return (
    <div className={s.contactInfo}>
      <h2>Контактная информация</h2>
      <span>
        <Input
          label={"Email координатора"}
          required
          placeholder={"Введите электронную почту координатора"}
          type={"email"}
          {...register("email", { required: true })}
        />
        <Input
          label={"Номер телефона"}
          required
          placeholder={"+7 ... ... .. .."}
          inputMode={"tel"}
          {...register("number", {
            required: true,
            pattern: /^(\+?\d[\d\s\-()]{7,})$/,
          })}
        />
      </span>
      <span>
        <Input
          label={"Email организатора"}
          required
          placeholder={"Введите электронную почту организатора"}
          type={"email"}
          {...register("createdBy", { required: true })}
        />
        <Input
          label={"Telegram организатора"}
          required
          placeholder={"@"}
          {...register("telegramUsername", { required: true })}
        />
      </span>
    </div>
  );
};
