import s from "./createEvent.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import { Button } from "@/shared/ui/button/ui";
import { DEFAULT_VALUES as defaultValues } from "../model/constants";
import { BasicInfoSection } from "./components/BasicInfo.tsx";
import { ContactInfoSection } from "./components/ContactInfo.tsx";
import { VolunteerRolesSection } from "./components/VolunteerRoles.tsx";

export const CreateNewEvent = () => {
  const methods = useForm<Ievent>({
    defaultValues,
  });

  const createEvent = methods.handleSubmit((data) => {
    console.log("create event data:", data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={createEvent} className={s.container}>
        <span className={s.title}>
          <h1>Создать новое мероприятие</h1>
        </span>

        <BasicInfoSection />
        <ContactInfoSection />
        <VolunteerRolesSection />

        <Button className={s.submitBtn} type="submit">
          Создать
        </Button>
      </form>
    </FormProvider>
  );
};
