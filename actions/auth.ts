"use server";
import { UserProfileData } from "@/components/auth-provider";
import { API } from "@/lib/api";
import axios, { AxiosError } from "axios";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

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
    const response = await API.get("/auth/fetch-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status===403){
      (await cookies()).delete('token')
      redirect('/auth')
    }
    if(response.status===401){
      redirect('/auth')
    }
    return response.data as { msg:string,userInfo:UserProfileData, error:any }; // ✅ Now .data is correctly accessed
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      console.log(error.response?.data);
    }
    return null;
  }
}
export async function fetchUserName(token: string|undefined) {
  try {
    const response = await API.get("/auth/fetch-user-name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status===403){
      (await cookies()).delete('token')
      redirect('/auth')
    }
    return response.data as { msg:string,userInfo:{name:string, id:string} }; // ✅ Now .data is correctly accessed
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
    const response = await API.post("/auth/login", payload);
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
    const response = await API.post("/auth/signup", payload);
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

