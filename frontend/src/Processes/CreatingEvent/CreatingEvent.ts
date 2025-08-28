import { makeAutoObservable } from "mobx";
import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";

class creatingEvent {
  constructor() {
    makeAutoObservable(this);
  }

  CreateNewEvent = (basicInputs: NodeList, basicTextarea: NodeList, contactInputs: NodeList, roles: IvolunteerGroup[]) => {
    console.log(basicInputs, basicTextarea, contactInputs, roles);
    /**
     *  Создание нового мероприятия
     */
  };
}

export const creatingEventAPI = new creatingEvent();