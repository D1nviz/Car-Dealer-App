export async function fetchVehicleModels(makeId: string, year: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle models');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
