export type VehicleMake = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type VehicleMakesResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleMake[];
};
export type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export type VehicleModelsResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleModel[];
};
