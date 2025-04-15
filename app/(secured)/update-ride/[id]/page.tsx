import getAllPlaces from '@/actions/places';
import { getRideData } from '@/actions/rides';
import { notFound } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import RideUpdateForm from './form';
import { cookies } from 'next/headers';
import { fetchUserName } from '@/actions/auth';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const token = (await cookies()).get('token')?.value;
    const response = await getRideData({ rideId: id, token: token! });
    const user: { msg: string, userInfo: { name: string, id: string } } | null = await fetchUserName(token)
    const { error, places }: { error: any, places: { id: number, name: string }[] } = await getAllPlaces();
    if (error) {
        toast.error("Error fetching places")
    }
    if (response.status !== 200) {
    }

    const { ridesData } = response.data;
    if (ridesData.user.id !== user?.userInfo.id) {
        notFound()
        
    }
    return (
        <div>
            <RideUpdateForm allPlaces={places} ridesData={ridesData} rideId={id} />
        </div>
    )
}

export default page
