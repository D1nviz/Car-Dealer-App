
export async function fetchVehicleMakes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}GetMakesForVehicleType/car?format=json`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes');
  }

  const data = await response.json();
  return data.Results;
}
