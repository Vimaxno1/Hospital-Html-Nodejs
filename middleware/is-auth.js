module.exports = (req, res, next) => {
  console.log('working');
  if (!req.session.isLoggedIn) {
    return res.redirect('/sign-in');
  }
  next();
};
