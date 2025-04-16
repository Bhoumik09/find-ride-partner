'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth-provider';
import RideUpdateForm from './form';
import { Rides } from '@/lib/types';

const RideUpdateClient = ({
  places,
  ridesData,
  rideId,
}: {
  places: { id: number; name: string }[];
  ridesData: Rides;
  rideId: string;
}) => {
  const auth = useAuth();
  const userId = auth.authData?.userData?.id;
  const router = useRouter();

  useEffect(() => {
    if (!userId || ridesData.user.id !== userId) {
        notFound()
    }
  }, [userId, ridesData.user.id, router]);

  useEffect(() => {
    if (!places.length) {
      toast.error('Error fetching places, please reload.', {
        style: { backgroundColor: '#FF7276' },
      });
    }
  }, [places]);

  return (
    <RideUpdateForm
      allPlaces={places}
      ridesData={ridesData}
      rideId={rideId}
    />
  );
};

export default RideUpdateClient;
