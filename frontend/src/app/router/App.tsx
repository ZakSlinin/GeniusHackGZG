import { Route, Routes } from "react-router-dom";

import { Header } from "@/widgets/header";
import { PageWrapper } from "./ui/page-wrapper";

import { Event } from "@/pages/eventPage/";
import { EventsPage } from "@/pages/events";
import { CreateNewEvent } from "@/pages/create/index";
import { PRIVATE_PAGES } from "@/shared/config/pages.config";
import { Registration } from "@/pages/registration";
import { SignIn } from "@/pages/signIn";

export const App = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <Routes>
          <Route path={PRIVATE_PAGES.HOME} element={<EventsPage />} />
          <Route path={PRIVATE_PAGES.REGISTER} element={<Registration />} />
          <Route path={PRIVATE_PAGES.LOGIN} element={<SignIn />} />
          <Route path={PRIVATE_PAGES.NEW_EVENT} element={<CreateNewEvent />} />
          <Route
            path={PRIVATE_PAGES.EVENT}
            element={
              <Event
                name={"qweqwe"}
                category={"qweqwe"}
                createdBy={"qweqwe"}
                date={new Date()}
                timeStart={"12:00"}
                timeEnd={"14:00"}
                location={"Arzamas"}
                volunteerNeedCount={5}
                volunteerCount={3}
                shortDescription={"qweqwe"}
                volunteerGroups={[
                  {
                    name: "qwe1",
                    needed: 3,
                    registered: 0,
                    requirements:
                      "быть адекватбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымным",
                  },
                  {
                    name: "qwe2",
                    needed: 2,
                    registered: 2,
                  },
                ]}
                number={"+79102910211"}
                email={"gvinses@gvinses.com"}
              />
            }
          />
        </Routes>
      </PageWrapper>
    </>
  );
};
