import { PRIVATE_PAGES } from "@/shared/config/pages.config";
import type { LinkT } from "./types";

import { Calendar } from "@/shared/icons/Calendar";
import { Plus } from "@/shared/icons/Plus";
import { WalkingPerson } from "@/shared/icons/WalkingPerson";
import { User } from "@/shared/icons/User";

const PRIVATE_ROUTES_DEFAULT: LinkT[] = [
  { path: PRIVATE_PAGES.HOME, icon: <Calendar />, title: "Мероприятия" },
  { path: PRIVATE_PAGES.COORDINATION, icon: <WalkingPerson />, title: "Координация" }, // Moved 'Координация' here and set WalkingPerson as its default icon
  { path: PRIVATE_PAGES.PROFILE, icon: <User />, title: "Профиль" },
];

export const buildLinksByRole = (role: string): LinkT[] => {
  switch (role) {
    case "organization":
      return [
        PRIVATE_ROUTES_DEFAULT[0], // Мероприятия
        { path: PRIVATE_PAGES.NEW_EVENT, icon: <Plus />, title: "Создать" }, // Создать
        PRIVATE_ROUTES_DEFAULT[1], // Координация
        PRIVATE_ROUTES_DEFAULT[2], // Профиль
      ];
    case "coordinator":
      return PRIVATE_ROUTES_DEFAULT;
    default:
      return PRIVATE_ROUTES_DEFAULT;
  }
};
