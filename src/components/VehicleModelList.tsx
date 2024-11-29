import React from 'react';
import { VehicleModel } from '@/types';

type VehicleModelListProps = {
  models: VehicleModel[];
};

const VehicleModelList: React.FC<VehicleModelListProps> = ({ models }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => (
        <li
          key={crypto.randomUUID()} // using crypto.randomUUID() to generate a unique key because the model.Model_ID is not unique
          className="p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          <h2 className="font-semibold text-xl">{model.Model_Name}</h2>
          <p className="text-sm text-gray-600">{model.Make_Name}</p>
          <p className="text-sm text-gray-500">Model ID: {model.Model_ID}</p>
        </li>
      ))}
    </ul>
  );
};

export default VehicleModelList;
