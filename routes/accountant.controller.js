const Accountant = require('../models/accountant');
const bcrypt = require('bcryptjs');
const fileHelper = require('../util/file');

/* ALL ACCOUNTANT SECTION */
exports.getAllaccountant = (req, res, next) => {
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  Accountant.findAll().then((accountants) => {
    res.render('accountants/all-accountant', {
      docs: accountants,
      path: '/all-accountant',
      lastname: req.admin.lastname,
      phone: req.admin.phone,
      email: req.admin.email,
      address: req.admin.address,
      pageTitle: ':: Hospital :: All Accountants',
      successMessage: messages,
    });
  });
};

/* ADD ACCOUNTANT SECTION */
exports.getAddaccountant = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('accountants/add-accountant', {
    path: '/add-accountant',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Add Accountants',
    errorMessage: message,
  });
};

exports.postAddaccountant = async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const middlename = req.body.middlename;
  const username = req.body.username;
  const password = req.body.password;
  const comfirmpassword = req.body.comfirmpassword;
  const dateofbirth = req.body.dateofbirth;
  const gender = req.body.gender;
  const job_post = req.body.job_post;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const profileimage = req.file;
  const remarks = req.body.remarks;
  const about = req.body.about;
  const HospitalAffiliations = req.body.HospitalAffiliations;
  const AccountingSchool = req.body.AccountingSchool;
  const Residency = req.body.Residency;
  const Certifications = req.body.Certifications;
  const ExperienceOrTranining = req.body.ExperienceOrTranining;
  const Internship = req.body.Internship;
  const specialities = req.body.specialities;

  if (password !== comfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/add-accountant');
  };

  if (!profileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/add-accountant');
  };

  const imageUrl = profileimage.path;

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Accountant.findOrCreate({
    where: { username: username,
      email: email, },
    defaults: {
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      username: username,
      password: hashedPassword,
      dateofbirth: dateofbirth,
      gender: gender,
      job_post: job_post,
      phone: phone,
      email: email,
      address: address,
      imageUrl: imageUrl,
      remarks: remarks,
      about: about,
      HospitalAffiliations: HospitalAffiliations,
      AccountingSchool: AccountingSchool,
      Residency: Residency,
      Certifications: Certifications,
      ExperienceOrTranining: ExperienceOrTranining,
      Internship: Internship,
      specialities: specialities,
    }
  });

if (user!==true && created!==false) {
  req.flash('success','Successfully Created');
  return res.redirect('/all-accountant');
} else {
  req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
  res.redirect('/add-accountant');
       };
};
  
  
  /* ACCOUNTANT PROFILE SECTION */
exports.getaccountantprofile = (req, res, next) => {
  const accountId = req.params.doctorsId;
  Accountant.findOne({accountId})
    .then(accountants => {
      res.render('accountants/accountant-profile', {
        accountants: accountants,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/accountant-profile',
        pageTitle: ':: Hospital Accountants :: Profile',
      });
    });    
};

  /* EDIT ACCOUNTANT SECTION */
exports.getEditaccountant = (req, res, next) => {
  const accountId = req.params.accountantsId;
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Accountant.findOne({accountId})
    .then(accountants => {
      res.render('accountants/edit-accountant', {
        accountants: accountants,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/edit-accountant',
        pageTitle: ':: Hospital Accountants ::Editing Profile',
        errorMessage: message,
      });
    })    
};

exports.postEditaccountant = async (req, res, next) => {
  const accountantsId = req.body.accountantsId
  const Updatefirstname = req.body.firstname;
  const Updatelastname = req.body.lastname;
  const Updatemiddlename = req.body.middlename;
  const Updateusername = req.body.username;
  const Updatepassword = req.body.password;
  const Updatecomfirmpassword = req.body.comfirmpassword;
  const Updatedateofbirth = req.body.dateofbirth;
  const Updategender = req.body.gender;
  const Updatejob_post = req.body.job_post;
  const Updatephone = req.body.phone;
  const Updateemail = req.body.email;
  const Updateaddress = req.body.address;
  const Updateprofileimage = req.file;
  const Updateremarks = req.body.remarks;
  const Updateabout = req.body.about;
  const UpdateHospitalAffiliations = req.body.HospitalAffiliations;
  const UpdateAccountingSchool = req.body.AccountingSchool;
  const UpdateResidency = req.body.Residency;
  const UpdateCertifications = req.body.Certifications;
  const UpdateExperienceOrTranining = req.body.ExperienceOrTranining;
  const UpdateInternship = req.body.Internship;
  const Updatespecialities = req.body.specialities;

  if (Updatepassword !== Updatecomfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/all-accountant');
  };

  if (!Updateprofileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/all-accountant');
  };

  const UpdateimageUrl = Updateprofileimage.path;

  const UpdatehashedPassword = await bcrypt.hash(Updatepassword, 12);

  await Accountant.findOne({accountantsId}).then(accountant => {
    accountant.firstname = Updatefirstname;
    accountant.lastname = Updatelastname;
    accountant.middlename = Updatemiddlename;
    accountant.username = Updateusername;
    accountant.password = UpdatehashedPassword;
    accountant.dateofbirth = Updatedateofbirth;
    accountant.gender = Updategender;
    accountant.job_post = Updatejob_post;
    accountant.phone = Updatephone;
    accountant.email = Updateemail;
    accountant.address = Updateaddress;
    accountant.imageUrl = UpdateimageUrl;
    accountant.remarks = Updateremarks;
    accountant.about = Updateabout;
    accountant.HospitalAffiliations = UpdateHospitalAffiliations;
    accountant.AccountingSchool = UpdateAccountingSchool;
    accountant.Residency = UpdateResidency;
    accountant.Certifications = UpdateCertifications;
    accountant.ExperienceOrTranining = UpdateExperienceOrTranining;
    accountant.Internship = UpdateInternship;
    accountant.specialities = Updatespecialities;
    return accountant.save();
  }).then(
    req.flash('success','Successfully Edited'),    
    res.redirect('/all-accountant'),
    )
};



  /* DELETE ACCOUNTANT SECTION */
exports.postDeleteaccountant = (req, res, next) => {
  const accountId = req.body.accountantsId;
  Accountant.findOne({accountId})
    .then(accountants => {
      return accountants.destroy();
    })
    .then(
      console.log('DESTROYED PRODUCT'),
      res.redirect('/all-accountant')
    )
    .catch(err => console.log(err));
};