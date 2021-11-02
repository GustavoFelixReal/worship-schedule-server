import ChurchController from '../controllers/ChurchController';
import UserController from '../controllers/UserController';

import express from 'express';
import cors from 'cors';

const passport = require('passport');
const router = express.Router();
// const corsOptions = {
//   origin: '*'
// };

router.get("/", (req, res) => {
  res.send({ response: "I am alive!" }).status(200);
});

router.post('/login', passport.authenticate('local', {
  failureFlash: true
}))

router.get('/churches', ChurchController.index);
router.post('/churches', ChurchController.store);

router.get('/churches/:churchId/users', UserController.index);
router.get('/churches/:churchId/users/:userId', UserController.find)
router.post('/churches/:churchId/users', UserController.store);

// router.post("/login", cors(), (req, res) => {

//   passport.use(new LocalStrategy((userName, password, done) => {
//     Users.findOne({ userName }, (error, user) => {
//       if (error) return done(error);

//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }

//       console.log(user);
//     });
//   }));
// });

module.exports = router;