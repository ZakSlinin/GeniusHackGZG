import s from "./createEvent.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import { Button } from "@/shared/ui/button/ui";
import { DEFAULT_VALUES as defaultValues } from "../model/constants";
import { BasicInfoSection } from "./components/BasicInfo.tsx";
import { ContactInfoSection } from "./components/ContactInfo.tsx";
import { VolunteerRolesSection } from "./components/VolunteerRoles.tsx";
import axios from "axios";
import { authApi } from "@/shared/store/auth.ts";

export const CreateNewEvent = () => {
  const methods = useForm<Ievent>({
    defaultValues,
  });

  const createEvent = methods.handleSubmit(async (data) => {
    data.createdBy = authApi.user?.user;

    data.volunteerNeedCount =
      data.volunteerGroups?.reduce(
        (acc, role) => acc + (Number(role.needed) || 0),
        0
      ) ?? 0;

    const response = await axios.post(
      "http://localhost:8080/create-event",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Event created successfully:", response.data);
    methods.reset();

    location.href = "/";
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
