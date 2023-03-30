const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const csrf = require('csurf');
const flash = require('connect-flash');
const Admin = require('./models/admin');
const multer = require('multer');

const app = express();
const myStore = new SequelizeStore({
  db: sequelize,
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.router');
const authRoutes = require('./routes/auth.router');
const accountantRoutes = require('./routes/accountant.router');
const doctorsRoutes = require('./routes/doctors.router');
const labscientists = require('./routes/labscientists.router');
const nursesRoutes = require('./routes/nurses.router');
const receptionistRoutes = require('./routes/receptionist.router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single(
    'profileimage'
  )
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: myStore,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  } else {
    Admin.findOne({
      id: req.session.admin.id,
    })
      .then((admin) => {
        req.admin = admin;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(accountantRoutes);
app.use(doctorsRoutes);
app.use(labscientists);
app.use(nursesRoutes);
app.use(receptionistRoutes);

sequelize.sync();
myStore.sync();

module.exports = app;
