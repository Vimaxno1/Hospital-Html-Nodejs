
/**************************/
/* MAIN SECTION */
/**************************/
exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Home',
  });
};
