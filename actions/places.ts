import { API } from "@/lib/api";
import { AxiosError } from "axios";

export default async function getAllPlaces(){
    try {
        console.log('reached');
        const response = await API.get("/places/all-places");
        console.log(response.data);
        return response.data as {places:{id:number, name:string}[], error:any};
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
          console.error(error.message);
    
          return error.response?.data;
        }
      }
}