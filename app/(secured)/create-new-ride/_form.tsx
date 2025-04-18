
'use client'

import { postNewRide } from "@/actions/rides";
import { useAuth } from "@/components/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Car, Clock, Info, Loader, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define schema



export default function RideForm({ allPlaces }: { allPlaces: { id: number, name: string }[] }) {
    const auth = useAuth();
    const userGender: 'male' | 'female' | undefined = auth.authData?.userData?.gender;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            source: undefined,
            destination: undefined,
            date: "", // as string
            time: "",
            vehicleName: "",
            seats: "",
            price: 0,
            genderPreference: "both",
            meetingPointArr: [],
            meetingPoint: "",
            allowChat: false,
            number: "",
            additionalInfo: "",
        },
    })

    const postRideMutation = useMutation({
        mutationKey: ["postNewRide"],
        mutationFn: postNewRide,

    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.source === values.destination) {
            form.setError("source", { message: "Source and destination cannot be the same" });
            form.setError("destination", { message: "Source and destination cannot be the same" });
            changeFormState("one");
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { meetingPoint:_, ...filteredPayload } = values;
        const response: { msg: string, error: string } = await postRideMutation.mutateAsync({ payload: filteredPayload, token: auth.authData?.token });
        if (response.msg) {
            form.reset();
            changeFormState("one");
            toast.success("Ride is created succesfully");
        } else {
            toast.error("Failed to create the ride due to following error", { description: response.error });

        }
    }
    const seats: number[] = [1,2, 3, 4, 5, 6, 7, 8, 9, 10,11];
    const [formState, changeFormState] = useState<"one" | "two">("one");
    const addingMeetingPoint = () => {
        const ptArray: string[] = form.watch("meetingPointArr") || [];
        const pt: string | undefined = form.watch("meetingPoint");
        if (!pt!.trim()) return;
        form.setValue("meetingPointArr", [...ptArray, pt!]);//add to array
        form.setValue("meetingPoint", "");//Clear Inpt


    }
    const formValues = form.watch();
    const isOneStepComplete = formValues.date && formValues.destination && formValues.seats && formValues.vehicleName && formValues.source && formValues.time;
    return (
        <div className="bg-blue-50 xs:px-20 md:px-40 py-20">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {formState === "one" ?
                        <Card className="p-5">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Offer a Ride</CardTitle>
                                <CardDescription>Share your journey with fellow students and help them get to their destination</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2.5 w-full">
                                <div className="flex justify-between items-center">
                                    <FormLabel>Route</FormLabel>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Info className="h-4 w-4" />
                                                    <span className="sr-only">Route information</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">Specify your starting point and destination</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <FormField

                                    control={form.control}
                                    name="source"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel><MapPin /> Source</FormLabel>
                                            <Select disabled={!allPlaces} onValueChange={field.onChange} >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select the source" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full">
                                                    {allPlaces?.map((place) => (
                                                        <SelectItem key={place.id} value={String(place.id)}>{place.name}</SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="destination"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> <MapPin /> Destination</FormLabel>
                                            <Select disabled={!allPlaces} onValueChange={field.onChange} >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {allPlaces?.map((place) => (
                                                        <SelectItem key={place.id} value={String(place.id)}>{place.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormLabel className="flex gap-2"><Clock /> Date and Time</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col w-full">
                                                <FormLabel>Date of Journey</FormLabel>
                                                <Popover >
                                                    <PopoverTrigger className="w-full" asChild>
                                                        <FormControl className="w-full">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    " pl-3 text-left font-normal w-full",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={field.onChange}
                                                            disabled={(date: Date) =>{
                                                                const today = new Date();
                                                                today.setHours(0, 0, 0, 0); // reset time to midnight
                                                                return date < today;}
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="time"
    
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Time of Journey</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input className="w-full" placeholder="Time of Journey" type="time" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <FormLabel className="flex gap-2"><Car />Vehicles and Seats</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">

                                    <FormField
                                        control={form.control}
                                        name="vehicleName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter the name of the Car" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="seats"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Number of seats </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl className="w-full">
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a verified email to display" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {seats?.map((num, index) => (
                                                            <SelectItem key={index} value={num.toString()}>{num}</SelectItem>

                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />



                                </div>
                                <div className="flex justify-between mt-2">
                                    <Link href={'/find-rides'}><Button variant={"outline"} type="button">Cancel</Button></Link>
                                    <Button type="button" disabled={!isOneStepComplete} onClick={() => changeFormState("two")}>Continue</Button>

                                </div>
                            </CardContent>
                        </Card>
                        :
                        <Card className="p-5">

                            <CardContent className="flex flex-col gap-2.5 w-full">

                                <FormField
                                    control={form.control}
                                    name="price" // Make sure this matches your schema
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Price" type="number"  className="pl-3" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="number" // Make sure this matches your schema
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your mobile number" type="tel" pattern="[0-9]{10}" minLength={10}  maxLength={10} className="pl-3"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormLabel>Select Gender Preference</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="genderPreference"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3 m-3 ">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col  space-y-1 justify-center "
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem className="bg-white" value={userGender!} />
                                                        </FormControl>
                                                        <FormLabel className="font-medium">
                                                            {userGender?.slice(0, 1).toUpperCase()}{userGender?.slice(1)}
                                                        </FormLabel>
                                                    </FormItem>

                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem className="bg-white" value="both" />
                                                        </FormControl>
                                                        <FormLabel className="font-medium">No Preference</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="additionalInfo" // Make sure this matches your schema
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Information</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Any additional information about your ride (e.g., meeting point, luggage space, etc.)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormLabel className="flex gap-2"><Car />Meeting Point</FormLabel>
                                <div className="flex  w-full gap-3">

                                    <FormField
                                        control={form.control}
                                        name="meetingPoint"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Meeting point(s)</FormLabel>
                                                <FormControl className="w-full">
                                                    <div className="flex w-full gap-3">
                                                        <Input placeholder="Enter the meeting point" {...field} />
                                                        <Button type="button" className="grow-0 text-xl" onClick={addingMeetingPoint} variant={"secondary"}>+</Button>

                                                    </div>

                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <ul className="mt-3 space-y-1">
                                    {form.watch("meetingPointArr")?.map((meet, index) => (
                                        <li key={index} className="px-4 py-2 bg-gray-100 rounded flex items-center justify-between">
                                            {meet}
                                            <Button
                                                type="button"

                                                variant={"default"}
                                                onClick={() => {
                                                    const updatedCars = form.watch("meetingPointArr").filter((_, i) => i !== index);
                                                    form.setValue("meetingPointArr", updatedCars);
                                                }}
                                            >Delete
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <FormField
                                    control={form.control}
                                    name="allowChat"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Allow in app chat <Badge>Alpha</Badge></FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between mt-2">
                                    <Button variant={"outline"} onClick={() => changeFormState("one")} type="button">Back</Button>
                                    {!postRideMutation.isLoading ? <Button disabled={!isOneStepComplete} type="submit">Publish Ride</Button> : <Button disabled type="button" className="cursor-not-allowed" variant={"default"}>
                                        <Loader className="animate-spin" /> Publishing...</Button>}

                                </div>
                            </CardContent>
                        </Card>

                    }


                </form>
            </Form>
        </div>
    )
}

