import getAllPlaces from '@/actions/places';
import { getRideData } from '@/actions/rides';
import Cookies from 'js-cookie'
import RideUpdateClient from './RideUpdateClient';
import { Rides } from '@/lib/types';
export default async function Page({ params }: { params:Promise< { id: string }> }) {
    const { id } = (await params);
    const token: string = Cookies.get('token');
    const response = await getRideData({ rideId: id, token }); // Don't pass token here
    const { error, places } = await getAllPlaces();

    if (error) {
        // You can’t use `toast` in server components. Handle this in the client instead
        console.error("Error fetching places");
    }

    const { ridesData }:{ridesData:Rides}|undefined = response.data;

    return (
        <RideUpdateClient
            places={places}
            ridesData={ridesData}
            rideId={id}
        />
    );
}
