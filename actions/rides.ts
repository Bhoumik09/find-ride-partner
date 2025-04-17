import { API } from "@/lib/api";
import { BASE_URL } from "@/lib/constants";
import { findRidesFormType, Rides, ridesFormType } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { notFound } from "next/navigation";

export async function postNewRide({
  payload,
  token,
}: {
  payload: Omit<ridesFormType, "meetingPoint">;
  token: string;
}) {
  try {
    console.log("Payload before processing:", payload);
    const [hours, minutes] = payload.time.split(":").map(Number);
    console.log("Hours:", hours, "Minutes:", minutes);
    const time = new Date(payload.date);
    time.setHours(hours, minutes, 0, 0);
    payload.time = time.toISOString();

    // Log the URL and the payload
    const url = `${BASE_URL}/rides/create-ride`;
    console.log("Request URL:", url);
    console.log("Payload:", payload);

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as { msg: string; error: any };
    // Log the response URL and status
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error URL:", error.config?.url); // log the request URL in case of an error
      console.log("Error Status:", error.response?.status); // log the error status
      console.log("Error Message:", error.message);
      console.log("Error Response Data:", error.response?.data);

      return error.response?.data;
    }
  }
}
export async function updateRide({
  payload,
  token,
  rideId,
}: {
  payload: Omit<ridesFormType, "meetingPoint">;
  token: string;
  rideId: string;
}) {
  try {
    const [hours, minutes] = payload.time.split(":").map(Number);
    const time = new Date(payload.date);
    time.setHours(hours, minutes, 0, 0);
    payload.time = time.toISOString();
    // Log the URL and the payload
    const url = `${BASE_URL}/rides/ride/${rideId}`;
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as { msg: string; error: any };
    // Log the response URL and status
  } catch (error:any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error.message
  }
}
export async function findRides({
  payload,
  token,
}: {
  payload: findRidesFormType;
  token: string;
}) {
  try {
    const params = new URLSearchParams();
    const keyMap = {
      source: "sourceId",
      destination: "destinationId",
      dob: "date",
      number_people: "seats",
      gender: "genderPreference",
    };
    Object.entries(payload).forEach(([key, value]) => {
      if (
        payload.hasOwnProperty(key) &&
        value !== undefined &&
        value !== null
      ) {
        const newKey = keyMap[key as keyof findRidesFormType] || key;
        params.append(
          newKey,
          key === "dob" ? new Date(value).toISOString() : (value as string)
        );
      }
    });
    // Log the URL and the payload
    const url = `${BASE_URL}/rides/find-rides?${params.toString()}`;
    console.log(url);
    console.log("Request URL:", url);
    console.log("Payload:", payload);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status!==200){
      
    }
    return response.data as { msg: string; ridesData: any; error: any };
    // Log the response URL and status

  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error URL:", error.config?.url); // log the request URL in case of an error
      console.log("Error Status:", error.response?.status); // log the error status
      console.log("Error Message:", error.message);
      console.log("Error Response Data:", error.response?.data);

      return error.response?.data;
    }
  }
}
export async function findUserRides({ token }: { token: string }) {
  try {
    const response = await axios.get(`${BASE_URL}/rides/user-rides`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as { msg: string; ridesData: any; error: any };
    // Log the response URL and status
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error URL:", error.config?.url); // log the request URL in case of an error
      console.log("Error Status:", error.response?.status); // log the error status
      console.log("Error Message:", error.message);
      console.log("Error Response Data:", error.response?.data);

      return error.response?.data;
    }
  }
}
export async function deleteRide({
  token,
  rideId,
}: {
  token: string;
  rideId: string;
}) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/rides/ride/${rideId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as { msg: string; error: any };
    // Log the response URL and status
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error URL:", error.config?.url); // log the request URL in case of an error
      console.log("Error Status:", error.response?.status); // log the error status
      console.log("Error Message:", error.message);
      console.log("Error Response Data:", error.response?.data);

      return error.response?.data;
    }
  }
}
export async function getRideData({
  rideId,
  token,
}: {
  rideId: string;
  token: string;
}) {
  try {
    const response = await axios.get(
      `${BASE_URL}/rides/ride/${rideId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(response.status!==200){
      notFound()
    }
    return response.data as {msg:string, ridesData:Rides};
    // Log the response URL and status
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error URL:", error.config?.url); // log the request URL in case of an error
      console.log("Error Status:", error.response?.status); // log the error status
      console.log("Error Message:", error.message);
      console.log("Error Response Data:", error.response?.data);

      return error.response?.data;
    }
  }
}
