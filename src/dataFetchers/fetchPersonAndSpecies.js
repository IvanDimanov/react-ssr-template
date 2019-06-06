import request from './request';

const fetchPersonAndSpecies = async (personId) => {
  /* Fetch general Person data like `name`, `height`, `mass` */
  const {data: personData} = await request.get(`https://swapi.co/api/people/${personId}/`);

  /* Fetch all the species that are related to the Person */
  const speciesResponses = await Promise.all(personData.species.map(request.get));

  return {
    ...personData,
    personId,
    fetchedSpecies: speciesResponses.map(({data}) => data),
  };
};

export default fetchPersonAndSpecies;
