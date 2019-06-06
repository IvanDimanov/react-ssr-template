import fetchPersonAndSpecies from '../src/dataFetchers/fetchPersonAndSpecies';

/**
 * This function has the important role of pre-loading every piece of data that a page at a specific URL might need.
 * The best approach to check what kind of data a page needs is to look at what `Context`s the page uses.
 * Then look how these `Context`s use the `getInitialFetchedServerData()` function to load that data
 * when the page is loaded in the Browser.
 *
 * @param {JSON} request Express `request` object used to determine page URL
 */
const generateInitialFetchedServerData = async (request) => {
  global.__INITIAL_FETCHED_SERVER_DATA__ = {};

  /* Fetch every data needed for the `/people/:personId` URL */
  const peopleMatch = request.url.match(/^\/people\/(\d+)$/);
  if (peopleMatch) {
    const personId = Number(peopleMatch[1]);
    let person = null;
    try {
      person = await fetchPersonAndSpecies(personId);
    } catch (error) {
      process.stderr.write(`\n[ERROR] - Unable to load "fetchPersonAndSpecies()" with personId = "${personId}": ${error.stack}`);
    }

    global.__INITIAL_FETCHED_SERVER_DATA__.person = person;
    return;
  }
};

export default generateInitialFetchedServerData;
