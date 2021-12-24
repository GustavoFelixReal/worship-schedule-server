import ChurchController from '../controllers/ChurchController';
import UserController from '../controllers/UserController';
import ScheduleController from '../controllers/ScheduleController';

import express from 'express';
import cors from 'cors';

const passport = require('passport');
const router = express.Router();
// const corsOptions = {
//   origin: '*'
// };

router.get("/", (req, res) => {
  res.status(200).json({ response: "I am alive!" });
});

router.post('/login', passport.authenticate('local', {
  failureFlash: true
}));

/** Churches **/
router.get('/churches', ChurchController.index);
router.post('/churches', ChurchController.store);


/** Users **/
router.get('/churches/:churchId/users', UserController.index);
router.get('/churches/:churchId/users/:userId', UserController.find);
router.post('/churches/:churchId/users', UserController.store);

/** Schedules **/
router.get('/churches/:churchId/schedules/:scheduleId', ScheduleController.find)

module.exports = router;