import { Route, Routes } from "react-router-dom";
import { Header } from "@/widgets/header";
import { PRIVATE_PAGES } from "@/shared/config/pages.config";
import { EventsPage } from "@/pages/events";
import { ProfilePage } from "@/pages/ProfilePage";
import { EventCoordinationPage } from "@/pages/EventCoordinationPage";

export const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path={PRIVATE_PAGES.HOME} element={<EventsPage />} />
        <Route path={PRIVATE_PAGES.PROFILE} element={<ProfilePage />} />
        <Route path={PRIVATE_PAGES.COORDINATION} element={<EventCoordinationPage />} />
      </Routes>
    </main>
  );
};
