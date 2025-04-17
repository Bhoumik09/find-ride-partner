import { getRideData } from "@/actions/rides"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { Rides } from "@/lib/types"
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const token = (await cookies()).get('token')?.value;
    const response:{msg:string, ridesData:Rides} = await getRideData({ rideId: id, token }); // Don't pass token here
    if(response?.msg==='Invalid token'){
        (await cookies()).delete('token');
        
    }
    const ridesData=response.ridesData;
    return (
        <div className="">
            <header className="bg-gradient-to-br from-red-100 to-red-200 shadow-sm ">
                <div className="container  px-4 py-4 flex items-center">

                    <Link href="/find-rides" className="mr-4">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Ride Details</h1>
                </div>
            </header>


            <Card className="md:mx-15 my-10">
                <CardHeader className="pb-2">
                    <CardTitle>Ride Information</CardTitle>
                    <CardDescription>                Get Full info about the ride
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-medium text-lg">{ridesData?.source.name}</div>
                                    <div className="text-muted-foreground">to {ridesData?.destination.name} </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(ridesData?.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",

                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(ridesData?.time).toLocaleTimeString("en-GB", {
                                        hour: 'numeric',
                                        minute: 'numeric'

                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>{ridesData?.numberOfSeats} seats available</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-medium">Meeting Points</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {ridesData.meetingPoints?.map((point: string, index: number) =>
                                    <div key={index} className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{point}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-medium">Description</h3>
                            <p className="text-muted-foreground">{ridesData?.additionalInfo}</p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-medium">Vehicle Information</h3>
                            <p className="text-muted-foreground">{ridesData?.vehicle}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between">
                    <div className="text-sm sm:text-xl font-bold">{ridesData.user.name}</div>
                    <Button asChild size="sm">
                        <Link href={`https://wa.me/${ridesData.phoneNumber}`}>Contact the Creater</Link>
                       
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default page
