import { makeAutoObservable } from "mobx";
import { fromPromise, type IPromiseBasedObservable } from "mobx-utils";
import { getProfile } from "../api/services/profile/api";
import Cookies from "js-cookie";
import type { UserProfile } from "../types/user";

export class ProfileStore {
    constructor() {
        makeAutoObservable(this);
    }

    ProfileData?: IPromiseBasedObservable<UserProfile> = undefined;

    fetchProfileData = async () => {
        const email = Cookies.get("auth");
        if (!email) {
            // Optionally handle the case where email is not available
            console.error("User email not found in cookies.");
            return;
        }

        try {
            this.ProfileData = fromPromise<UserProfile>(
                getProfile(email)
            );
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            // Optionally set an error state
        }
    }

}