const keystone = require('keystone');


exports.getHomePage = (req, res) => {

    const view = new keystone.View(req, res);
    view.render('home');

};


exports.login = (req, res) => {
    res.redirect('/keystone');
};

exports.logout = (req, res) => {
    res.redirect('/keystone/signout');
};