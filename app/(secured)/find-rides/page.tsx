import React from 'react'
import FindRidesForm from './form'
import { toast } from 'sonner';
import getAllPlaces from '@/actions/places';
const page = async() => {
    const {error, places}:{error:string, places:{id:number, name:string}[]} = await getAllPlaces();
    if(error){
        toast.error("Error fetching places")  
    } 
  return (
    <div>
      <FindRidesForm allPlaces={places} />
    </div>
  )
}

export default page
