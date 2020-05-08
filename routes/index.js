const express = require('express');
const fileupload = require('express-fileupload');

const router = express.Router();
const passport = require('passport');
const Books = require('../models/books');
const upload = require('../models/pdfilesgrid');
const Requestbook = require('../models/requestbook');

// static
router.use(express.static('public'));
router.use(fileupload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// index
router.get('/', (req, res, done) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      Requestbook.find({}, (err, data) => {
        res.render('admin-index', {
          login: req.user,
          requestbook: data,
        });
      });
      return done;
    }
    return res.render('index', { login: req.user });
  }
  return res.redirect('/users/login');
});

router.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  (req, res, done) => {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      Requestbook.find({}, (err, data) => {
        res.render('admin-index', {
          login: req.user,
          requestbook: data,
        });
      });
      return done;
    }
    return res.render('index', { login: req.user });
  }
);

// download books
router.get('/download-books', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      return res.render('download', { login: req.user, user: 'admin' });
    }
    return res.render('download', { login: req.user, user: 'regular' });
  }
  return res.redirect('/users/login');
});

// branch
router.get('/branch', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      return res.render('branch', { login: req.user, user: 'admin' });
    }
    return res.render('branch', { login: req.user, user: 'regular' });
  }
  return res.redirect('/users/login');
});

// semester
router.get('/semester', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      return res.render('semesters', { login: req.user, user: 'admin' });
    }
    return res.render('semesters', { login: req.user, user: 'regular' });
  }
  return res.redirect('/users/login');
});

// authors
router.get('/author', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      return res.render('authors', { login: req.user, user: 'admin' });
    }
    return res.render('authors', { login: req.user, user: 'regular' });
  }
  return res.redirect('/users/login');
});

// admin upload books page
router.get('/upload-books', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      return res.render('admin-upload', { login: req.user, books: 'empty' });
    }
  }
  return res.redirect('/users/login');
});

// // uploading the books
// router.post('/upload-books', upload.single('hello'), async (req, res) => {
//   // eslint-disable-next-line new-cap
//   const book = new books({
//     bookname: req.body.bookname,
//     bookedition: req.body.bookedition,
//     year: new Date(req.body.year),
//     course: req.body.course,
//     author: req.body.author,
//     semester: req.body.semester,
//     // eslint-disable-next-line no-underscore-dangle
//     // pdffiles: req.files.hello.id,
//   });
//   await book.save();
//   // console.log(req.files.filepond.name);
//   return res.json({ file: req.files });
//   /* res.render('admin-upload', {
//       login: req.user,
//       books: 'full',
//       bookname: req.body.bookname,
//     }); */
// });

router.post('/upload-books', async (req, res) => {
  // validate => when upload file is not entered schema details should not be entered also
  // const book = new Books({
  //   bookname: req.body.bookname,
  //   bookedition: req.body.bookedition,
  //   year: new Date(req.body.year),
  //   course: req.body.course,
  //   author: req.body.author,
  //   semester: req.body.semester,
  // });
  // await book.save();
  console.log(`FIRST TEST: ${JSON.stringify(req.files)}`);
  console.log('done');
});

// filepond
router.post('/uploads', (req, res) => {
  // if (!(req.files && req.files.pdffiles)) {
  //   res.send('No files uploaded');
  // }
  // console.log(req.files.pdffiles);
  // const uploadFile = req.files.pdffiles;
  // const fileName = req.files.pdffiles.name;
  // uploadFile.mv(`../public/uploads/svs`);
  console.log(`FIRST TEST: ${JSON.stringify(req.files)}`);
  console.log(`second TEST: ${req.files.filepond.name}`);
  req.files.filepond.mv(`E:/Online-Textbooks/${req.files.filepond.name}`);
  res.send('done');
});

// remove book requests
router.get('/remove-books', (req, res, done) => {
  if (req.isAuthenticated()) {
    if (req.user.firstname === 'bmsce' && req.user.lastname === 'admin') {
      Requestbook.deleteOne({ _id: req.body.id }, (err, data) => {
        res.render('admin-index', {
          login: req.user,
          requestbook: data,
        });
        res.redirect('/');
      });
      return done;
    }
    return res.redirect('/');
  }
  return res.redirect('/users/login');
});
module.exports = router;
