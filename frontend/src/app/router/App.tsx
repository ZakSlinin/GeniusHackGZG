import { Route, Routes } from "react-router-dom";
import { Header } from "@/widgets/header";
import { PRIVATE_PAGES } from "@/shared/config/pages.config";
import { EventsPage } from "@/pages/events";
import { Registration } from "@/pages/registration/registration.tsx";
import { SignIn } from "@/pages/signIn/signIn.tsx";
import { CreateNewEvent } from "@/pages/create/createEvent.tsx";

export const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path={PRIVATE_PAGES.HOME} element={<EventsPage />} />
        <Route path={PRIVATE_PAGES.REGISTRATION} element={<Registration />} />
        <Route path={PRIVATE_PAGES.SIGN_IN} element={<SignIn />} />
        <Route path={PRIVATE_PAGES.NEW_EVENT} element={<CreateNewEvent />} />
      </Routes>
    </main>
  );
};

// {/*  <Event name={"qweqwe"} category={"qweqwe"}*/}
// {/*         createdBy={"qweqwe"} date={new Date()} timeStart={"12:00"}*/}
// {/*         timeEnd={"14:00"} location={"Arzamas"} volunteerNeedCount={5}*/}
// {/*         volunteerCount={3} shortDescription={"qweqwe"} volunteerGroups={[*/}
// {/*    {*/}
// {/*      name: "qwe1",*/}
// {/*      needed: 3,*/}
// {/*      registered: 0,*/}
// {/*      requirements: "быть адекватбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымным"*/}
// {/*    },*/}
// {/*    {*/}
// {/*      name: "qwe2",*/}
// {/*      needed: 2,*/}
// {/*      registered: 2*/}
// {/*    },*/}
// {/*  ]} number={"+79102910211"} email={"gvinses@gvinses.com"} />*/}
