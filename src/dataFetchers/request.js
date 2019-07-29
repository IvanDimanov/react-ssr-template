import axios from 'axios';

/* Helps when User reload the page or come from a Login page */
let authorizationHeader = global.sessionStorage ? global.sessionStorage.getItem('authorizationHeader') : '';

const request = async (args) => {
  if (typeof args === 'string') {
    args = {
      url: args,
    };
  }

  args.method = args.method || 'GET';

  /* Check if we can start using User authorization for every request he makes */
  if (authorizationHeader) {
    if (!args.headers ||
        typeof args.headers !== 'object'
    ) {
      args.headers = {};
    }

    args.headers.authorization = authorizationHeader;
  }

  const response = await axios(args);

  const newAuthorizationHeader = response.headers.authorization || response.headers.Authorization;
  if (newAuthorizationHeader) {
    authorizationHeader = newAuthorizationHeader;

    if (global.sessionStorage) {
      global.sessionStorage.setItem('authorizationHeader', authorizationHeader);
    }
  }

  return response;
};

/* Short-hands */
request.getAuthorizationHeader = () => authorizationHeader;
request.get = (url, args) => request({...args, url, method: 'GET'});
request.put = (url, args) => request({...args, url, method: 'PUT'});
request.post = (url, args) => request({...args, url, method: 'POST'});
request.delete = (url, args) => request({...args, url, method: 'DELETE'});

export default request;
