const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const logger = require('./logger')

function output(level, message) {
  logger.log({
    //method: req.method,
    //path: req.path,
    level: level,
    //parameters: req.params,
    //body: req.body,
    message: message,
    timestamp: Date.now()
  })

}

const initializePassport = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
      const user = await getUserByEmail(email);
      if (user == null) {
        output( 'error', 'No user with that email')
        return done(null, false, { message: 'No user with that email' });
      }
  
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          output('error', 'Password incorrect')
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (e) {
        return done(e);
      }
    };
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      const user = await getUserById(id);
      return done(null, user);
    });
  };
  

module.exports = initializePassport
