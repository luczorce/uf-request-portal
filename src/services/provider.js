const axios = require('axios');
const REQUESTS_URL = process.env.VUE_APP_REQUESTS_URL;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const RequestsProvider = {
  makeRequest: makeRequest,
  getRequestResponses: getRequestResponses
}

export default RequestsProvider;

//////

function getRequestResponses(requestKey) {
  const url = `${REQUESTS_URL}/response/${requestKey}`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(e => reject(e));
  })
}

function makeRequest(body) {
  const url = `${REQUESTS_URL}/request`;

  return new Promise((resolve, reject) => {
    axios.post(url, body)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(e => reject(e));
  });
}
