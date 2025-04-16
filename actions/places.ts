import { API } from "@/lib/api";
import { AxiosError } from "axios";

export default async function getAllPlaces(){
    try {
        const response = await API.get("/places/all-places");
        return response.data as {places:{id:number, name:string}[], error:any};
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
          return error.response?.data;
        }
      }
}