const Doctor = require('../models/doctors');
const bcrypt = require('bcryptjs');


/* ALL DOCTORS SECTION */
exports.getAlldoctor = (req, res, next) => {
  var messages = req.flash('success');
  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }
  Doctor.findAll().then((doctors) => {
    res.render('doctors/all-doctor', {
      docs: doctors,
      path: '/all-doctor',
      lastname: req.admin.lastname,
      phone: req.admin.phone,
      email: req.admin.email,
      address: req.admin.address,
      pageTitle: ':: Hospital :: All Doctors',
      successMessage: messages,
    });
  });
};

/* ADD DOCTORS SECTION */
exports.getAdddoctor = (req, res, next) => {
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('doctors/add-doctor', {
    path: '/add-doctor',
    lastname: req.admin.lastname,
    phone: req.admin.phone,
    email: req.admin.email,
    address: req.admin.address,
    pageTitle: ':: Hospital :: Add Doctors',
    errorMessage: message,
  });
};

exports.postAdddoctor = async (req, res, next) => {
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
    return res.redirect('/add-doctor');
  };

  if (!profileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/add-doctor');
  };

  const imageUrl = profileimage.path;

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user, created] = await Doctor.findOrCreate({
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
  req.flash('success','Successfully Created');
  return res.redirect('/all-doctor');
} else {
  req.flash('error','E-Mail or User-Name exists already, please pick a different one.');
  return res.redirect('/add-doctor');
  };
};
  
  
  /* DOCTORS PROFILE SECTION */
exports.getDoctorprofile = (req, res, next) => {
  const docsId = req.params.doctorsId;
  Doctor.findOne({docsId})
    .then(doctors => {
      res.render('doctors/doctor-profile', {
        doctors: doctors,
        path: '/doctor-profile',
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        pageTitle: ':: Hospital Admin :: Profile',
      });
    })
    
};

  /* EDIT DOCTORS SECTION */
exports.getEditdoctor = (req, res, next) => {
  const docsId = req.params.doctorsId;
  var message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  Doctor.findOne({docsId})
    .then(doctors => {
      res.render('doctors/edit-doctor', {
        doctors: doctors,
        path: '/edit-doctor',
        lastname: req.admin.lastname,
        phone: req.admin.phone,
        email: req.admin.email,
        address: req.admin.address,
        pageTitle: ':: Hospital Admin ::Editing Profile',
        errorMessage: message,
      });
    })    
};


exports.postEditdoctor = async (req, res, next) => {
  const doctorsId = req.body.doctorsId;
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
    return res.redirect('/all-doctor');
  };

  if (!Updateprofileimage) {
    req.flash('error','Attached file is not an image.');
    return res.redirect('/all-doctor');
  };

  const UpdateimageUrl = Updateprofileimage.path;

  const UpdatehashedPassword = await bcrypt.hash(Updatepassword, 12);

  await Doctor.findOne({doctorsId}).then(doctor => {
    doctor.firstname = Updatefirstname;
    doctor.lastname = Updatelastname;
    doctor.middlename = Updatemiddlename;
    doctor.username = Updateusername;
    doctor.password = UpdatehashedPassword;
    doctor.dateofbirth = Updatedateofbirth;
    doctor.gender = Updategender;
    doctor.job_post = Updatejob_post;
    doctor.phone = Updatephone;
    doctor.email = Updateemail;
    doctor.address = Updateaddress;
    doctor.imageUrl = UpdateimageUrl;
    doctor.remarks = Updateremarks;
    doctor.about = Updateabout;
    doctor.HospitalAffiliations = UpdateHospitalAffiliations;
    doctor.AccountingSchool = UpdateAccountingSchool;
    doctor.Residency = UpdateResidency;
    doctor.Certifications = UpdateCertifications;
    doctor.ExperienceOrTranining = UpdateExperienceOrTranining;
    doctor.Internship = UpdateInternship;
    doctor.specialities = Updatespecialities;
    return doctor.save();
  }).then(
    req.flash('success','Successfully Edited'),    
    res.redirect('/all-doctor'),
    );
};






  /* DELETE DOCTORS SECTION */
exports.postDeleteDoctor = (req, res, next) => {
  const docsId = req.body.doctorsId;
  Doctor.findOne({docsId})
    .then(doctors => {
      return doctors.destroy();
    })
    .then(
      console.log('DESTROYED PRODUCT'),
      res.redirect('/all-doctor')
    )
    .catch(err => console.log(err));
};