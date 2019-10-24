exports.login = (req, res) => {
  res.redirect('/keystone');
};

exports.logout = (req, res) => {
  res.redirect('/keystone/signout');
};
