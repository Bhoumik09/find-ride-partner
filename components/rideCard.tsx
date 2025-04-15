import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar";
import { CarTaxiFront, Clock, MapPin, UsersIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./auth-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { Rides } from "@/lib/types";

export const RideCard: React.FC<any> = ({ ride , deleteTheRide}:{ride:Rides, deleteTheRide:(id:string)=>void}) => {
    const auth = useAuth();
    const userId = auth.authData?.userData?.id
    return (
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
                                <p className=" text-sm sm:text-xl font-bold font-serif">{ride?.user?.name}</p>
                                <Badge className="max-sm:text-xs">{ride?.genderPreference}</Badge>
                            </div>
                        </div>
                        <div className=" pl-3.5 flex gap-3">
                            <div className="font-semibold text-md sm:text-xl whitespace-nowrap">{ride.price} Rs</div>
                            {ride.user.id === userId &&
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild className="  p-2 outline-0 border-0   ">
                                        <Button size={'sm'}   variant={'default'} >Menu</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Ride</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild><Link href={`/update-ride/${ride.id}`}>Update</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={()=>deleteTheRide(ride.id)}>Delete</DropdownMenuItem>
                                      
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
                        </div>
                    </div>


                    <div className="flex items-start ">
                        <MapPin className="w-6 h-6 md:w-7 md:h-7" />

                        <div className="flex flex-col justify-start">
                            <p className="inline-block px-2  font-semibold text-md sm:text-xl">{ride?.source?.name}</p>
                            <p className="opacity-50 max-sm:text-sm ">to {ride?.destination?.name}</p>
                        </div>

                    </div>
                    <div className="flex gap-2 items-center">
                        <Clock className="size-6 md:size-7" />
                        <p className="max-sm:text-sm text-lg">At {new Date(ride.time!).toLocaleTimeString("en-GB", {
                            minute: 'numeric',
                            hour: '2-digit'

                        })} , {new Date(ride.date!).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",

                        })} </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <UsersIcon className="size-6 md:size-7" />
                        <p className="max-sm:text-sm text-lg">{ride?.numberOfSeats}  Available </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CarTaxiFront className="size-6 md:size-7" />
                        <p className="max-sm:text-sm text-lg"> {ride?.vehicle}</p>
                    </div>
                    <Button asChild>
                        <Link href={`/ride-info/${ride.id}`}>View Ride</Link>
                    </Button>





                </div>

            </CardContent>
        </Card>
    )
}
