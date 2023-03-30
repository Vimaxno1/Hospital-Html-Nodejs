const Labscientist = require('../models/labscientists');
const bcrypt = require('bcryptjs');


/* ALL LABSCIENTIST SECTION */
exports.getAlllabscientist = (req, res, next) => {
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  Labscientist.findAll().then((labscientists) => {
    res.render('labscientists/all-labscientist', {
      Labs: labscientists,
      lastname: req.admin.lastname,
      phone: req.admin.phone,
      email: req.admin.email,
      address: req.admin.address,
      path: '/all-labscientist',
      pageTitle: ':: Hospital :: All Lab Scientist',
      successMessage: messages,
    });
  });
};

/* ADD LABSCIENTIST SECTION */
exports.getAddlabscientist = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('labscientists/add-labscientist', {
    path: '/add-labscientist',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Add Lab Scientist',
    errorMessage: message,
  });
};

exports.postAddlabscientist = async (req, res, next) => {
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
  const MedicalSchool = req.body.MedicalSchool;
  const Residency = req.body.Residency;
  const Certifications = req.body.Certifications;
  const ExperienceOrTranining = req.body.ExperienceOrTranining;
  const Internship = req.body.Internship;
  const specialities = req.body.specialities;

  if (password !== comfirmpassword) {
    req.flash('error','Comfirm Password must Match.');
    return res.redirect('/add-labscientist');
  };

  if (!profileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/add-labscientist');
  };

  const imageUrl = profileimage.path;

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Labscientist.findOrCreate({
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
      MedicalSchool: MedicalSchool,
      Residency: Residency,
      Certifications: Certifications,
      ExperienceOrTranining: ExperienceOrTranining,
      Internship: Internship,
      specialities: specialities,
    }
  });

  if (user!==true && created!==false) {
    req.flash('success','You have Successfully Created');
    return res.redirect('/all-labscientist');
  } else {
    req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
    return res.redirect('/add-labscientist');
  };
};
  
  
  /* LABSCIENTIST PROFILE SECTION */
exports.getLabscientistprofile = (req, res, next) => {
  const LabsId = req.params.labscientistsId;
  Labscientist.findOne({LabsId})
    .then(labscientists => {
      res.render('labscientists/labscientist-profile', {
        labscientists: labscientists,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/labscientist-profile',
        pageTitle: ':: Hospital Lab scientist :: Profile',
      });
    })
    
};

  /* EDIT LABSCIENTIST SECTION */
exports.getEditlabscientist = (req, res, next) => {
  const LabsId = req.params.labscientistsId;
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Labscientist.findOne({LabsId})
    .then(labscientists => {
      res.render('labscientists/edit-labscientist', {
        labscientists: labscientists,
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        path: '/edit-labscientist',
        pageTitle: ':: Hospital Lab Scientist ::Editing Profile',
        errorMessage: message,
      });
    })    
};

exports.postEditlabscientist = async (req, res, next) => {
  const labscientistsId = req.body.labscientistsId;
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
    return res.redirect('/all-labscientist');
  };

  if (!Updateprofileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/all-labscientist');
  };

  const UpdateimageUrl = Updateprofileimage.path;

  const UpdatehashedPassword = await bcrypt.hash(Updatepassword, 12);

  await Labscientist.findOne({labscientistsId}).then(labscientists => {
  labscientists.firstname = Updatefirstname;
  labscientists.lastname = Updatelastname;
  labscientists.middlename = Updatemiddlename;
  labscientists.username = Updateusername;
  labscientists.password = UpdatehashedPassword;
  labscientists.dateofbirth = Updatedateofbirth;
  labscientists.gender = Updategender;
  labscientists.job_post = Updatejob_post;
  labscientists.phone = Updatephone;
  labscientists.email = Updateemail;
  labscientists.address = Updateaddress;
  labscientists.imageUrl = UpdateimageUrl;
  labscientists.remarks = Updateremarks;
  labscientists.about = Updateabout;
  labscientists.HospitalAffiliations = UpdateHospitalAffiliations;
  labscientists.AccountingSchool = UpdateAccountingSchool;
  labscientists.Residency = UpdateResidency;
  labscientists.Certifications = UpdateCertifications;
  labscientists.ExperienceOrTranining = UpdateExperienceOrTranining;
  labscientists.Internship = UpdateInternship;
  labscientists.specialities = Updatespecialities;
    return labscientists.save();
  }).then(
    req.flash('success','Successfully Edited'),    
    res.redirect('/all-labscientist'),
    );
};




  /* DELETE LABSCIENTIST SECTION */
exports.postDeleteLabscientist = (req, res, next) => {
  const LabsId = req.body.labscientistsId;
  Labscientist.findOne({LabsId})
    .then(labscientists => {
      return labscientists.destroy();
    })
    .then(
      console.log('DESTROYED PRODUCT'),
      res.redirect('/all-labscientist')
    )
    .catch(err => console.log(err));
};