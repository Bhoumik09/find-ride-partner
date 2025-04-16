import React from 'react'
import RideForm from './_form'


import getAllPlaces from '@/actions/places';
import { toast } from 'sonner';

const page = async () => {
    const {error, places}:{error:string, places:{id:number, name:string}[]} = await getAllPlaces();
    if(error){
        toast.error("Error fetching places, Please reload")  
    }
    return (
        <div>
            <RideForm allPlaces={places} />
        </div>
    )
}

export default page
