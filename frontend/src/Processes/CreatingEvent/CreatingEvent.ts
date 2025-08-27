import { makeAutoObservable } from "mobx";
import type { VolunteerGroup } from "@/shared/types/volunteerGroup.ts";

class creatingEvent {
  constructor() {
    makeAutoObservable(this);
  }

  CreateNewEvent = (basicInputs: NodeList, basicTextarea: object, contactInputs: NodeList, roles: VolunteerGroup[]) => {
    console.log(basicInputs, basicTextarea, contactInputs, roles);
    /**
     *  Создание нового мероприятия
     */
  };
}

export const creatingEventAPI = new creatingEvent();