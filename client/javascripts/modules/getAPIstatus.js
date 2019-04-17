import axios from 'axios';
const token = 'some_token_here';

function getAPIstatus() {
    axios({
        method: 'get',
        url: '/api/v1/',
        timeout: 20000,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
}

export default getAPIstatus;