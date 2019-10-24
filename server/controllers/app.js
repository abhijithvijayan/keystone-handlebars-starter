const keystone = require('keystone');

exports.index = (req, res) => {
    const view = new keystone.View(req, res);
    view.render('home', { title: 'Home' });
};
