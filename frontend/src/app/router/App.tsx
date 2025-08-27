import { Routes } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Input, InputDate, Textarea } from "@/shared/ui/input/";

export const App = () => {
  return (
    <main>
      <Header />
      <div style={{ marginTop: 100, padding: 10 }}>
        <InputDate
          label="Название мероприятия"
          required
          placeholder="Введите название мероприятия"
        />
      </div>
      <Routes></Routes>
    </main>
  );
};
