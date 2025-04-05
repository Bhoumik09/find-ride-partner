"use server";
import { API } from "@/lib/api";
import { AxiosError } from "axios";
interface LoginPayload {
  username: string;
  password: string;
  phoneNumber: string;
}
interface SignUpPayload {
  username: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female";
  email: string;
}
export async function fetchUser(token: string) {
  try {
    console.log("hehe");
    const response = await API.get("/fetch-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as { userInfo: any }; // ✅ Now .data is correctly accessed
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      console.log(error.response?.data);
    }
    return null;
  }
}

export async function login(payload: LoginPayload) {
  try {
    console.log(payload)
    const response = await API.post("/login", payload);
    return response.data as { token: string; error: any };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      console.error(error.message);

      return error.response?.data;
    }
  }
}
export async function signUp(payload: SignUpPayload) {
  try {
    console.log(payload)
    const response = await API.post("/signup", payload);
    console.log(response.data);
    return response.data as { token: string; error: any };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      console.error(error.message);

      return error.response?.data;
    }
  }
}

