import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";
import type { RegisterFormT } from "@/pages/registration/ui/registration";

type UserT = { user: any; role: string };

class AuthApi {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  user: UserT | null = null;

  init = () => {
    const auth = Cookies.get("auth");

    if (auth) {
      this.user = JSON.parse(auth);
    }

    console.log(this.user);
  };

  reg = async ({ name, email, password, tableName }: RegisterFormT) => {
    const role =
      tableName == "Волонтёр"
        ? "volunteer"
        : tableName == "Координатор"
        ? "coordinator"
        : "organizator";

    try {
      const user = await axios.post(`http://localhost:8080/register/${role}`, {
        name,
        email,
        password,
        tableName: role,
      });

      const finalData: { user: any; role: string } = {
        user,
        role,
      };

      if (finalData.user) {
        Cookies.set("auth", JSON.stringify(finalData), { expires: 30 });
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export const authApi = new AuthApi();
