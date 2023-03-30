const Receptionist = require('../models/receptionist');
const bcrypt = require('bcryptjs');


/* ALL DOCTORS SECTION */
exports.getAllreceptionist = (req, res, next) => {
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  Receptionist.findAll().then((receptionists) => {
    res.render('receptionists/all-receptionist', {
      docs: receptionists,
      lastname: req.admin.lastname,
      phone: req.admin.phone,
      email: req.admin.email,
      address: req.admin.address,
      path: '/all-receptionist',
      pageTitle: ':: Hospital :: All Receptionists',
      successMessage: messages,
    });
  });
};

/* ADD DOCTORS SECTION */
exports.getAddreceptionist = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('receptionists/add-receptionist', {
    path: '/add-receptionist',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Add Receptionists',
    errorMessage: message,
  });
};

exports.postAddreceptionist = async (req, res, next) => {
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
  const ReceptionSchool = req.body.ReceptionSchool;
  const Residency = req.body.Residency;
  const Certifications = req.body.Certifications;
  const ExperienceOrTranining = req.body.ExperienceOrTranining;
  const Internship = req.body.Internship;
  const specialities = req.body.specialities;

  if (password !== comfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/add-receptionist');
  };

  if (!profileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/add-receptionist');
  };

  const imageUrl = profileimage.path;

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Receptionist.findOrCreate({
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
      ReceptionSchool: ReceptionSchool,
      Residency: Residency,
      Certifications: Certifications,
      ExperienceOrTranining: ExperienceOrTranining,
      Internship: Internship,
      specialities: specialities,
    }
  });

  if (user!==true && created!==false) {
    req.flash('success','You have Successfully Created');
    return res.redirect('/all-receptionist');
  } else {
    req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
    return res.redirect('/add-receptionist');
  };
};
  
  
  /* DOCTORS PROFILE SECTION */
exports.getReceptionistprofile = (req, res, next) => {
  const docsId = req.params.receptionistsId;
  Receptionist.findOne({docsId})
    .then(receptionists => {
      res.render('receptionists/receptionist-profile', {
        receptionists: receptionists,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/receptionist-profile',
        pageTitle: ':: Hospital Receptionist :: Profile',
      });
    })
    
};

  /* EDIT DOCTORS SECTION */
exports.getEditreceptionist = (req, res, next) => {
  const docsId = req.params.receptionistsId;
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Receptionist.findOne({docsId})
    .then(receptionists => {
      res.render('receptionists/edit-receptionist', {
        receptionists: receptionists,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/edit-receptionist',
        pageTitle: ':: Hospital Receptionist ::Editing Profile',
        errorMessage: message,
      });
    })    
};

exports.postEditreceptionist = async (req, res, next) => {
  const receptionistsId = req.body.receptionistsId;
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
    return res.redirect('/all-receptionist');
  };

  if (!Updateprofileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/all-receptionist');
  };

  const UpdateimageUrl = Updateprofileimage.path;

  const UpdatehashedPassword = await bcrypt.hash(Updatepassword, 12);

  await Receptionist.findOne({receptionistsId}).then(receptionist => {
  receptionist.firstname = Updatefirstname;
  receptionist.lastname = Updatelastname;
  receptionist.middlename = Updatemiddlename;
  receptionist.username = Updateusername;
  receptionist.password = UpdatehashedPassword;
  receptionist.dateofbirth = Updatedateofbirth;
  receptionist.gender = Updategender;
  receptionist.job_post = Updatejob_post;
  receptionist.phone = Updatephone;
  receptionist.email = Updateemail;
  receptionist.address = Updateaddress;
  receptionist.imageUrl = UpdateimageUrl;
  receptionist.remarks = Updateremarks;
  receptionist.about = Updateabout;
  receptionist.HospitalAffiliations = UpdateHospitalAffiliations;
  receptionist.AccountingSchool = UpdateAccountingSchool;
  receptionist.Residency = UpdateResidency;
  receptionist.Certifications = UpdateCertifications;
  receptionist.ExperienceOrTranining = UpdateExperienceOrTranining;
  receptionist.Internship = UpdateInternship;
  receptionist.specialities = Updatespecialities;
  return receptionist.save();
  }).then(
    req.flash('success','Successfully Edited'),    
    res.redirect('/all-receptionist'),
    );
};


  /* DELETE DOCTORS SECTION */
exports.postDeleteReceptionist = (req, res, next) => {
  const docsId = req.body.receptionistsId;
  Receptionist.findOne({docsId})
    .then(receptionists => {
      return receptionists.destroy();
    })
    .then(
      console.log('DESTROYED PRODUCT'),
      res.redirect('/all-receptionist')
    )
    .catch(err => console.log(err));
};