import getAllPlaces from '@/actions/places';
import { getRideData } from '@/actions/rides';
import { notFound } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import RideUpdateForm from './form';
import { cookies } from 'next/headers';
import { fetchUserName } from '@/actions/auth';
import { useAuth } from '@/components/auth-provider';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const auth = useAuth();
    const userId:string|undefined=auth.authData?.userData?.name;
    const token:string|undefined =auth.authData?.token; 
    const response = await getRideData({ rideId: id, token: token! });
    const { error, places }: { error: any, places: { id: number, name: string }[] } = await getAllPlaces();
    if (error) {
        toast.error("Error fetching places, Pls reload", {style:{backgroundColor:'#FF7276'}})
    }
    const { ridesData } = response.data;
    if (ridesData.user.id !== userId) {
        notFound()   
    }
    return (
        <div>
            <RideUpdateForm allPlaces={places} ridesData={ridesData} rideId={id} />
        </div>
    )
}

export default page
