const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./model/database'); // Adjust the path to your database file

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (res.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const user = res.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  // console.log('Serializing user:', user); // Debugging line
  done(null, user.id_user); // Ensure this matches your user ID field
});

passport.deserializeUser(async (id, done) => {
  // console.log('Deserializing user with ID:', id); // Debugging line
  try {
    const res = await pool.query('SELECT * FROM users WHERE id_user = $1', [id]);
    if (res.rows.length === 0) {
      return done(new Error('User not found'));
    }
    done(null, res.rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;