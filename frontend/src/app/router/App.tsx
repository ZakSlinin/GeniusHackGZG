import { Route, Routes } from "react-router-dom";
import { Header } from "@/widgets/header";
import { PRIVATE_PAGES } from "@/shared/config/pages.config";
import { EventsPage } from "@/pages/events";

export const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path={PRIVATE_PAGES.HOME} element={<EventsPage />} />
      </Routes>
    </main>
  );
};
