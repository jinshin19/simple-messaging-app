import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.SIMPLE_MESSAGING_APP_GOOGLE_CONSOLE_CLIENT_ID ?? "",
      clientSecret:
        process.env.SIMPLE_MESSAGING_APP_GOOGLE_CONSOLE_SECRET ?? "",
      callbackURL: process.env.SIMPLE_MESSAGING_APP_SSO_GOOGLE_CALLBACK,
    },
    (_1, _2, profile, done) => {
      return done(null, profile);
    }
  )
);
