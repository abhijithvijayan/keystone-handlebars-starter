/* eslint-disable no-console */
import axios from 'axios';

const token = 'some_token_here';

const getAPIstatus = async () => {
    const response = await axios({
        method: 'get',
        url: '/api/v1/',
        timeout: 20000,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response) {
        console.log(response.data);
    }
};

export default getAPIstatus;
