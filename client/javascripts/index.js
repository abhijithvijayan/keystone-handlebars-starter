/* eslint-disable no-console */
/*!
 *
 * @author   abhijithvijayan <https://abhijithvijayan.in>
 * @license  MIT
 *
 */

import 'bootstrap';
import '../sass/main.scss';
import getAPIstatus from './modules/getAPIstatus';

/* ------------------------------------------------------------- */

getAPIstatus();

/* ------------------------------------------------------------- */

$(document).ready(() => {
    // bootstrap tooltip
    $(() => {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover',
        });
    });
});

console.log('%cCrafted and Coded by abhijithvijayan', 'color: white; background: black; padding: 5px 20px');

/* ------------------------------------------------------------- */
