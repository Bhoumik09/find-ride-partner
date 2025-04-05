'use client'

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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Car, Clock, Info, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define schema
const formSchema = z.object({
    source: z.string({ required_error: "Fill the source field" }),
    destination: z.string({ required_error: "Fill the destination field" }),
    dateOfJourney: z.union([z.date(), z.string()]),
    timeOfJourney: z.string({ required_error: "Fill the time of departure" }),
    nameOfCar: z.string({ required_error: "Enter the name of the Car" }),
    noOfSeats: z.string({ required_error: "Enter the number of seats Available" }),
    price: z.coerce.number({ required_error: "Enter the price of the cab" }),
    gender: z.enum(["male", "female", "any"], { required_error: "Select an option" }),
    meetingPointArr: z.array(z.string().min(1, "Meeting point cannot be empty")),
    meetingPoint: z.string(),
    allowChat: z.boolean(),
    phone: z.string({ required_error: "Enter your mobile number" }),
})


export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            source: "",
            destination: "",
            dateOfJourney: "", // as string
            timeOfJourney: "",
            nameOfCar: "",
            noOfSeats: "",
            price: 0,
            gender: "any",
            meetingPointArr: [],
            meetingPoint: "",
            allowChat: false,
            phone: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    const seats: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [formState, changeFormState] = useState<"one" | "two">("two");
    const addingMeetingPoint = () => {
        const ptArray: string[] = form.watch("meetingPointArr") || [];
        const pt: string | undefined = form.watch("meetingPoint");
        if (!pt!.trim()) return;
        form.setValue("meetingPointArr", [...ptArray, pt!]);//add to array
        form.setValue("meetingPoint", "");//Clear Inpt


    }
    const formValues = form.watch();
    let isOneStepComplete = formValues.dateOfJourney && formValues.destination && formValues.noOfSeats && formValues.nameOfCar && formValues.source && formValues.timeOfJourney;
    return (
        <div className="bg-blue-50 overflow-auto h-screen xs:px-20 md:px-40 py-20">
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select the source" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full">
                                                    <SelectItem value="college">VIT Bhopal</SelectItem>
                                                    <SelectItem value="bhopal-rail">Bhopal Railway Station</SelectItem>
                                                    <SelectItem value="bhopal-air">Bhopal Airport</SelectItem>
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="college">VIT Bhopal</SelectItem>
                                                    <SelectItem value="bhopal-rail">Bhopal Railway Station</SelectItem>
                                                    <SelectItem value="bhopal-air">Bhopal Airport</SelectItem>
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
                                        name="dateOfJourney"
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
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
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
                                        name="timeOfJourney"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Time of Journey" type="time"  {...field} />
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
                                        name="nameOfCar"
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
                                        name="noOfSeats"
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
                                    <Button variant={"outline"} type="button">Cancel</Button>
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
                                                <Input placeholder="Price" type="number" min={1} className="pl-3" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone" // Make sure this matches your schema
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your mobile number" type="tel" min={1} className="pl-3" max={12} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormLabel>Select Gender Preference</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="gender"
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
                                                            <RadioGroupItem className="bg-white" value="male" />
                                                        </FormControl>
                                                        <FormLabel className="font-medium">
                                                            Male
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem className="bg-white" value="female" />
                                                        </FormControl>
                                                        <FormLabel className="font-medium">
                                                            Female
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem className="bg-white" value="any" />
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
                                    name="timeOfJourney"
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
                                    <Button disabled={!isOneStepComplete} type="submit">Publish Ride</Button>

                                </div>
                            </CardContent>
                        </Card>

                    }


                </form>
            </Form>
        </div>
    )
}

