'use client';

import useSWR from 'swr';
import { VehicleMakesResponse } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useVehicleMakes = () => {
  const { data, error, isLoading } = useSWR<VehicleMakesResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}GetMakesForVehicleType/car?format=json`,
    fetcher
  );

  return {
    vehicleMakes: data?.Results,
    isLoading,
    isError: error,
  };
};
