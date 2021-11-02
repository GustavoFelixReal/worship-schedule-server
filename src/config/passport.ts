import bcrypt from 'bcrypt';

const LocalStrategy = require('passport-local').Strategy;

export function initializePassport(passport, getUserByUserName, getUserById) {
  const authenticate = async (userName, password, done) => {
    const user = await getUserByUserName(userName);

    if (user === null) {
      return done(null, false, { message: 'No user found' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Password or username mismatch' });
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'userName' }, authenticate));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id)); 
  });
}