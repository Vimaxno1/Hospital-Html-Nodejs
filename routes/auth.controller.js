/**************************/
/* CONST SECTION */
/**************************/

const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

/**************************/
/* SIGN-IN SECTION */
/**************************/
/* GET SIGN-IN SECTION */
exports.getSignin = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  res.render('auth/sign-in', {
    path: '/sign-in',
    pageTitle: ':: Hospital :: Sign In',
    errorMessage: message,
    successMessage: messages,
  });
};

/* POST SIGN-IN SECTION */
exports.postSignin = (req, res, next) => {
  const username = req.body.username;
  var password = req.body.password;

  Admin.findOne({
    username: username,
  })
    .then((admin) => {
      if (!admin) {
        req.flash('error', 'Invalid User-Name or Password.');
        return res.redirect('/sign-in');
      } else {
        if (admin) {
          bcrypt
            .compare(password, admin.password)
            .then((doMatch) => {
              if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.admin = admin;
                req.flash('success', 'You have Successfully Sign In');
                return req.session.save((err) => {
                  console.log(err);
                  res.redirect('/');
                });
              } else {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/sign-in');
              }
            })
            .catch((err) => {
              console.log(err);
              res.redirect('/sign-in');
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/sign-in');
    });
};

/**************************/
/* SIGN-UP SECTION */
/**************************/
/* GET SIGN-UP SECTION */
exports.getSignup = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/sign-up', {
    path: '/sign-up',
    pageTitle: ':: Hospital :: Sign Up',
    errorMessage: message,
  });
};

/* POST SIGN-UP SECTION */
exports.postSignup = async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const comfirmpassword = req.body.comfirmpassword;

  
  if (password !== comfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/sign-up');
  };

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Admin.findOrCreate({
    where: { username: username,
      email: email, },
    defaults: {
      firstname: firstname,
      lastname: lastname,
      username: username,
      address: address,
      email: email,
      phone: phone,
      password: hashedPassword,
    }
  });

if (user!==true && created!==false) {
  req.flash('success','Successfully Created');
  return res.redirect('/sign-in');
} else {
  req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
  return res.redirect('/sign-up');
  };
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/sign-in');
  });
};
