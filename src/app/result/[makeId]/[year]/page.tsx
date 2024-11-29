import { buttonVariants } from '@/components/Button';
import VehicleModelList from '@/components/VehicleModelList';
import { fetchVehicleMakes } from '@/lib/service/fetchVehicleMakes';
import { fetchVehicleModels } from '@/lib/service/fetchVehicleModels';
import { cn, generateYearsFromStartToCurrent } from '@/lib/utils';
import { VehicleMake, VehicleModelsResponse } from '@/types';
import Link from 'next/link';

type ResultPageProps = {
  params: Promise<{
    makeId: string;
    year: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const vehicleMakes: VehicleMake[] = await fetchVehicleMakes();

  if (!vehicleMakes || vehicleMakes.length === 0) {
    return [];
  }
  const years = generateYearsFromStartToCurrent(2015);

  const paths = vehicleMakes.map((make) => {
    return years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }));
  });

  return paths.flat();
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { makeId, year } = await params;

  let modelsResponse: VehicleModelsResponse | null = null;
  try {
    modelsResponse = await fetchVehicleModels(makeId, year);
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
  }

  const vehicleMakes: VehicleMake[] = await fetchVehicleMakes();

  const makeName = vehicleMakes.find((make) => make.MakeId === Number(makeId));

  const models = modelsResponse?.Results;

  if (!models || !modelsResponse)
    return (
      <div className="flex flex-col gap-4 items-center p-4 bg-gray-100 rounded">
        No models found for this make and year.
        <Link href="/" className={cn(buttonVariants(), 'w-fit')}>
          Go back to home page
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-8 text-3xl font-bold">
        Available Vehicle Models for {year} {makeName?.MakeName}
      </h1>
      <div className="w-full max-w-2xl">
        <VehicleModelList models={models} />
      </div>
    </div>
  );
}
