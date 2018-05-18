const axios = require('axios');
const REQUESTS_URL = process.env.VUE_APP_REQUESTS_URL;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const RequestsProvider = {
  makeRequest: makeRequest
}

export default RequestsProvider;

//////

function makeRequest(body) {
  const url = `${REQUESTS_URL}/request`;
  const options = {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  return new Promise((resolve, reject) => {
    axios.post(url, body)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response)
        }
      })
      .catch(e => reject(e));
  })
}
