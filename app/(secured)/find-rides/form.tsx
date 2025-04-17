'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { CalendarIcon,  Loader2,  } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { findRideFormSchema, Rides } from "@/lib/types"
import { deleteRide, findRides, findUserRides } from "@/actions/rides"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/components/auth-provider"
import { RideCard } from "@/components/rideCard"
import { RidesSkeleton } from "@/components/ridesSkeleton"

export default function FindRidesForm({ allPlaces }: { allPlaces: { id: number, name: string }[] }) {
    const router = useRouter();
    const auth = useAuth();
    const deleteMutation = useMutation({
        mutationFn: deleteRide,
        mutationKey: ['deleteRide']
    })

    const [rideData, setRidesData] = useState<Rides[] | undefined>(undefined);
    const token: string | undefined = Cookies.get('token');
    const [userRides, setUserRides] = useState<Rides[] | undefined>(undefined);
    
    const deleteTheRide = async (id: string): Promise<void> => {
        const response: { msg: string, error: string } = await deleteMutation.mutateAsync({ token: token!, rideId: id })
        if (response.msg) {
            toast.success("Ride deleted successfully", {
                description: response.msg
            });
            setUserRides(() => userRides?.filter((ride: Rides) => ride.id !== id))

        } else {
            toast.warning("Error occured while deleting the ride", {
                description: response.error
            });

        }
    }
    useEffect(() => {
        const getUserRide = async (): Promise<void> => {
            const response: { msg: string, ridesData: Rides[], error: string } = await findUserRides({ token: token as string })
            if (response.error) {
                toast.error("Error on fetching user data", {
                    description: response.error.slice(0, 50),
                    style: { backgroundColor: 'red' }
                });
                return;
            }
            setUserRides(response?.ridesData)
        }
        if (!token) {
            void router.push('/auth')
            return;
        }
        getUserRide()
    }, [token, router])
    const form = useForm<z.infer<typeof findRideFormSchema>>({
        resolver: zodResolver(findRideFormSchema),
        defaultValues: {
            source: "", // Set default value to the first place's ID
            destination: "", // Set default value to the first place's ID
            dob: undefined, // Set default value for Date of Journey to today's date
            number_people: "", // Default number of passengers
            gender: undefined, // Default gender preference
        }

    })
    const findRidesMutation = useMutation({
        mutationKey: ["findRides"],
        mutationFn: findRides,
    })
    const numbers: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    async function onSubmit(data: z.infer<typeof findRideFormSchema>) {

        if (data.source !== "" && data.destination != "" && data.destination === data.source) {
            toast.error("Souce and destination cannot be same", {
                style: { backgroundColor: "#e80d33" },
                duration: 5000
            });
            return;
        }

        const response: { msg: string, ridesData:Rides[] , error: string } = await findRidesMutation.mutateAsync({ payload: data, token: token as string })
        if (response?.ridesData) {
            toast.success("Rides Fetched Successfully")
            setRidesData(response.ridesData);
        } else {
            toast.error(`These was an error in fetching rides ${response.error}`);

        }
        form.reset()


    }
    return (
        <div className=" bg-gradient-to-br b from-blue-50  to-blue-100 w-full ">
            <div className=" px-4 sm:px-20 py-10 w-full">
                <Card className="bg-gradient-to-br from-green-100  to-green-200"  >
                    <CardHeader className="flex flex-col items-center" >
                        <CardTitle className="text-3xl font-bold font-serif">Find a ride partner</CardTitle>
                        <CardDescription className="text-black font-semibold">Connect with fellow students for safe, convenient rides between campus and station</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col w-full">
                                <div className="flex md:justify-between p-3 w-full gap-2 flex-col md:flex-row  md:gap-5">
                                    <FormField

                                        control={form.control}
                                        name="source"
                                        render={({ field }) => (
                                            <FormItem className="w-full" >
                                                <FormLabel>Source</FormLabel>
                                                <Select onValueChange={field.onChange} value={typeof field.value === 'string' ? field.value : String(field.value)} defaultValue={String(field.value)} >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Pls select the Source" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white">
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
                                            <FormItem className="w-full">
                                                <FormLabel>Destination</FormLabel>
                                                <Select onValueChange={field.onChange} value={typeof field.value === 'string' ? field.value : String(field.value)} defaultValue={String(field.value)} >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Pls select the Destination" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white">
                                                        {allPlaces?.map((place) => (
                                                            <SelectItem key={place.id} value={String(place.id)}>{place.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />

                                </div>
                                <div className="flex md:justify-between p-3 w-full gap-2 flex-col md:flex-row  md:gap-5">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col w-full">
                                                <FormLabel>Date of Journey</FormLabel>
                                                <Popover >
                                                    <PopoverTrigger asChild className="w-full" >
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    " pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value ? new Date(field.value) : "", "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>

                                                    {/* ✅ Correct PopoverContent for the calendar */}
                                                    <PopoverContent className="w-full p-0">
                                                        <Calendar
                                                            className="w-full"
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
                                        name="number_people"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Passengers Required</FormLabel>
                                                <Select onValueChange={field.onChange} value={typeof field.value === 'string' ? field.value : String(field.value)} defaultValue={String(field.value)} >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger className="w-full truncate bg-white">
                                                            <SelectValue placeholder="Pls select the number of passengers" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {numbers?.map((num, index) => (
                                                            <SelectItem key={index} value={num.toString()}>{num}</SelectItem>

                                                        ))}

                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />
                                </div>
                                <div className="text-center font-semibold text-xl antialiased">Gender Preference</div>
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3 mt-3 ">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col sm:flex-row  space-y-1 justify-center "
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem className="bg-white" value={auth.authData?.userData?.gender} />
                                                        </FormControl>
                                                        <FormLabel className="font-medium">
                                                            Same Gender
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

                                {!findRidesMutation.isLoading ?
                                    < Button type="submit" className="mt-4" >Submit</Button > : <Button className="mt-4" disabled><Loader2 className="animate-spin"></Loader2>Please wait</Button>}

                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </div>
            <div className=" w-full flex justify-between px-4 font-bold text-3xl">
                <p className="font-serif">My Rides</p>

            </div>
            <div className="flex overflow-x-scroll scrollbar-hide  gap-9 p-5">
                {!userRides
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <RidesSkeleton key={idx} />
                    ))
                    : userRides.length == 0 ?
                        <div className="w-full font-bold">No rides found</div>
                        : userRides?.map((ride: Rides) => (
                            <RideCard ride={ride} key={ride?.id} deleteTheRide={deleteTheRide} />

                        ))}

            </div>
            {rideData && <div className=" w-full flex justify-center  font-bold text-3xl">
                <p className="font-serif px-4">Available Rides</p>

            </div>}

            <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                {!findRidesMutation.isLoading ? rideData?.length == 0 ?
                    <div className="w-full text-xl md:col-span-2 text-center font-medium font-serif">No rides found</div>

                    : rideData?.map((ride: Rides) => (
                        <RideCard ride={ride} key={ride?.id} />)) :
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RidesSkeleton key={idx} />
                    ))
                }

            </div>

        </div >
    )
}

