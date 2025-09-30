require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./routes/index');
const moviesRouter = require('./routes/moviesRouter');
const reviewsRouter = require('./routes/reviewRouter');
const cors = require('cors');
const connectDB = require('./DB/connection');
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  // Init passport on every route
  .use(passport.initialize())
  .use(passport.session());

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {
    // Example: You could look up a user in DB here
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // return done(err, user);
    // });

    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {+
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs'
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.use(express.json());
app.use(cors());

//Routes
app.use('/', route);

app.use((req, res, next) => {
  res.status(404).json({ message: "Sorry, we couldn't find that resource." });
});

//Error handler
app.use((err,req,res,next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({ message: err.message || "oh no! Something went wrong on the server."});
});

const port = process.env.PORT || 5500

connectDB()
app.listen(port, ()=> {
    console.log(`connected with port ${port}`)
})