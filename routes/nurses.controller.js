const Nurse = require('../models/nurses');
const bcrypt = require('bcryptjs');


/* ALL NURSES SECTION */
exports.getAllnurse = (req, res, next) => {
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  Nurse.findAll().then((nurses) => {
    res.render('nurses/all-nurse', {
      docs: nurses,
      lastname: req.admin.lastname,
      phone: req.admin.phone,
      email: req.admin.email,
      address: req.admin.address,
      path: '/all-nurse',
      pageTitle: ':: Hospital :: All Nurses',
      successMessage: messages,
    });
  });
};

/* ADD NURSES SECTION */
exports.getAddnurse = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('nurses/add-nurse', {
    path: '/add-nurse',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Add Nurses',
    errorMessage: message,
  });
};

exports.postAddnurse = async (req, res, next) => {
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
  const NursingSchool = req.body.NursingSchool;
  const Residency = req.body.Residency;
  const Certifications = req.body.Certifications;
  const ExperienceOrTranining = req.body.ExperienceOrTranining;
  const Internship = req.body.Internship;
  const specialities = req.body.specialities;

  if (password !== comfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/add-nurse');
  };

  if (!profileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/add-nurse');
  };

  const imageUrl = profileimage.path;

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Nurse.findOrCreate({
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
      NursingSchool: NursingSchool,
      Residency: Residency,
      Certifications: Certifications,
      ExperienceOrTranining: ExperienceOrTranining,
      Internship: Internship,
      specialities: specialities,
    }
  });

  if (user!==true && created!==false) {
    req.flash('success','You have Successfully Created');
    return res.redirect('/all-nurse');
  } else {
    req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
    return res.redirect('/add-nurse');
  };
};
  
  
  /* NURSES PROFILE SECTION */
exports.getNurseprofile = (req, res, next) => {
  const NursesId = req.params.nursesId;
  Nurse.findOne({NursesId})
    .then(nurses => {
      res.render('nurses/nurse-profile', {
        nurses: nurses,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/nurse-profile',
        pageTitle: ':: Hospital Admin :: Profile',
      });
    })
    
};

  /* EDIT NURSES SECTION */
exports.getEditnurse = (req, res, next) => {
  const NursesId = req.params.nursesId;
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Nurse.findOne({NursesId})
    .then(nurses => {
      res.render('nurses/edit-nurse', {
        nurses: nurses,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/edit-nurse',
        pageTitle: ':: Hospital Admin ::Editing Profile',
        errorMessage: message,
      });
    })    
};

exports.postEditnurse = async (req, res, next) => {
  const nursesId = req.body.nursesId;
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
    return res.redirect('/all-nurse');
  };

  if (!Updateprofileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/all-nurse');
  };

  const UpdateimageUrl = Updateprofileimage.path;

  const UpdatehashedPassword = await bcrypt.hash(Updatepassword, 12);

  await Nurse.findOne({nursesId}).then(nurse => {
  nurse.firstname = Updatefirstname;
  nurse.lastname = Updatelastname;
  nurse.middlename = Updatemiddlename;
  nurse.username = Updateusername;
  nurse.password = UpdatehashedPassword;
  nurse.dateofbirth = Updatedateofbirth;
  nurse.gender = Updategender;
  nurse.job_post = Updatejob_post;
  nurse.phone = Updatephone;
  nurse.email = Updateemail;
  nurse.address = Updateaddress;
  nurse.imageUrl = UpdateimageUrl;
  nurse.remarks = Updateremarks;
  nurse.about = Updateabout;
  nurse.HospitalAffiliations = UpdateHospitalAffiliations;
  nurse.AccountingSchool = UpdateAccountingSchool;
  nurse.Residency = UpdateResidency;
  nurse.Certifications = UpdateCertifications;
  nurse.ExperienceOrTranining = UpdateExperienceOrTranining;
  nurse.Internship = UpdateInternship;
  nurse.specialities = Updatespecialities;
    return nurse.save();
  }).then(
    req.flash('success','Successfully Edited'),    
    res.redirect('/all-nurse'),
    );
};



  /* DELETE NURSES SECTION */
exports.postDeleteNurse = (req, res, next) => {
  const NursesId = req.body.nursesId;
  Nurse.findOne({NursesId})
    .then(nurses => {
      return nurses.destroy();
    })
    .then(
      console.log('DESTROYED PRODUCT'),
      res.redirect('/all-nurse')
    )
    .catch(err => console.log(err));
};