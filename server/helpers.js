// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Some details about the site
exports.navLinks = [
    {
        label: 'About',
        key: '/about',
        href: '/about',
    },
    {
        label: 'Work',
        key: '/work',
        href: '/work',
    },
];

exports.siteName = 'Site Name';
