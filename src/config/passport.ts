import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

export function initializePassport(passport, getUserByUserName) {
  const authenticate = async (userName, password, done) => {
    const user = await getUserByUserName(userName);

    console.log(password, user.password);

    if (!user) {
      return done(null, false, { message: 'No user found' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Password or username mismatch' });
    } catch (error) {
      done(error);
    }
  }

  passport.use(new Strategy({ usernameField: 'userName', passwordField: 'password' }, authenticate));
  passport.serializeUser((user, done) => { })
  passport.deserializeUser((id, done) => { })
}