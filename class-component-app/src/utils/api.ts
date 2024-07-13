export const fetchCharacterDetails = async (characterName: string) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${characterName}`,
  );
  const data = await response.json();
  return data.results[0];
};
