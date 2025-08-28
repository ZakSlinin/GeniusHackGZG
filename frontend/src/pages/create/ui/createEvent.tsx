import s from "./createEvent.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import type { Ievent } from "@/shared/interfaces/Ievent.tsx";
import { Button } from "@/shared/ui/button/ui";
import { DEFAULT_VALUES as defaultValues } from "../model/constants";
import { BasicInfoSection } from "./components/BasicInfo.tsx";
import { ContactInfoSection } from "./components/ContactInfo.tsx";
import { VolunteerRolesSection } from "./components/VolunteerRoles.tsx";
import { authApi } from "@/shared/store/auth.ts";

export const CreateNewEvent = () => {
  const methods = useForm<Ievent>({
    defaultValues,
  });

  const saveEventsToStorage = (events: Ievent[]): void => {
    try {
      localStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.error('Ошибка при сохранении в LocalStorage:', error);
    }
  };

  const getEventsFromStorage = (): Ievent[] => {
    try {
      const stored = localStorage.getItem('events');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Ошибка при чтении из LocalStorage:', error);
      return [];
    }
  };

  const createEvent = methods.handleSubmit(async (data) => {
    data.createdBy = authApi.user?.user;

    data.volunteerNeedCount =
      data.volunteerGroups?.reduce(
        (acc, role) => acc + (Number(role.needed) || 0),
        0
      ) ?? 0;

    const newEvent = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    try {
      const currentEvents = getEventsFromStorage();

      const updatedEvents = [...currentEvents, newEvent];

      saveEventsToStorage(updatedEvents);

      console.log("Event created successfully:", newEvent);
      methods.reset();

      // Перенаправляем на главную страницу
      location.href = "/";
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      // Можно добавить обработку ошибок
    }
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
