'use client';
import { useState } from 'react';
import { Select } from '@/components/Select';
import { Button, buttonVariants } from '@/components/Button';
import { useVehicleMakes } from '@/hooks/useVehicleMakes';
import Link from 'next/link';
import { cn, generateYearsFromStartToCurrent } from '@/lib/utils';
import Skeleton from '@/components/Skeleton';

const years = generateYearsFromStartToCurrent(2015);

export default function Home() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const { vehicleMakes, isLoading, isError } = useVehicleMakes();

  if (isError) return <div>Error fetching vehicle makes</div>;

  const isNextButtonDisabled = !selectedMake || !selectedYear;

  const renderNextButton = () =>
    isNextButtonDisabled ? (
      <Button variant="default" size="lg" className="w-full" disabled>
        Next
      </Button>
    ) : (
      <Link
        href={`/result/${selectedMake}/${selectedYear}`}
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'w-full'
        )}
      >
        Next
      </Link>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-lg space-y-4 rounded shadow p-20">
        <h1 className="mb-8 text-2xl font-bold text-center">
          Select Vehicle Make and Model Year
        </h1>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Select
            options={vehicleMakes?.map((make) => ({
              value: make.MakeId.toString(),
              label: make.MakeName,
            }))}
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            placeholder="Select Vehicle Make"
          />
        )}
        <Select
          options={years.map((year) => ({
            value: year.toString(),
            label: year.toString(),
          }))}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Select Model Year"
        />
        {renderNextButton()}
      </div>
    </div>
  );
}
