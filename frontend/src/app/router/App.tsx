// import { Routes } from "react-router-dom";
// import { Header } from "@/widgets/header";
import { Event } from "@/pages/eventPage/event.tsx";

export const App = () => {
  return (
    <main>
      {/*<Header />*/}
      {/*<Routes>*/}
        <Event name={"qweqwe"} category={"qweqwe"}
               createdBy={"qweqwe"} date={new Date()} timeStart={"12:00"}
               timeEnd={"14:00"} location={"Arzamas"} volunteerNeedCount={5}
               volunteerCount={3} shortDescription={"qweqwe"} volunteerGroups={[
          {
            name: "qwe1",
            needed: 3,
            registered: 0,
            requirements: "быть адекватбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымбыть адекватнымным"
          },
          {
            name: "qwe2",
            needed: 2,
            registered: 2
          },
        ]} number={"+79102910211"} email={"gvinses@gvinses.com"} />
      {/*</Routes>*/}
    </main>
  );
};
