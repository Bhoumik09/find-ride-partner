'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


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
import { CalendarIcon, CarTaxiFront, Clock, Loader2, MapPin, Search, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
const FormSchema = z.object({
    source: z
        .string({
            required_error: "Please select an source to display.",
        }),

    destination: z
        .string({
            required_error: "Please select an destination to display.",
        }),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    number_people: z.string({
        required_error: "Number of people are required ",
    }),
    gender: z.enum(["male", "female", "any"], {
        required_error: "You need to the gender preference.",
    }),

})

export default function Home() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const [buttonState, setButtonState] = useState<"wait" | "ready">("ready");
    const numbers: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    function onSubmit(data: z.infer<typeof FormSchema>) {
        setButtonState("wait");
        if (data.destination === data.source) {
            toast.error("Souce and destination cannot be same", {
                style: { backgroundColor: "#e80d33" },
                duration: 5000
            });
            return;
        }
        setTimeout(() => { setButtonState("ready") }, 5000);

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
                                                <FormLabel>Email</FormLabel>
                                                <Select onValueChange={field.onChange} >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Pls select the Source" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white">
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
                                            <FormItem className="w-full">
                                                <FormLabel>Destination</FormLabel>
                                                <Select onValueChange={field.onChange} >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Pls select the Destination" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="college">VIT Bhopal</SelectItem>
                                                        <SelectItem value="bhopal-rail">Bhopal Railway Station</SelectItem>
                                                        <SelectItem value="bhopal-air">Bhopal Airport</SelectItem>
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
                                                                    format(new Date(field.value), "PPP")
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
                                        name="number_people"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Passengers Required</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} >
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

                                {buttonState === "ready" ?
                                    < Button type="submit" className="mt-4" >Submit</Button > : <Button className="mt-4" disabled><Loader2 className="animate-spin"></Loader2>Please wait</Button>}

                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </div>
            <div className=" w-full flex justify-between px-4 font-bold text-3xl">
                <p className="font-serif">Available Rides</p>
                <Button variant={"secondary"}>
                    <Search color="green" size={12} strokeWidth={3} className="animate-pulse" />
                    View all Rides</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <div className="flex">
                                    <Avatar className="size-10 sm:size-16">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="px-1 md:px-2">
                                        <p className=" text-sm sm:text-xl font-bold font-serif">Bhoumik Chopra</p>
                                        <Badge className="max-sm:text-xs">Male</Badge>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="font-semibold text-md sm:text-xl whitespace-nowrap">2000 Rs</div>
                                    <Menubar className="h-6 p-0 ">
                                        <MenubarMenu >
                                            <MenubarTrigger className="h-full w-full psrc/components/uib-2">...</MenubarTrigger>
                                            <MenubarContent className="h-full w-full ">
                                                
                                                <MenubarItem>New Window</MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem>Share</MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem>Print</MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </div>
                            </div>

                            <div className="flex items-start ">
                                <MapPin className="w-6 h-6 md:w-7 md:h-7" />

                                <div className="flex flex-col justify-start">
                                    <p className="inline-block px-2  font-semibold text-md sm:text-xl">VIT Bhopal </p>
                                    <p className="opacity-50 max-sm:text-sm ">to Bhopal Railway Station</p>
                                </div>

                            </div>
                            <div className="flex gap-2 items-center">
                                <Clock className="size-6 md:size-7" />
                                <p className="max-sm:text-sm text-lg">At 5:30 Am , 23rd April </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <UsersIcon className="size-6 md:size-7" />
                                <p className="max-sm:text-sm text-lg">3  Available </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <CarTaxiFront className="size-6 md:size-7" />
                                <p className="max-sm:text-sm text-lg"> Artiga</p>
                            </div>
                            <Button>View and Chat</Button>





                        </div>

                    </CardContent>
                </Card>

            </div>

        </div >
    )
}

