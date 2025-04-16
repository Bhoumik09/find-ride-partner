"use server";
import { UserProfileData } from "@/components/auth-provider";
import { API } from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";


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
    const response:AxiosResponse = await API.get("/auth/fetch-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data as { msg:string,userInfo:UserProfileData, error:any }; // ✅ Now .data is correctly accessed
  } catch (error) {
    if (error instanceof AxiosError) {
      const serverMessage = error.response?.data?.msg || "Session Expired";
      
      return {error:serverMessage} as { msg:string,userInfo:UserProfileData, error:string };

      
    }
    return {error:"Something went wrong"} as { msg:string,userInfo:UserProfileData, error:string };

  }
}
export async function fetchUserName(token: string|undefined) {
  try {
    const response:AxiosResponse = await API.get("/auth/fetch-user-name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as { msg:string,userInfo:{name:string, id:string} }; // ✅ Now .data is correctly accessed
  } catch (error) {
    if (error instanceof AxiosError) {
      // 👇 Check if the server sent a custom error message
      const serverErrorMsg = error.response?.data?.error || "User Info Fetch fe failed failed";


      // You can return or throw based on how your frontend handles it
      return {error:serverErrorMsg}
    } else {
      // Unknown error (not Axios)
      console.error("Unexpected error:", error);
      return {error:error}

    }
  }
}



export async function login(payload: LoginPayload) {
  try {
    const response:AxiosResponse = await API.post("/auth/login", payload);
    return response.data as { token: string; error: string ,msg:string };
  } catch (error) {
    if (error instanceof AxiosError) {
      // 👇 Check if the server sent a custom error message
      const serverErrorMsg = error.response?.data?.error || "Signup failed";

      console.error("Signup error:", serverErrorMsg);

      // You can return or throw based on how your frontend handles it
      return {error:serverErrorMsg}
    } else {
      // Unknown error (not Axios)
      console.error("Unexpected error:", error);
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
export async function signUp(payload: SignUpPayload) {
  try {
    const response:AxiosResponse = await API.post("/auth/signup", payload);
    console.log(response)
    return response.data as { token: string; error: string };
  } catch (error:any) {
    if (error instanceof AxiosError) {
      // 👇 Check if the server sent a custom error message
      const serverErrorMsg = error.response?.data?.error || "Signup failed";

      console.error("Signup error:", serverErrorMsg);

      // You can return or throw based on how your frontend handles it
      return {error:serverErrorMsg}
    } else {
      // Unknown error (not Axios)
      console.error("Unexpected error:", error);
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
export async function resetPass(payload: LoginPayload) {
  try {
    const response:AxiosResponse = await API.put("/auth/forgot-pass", payload);
    return response.data as { token: string; error: string };
  } catch (error:any) {
    if (error instanceof AxiosError) {
      // 👇 Check if the server sent a custom error message
      const serverErrorMsg = error.response?.data?.error || "Signup failed";

      console.error("Signup error:", serverErrorMsg);

      // You can return or throw based on how your frontend handles it
      return {error:serverErrorMsg}
    } else {
      // Unknown error (not Axios)
      console.error("Unexpected error:", error);
      throw new Error("Something went wrong. Please try again.");
    }
  }
}


