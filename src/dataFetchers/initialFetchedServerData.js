/**
 * The purpose of this function is to get the already pre-fetched data from the Server
 * and make it available for all components, rendered in the Browser.
 */
let data;
const clearInitialFetchedServerData = () => {
  data = undefined;
};

const getInitialFetchedServerData = () => {
  if (data) {
    return data;
  }

  try {
    data = global.__INITIAL_FETCHED_SERVER_DATA__;
    delete window.__INITIAL_FETCHED_SERVER_DATA__; // In the Browser `global` === `window`
  } catch (error) {/* We're running in the Server */}

  if (!data) {
    try {
      data = window.__INITIAL_FETCHED_SERVER_DATA__;
      delete window.__INITIAL_FETCHED_SERVER_DATA__;
    } catch (error) {
      /* Browser failed to load or clear data but this should happen only if `global` failed to alias to `window` */
    }
  }

  if (!data) {
    data = {};
  }

  return data;
};

export {
  getInitialFetchedServerData,
  clearInitialFetchedServerData,
};
