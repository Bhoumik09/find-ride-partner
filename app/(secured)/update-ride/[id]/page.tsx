import getAllPlaces from '@/actions/places';
import { getRideData } from '@/actions/rides';
import RideUpdateClient from './RideUpdateClient';
import { Rides } from '@/lib/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Page({ params }: { params:Promise< { id: string }> }) {
    const { id } = (await params);
    const token: string =(await cookies()).get('token').value;
    if(!token){
        redirect('/auth')
        
    }
    const response:{msg:string, ridesData:Rides} = await getRideData({ rideId: id, token }); // Don't pass token here
    if(response?.msg==='Invalid token'){
        (await cookies()).delete('token');
        
    }
    const { error, places } = await getAllPlaces();
    
    if (error) {
        // You can’t use `toast` in server components. Handle this in the client instead
        console.error("Error fetching places");
    }

    

    return (
        <RideUpdateClient
            places={places}
            ridesData={response?.ridesData}
            rideId={id}
        />
    );
}
