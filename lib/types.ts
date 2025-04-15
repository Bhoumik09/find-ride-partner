import { z } from "zod";

export const formSchema = z.object({
  source: z.coerce.number({ required_error: "Fill the source field" }),
  destination: z.coerce.number({
    required_error: "Fill the destination field",
  }),
  date: z.union([z.date(), z.string()]),
  time: z.string({ required_error: "Fill the time of departure" }),
  vehicleName: z.string({ required_error: "Enter the name of the Car" }),
  seats: z.string({ required_error: "Enter the number of seats Available" }),
  price: z.coerce.number({ required_error: "Enter the price of the cab" }),
  genderPreference: z.enum(["male", "female", "both"], {
    required_error: "Select an option",
  }),
  meetingPointArr: z.array(z.string().min(1, "Meeting point cannot be empty")),
  meetingPoint: z.string(),
  allowChat: z.boolean(),
  additionalInfo: z.string().optional(),
  number: z.string({ required_error: "Enter your mobile number" }),
});
export const findRideFormSchema = z.object({
  source: z.string().optional(),

  destination: z.string().optional(),
  dob: z.date().optional(),
  number_people: z.string().optional(),
  gender: z.enum(["male", "female", "both"]).optional(),
});
export interface Rides {
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    name: string;
    gender: "male" | "female" | undefined;
  };
  id: string;
  destination: {
    name: string;
    id: string;
  };
  source: {
    name: string;
    id: string;
  };
  date: string;
  time: string;
  numberOfSeats: string;
  vehicle: string;
  meetingPoints: string[];
  additionalInfo: string;
  price: number;
  phoneNumber: string;
  genderPreference: "male" | "female" | "both";
}
export type findRidesFormType = z.infer<typeof findRideFormSchema>;
export type ridesFormType = z.infer<typeof formSchema>;
