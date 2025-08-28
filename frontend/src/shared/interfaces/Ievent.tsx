import type { IvolunteerGroup } from "@/shared/interfaces/IvolunteerGroup.tsx";

export interface Ievent {
  name: string,
  category: string,
  createdBy: string,
  date: string | Date,
  timeStart: string,
  timeEnd: string,
  location: string,
  volunteerNeedCount: number,
  volunteerCount: number,
  shortDescription: string,
  description?: string,
  volunteerGroups: IvolunteerGroup[],
  coordinator?: string,
  number: string,
  email: string,
  telegramUsername?: string
}
