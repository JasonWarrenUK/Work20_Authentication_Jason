import cookieParser from "cookie-parser";

// Pass a secret string to the cookie parser
app.use(cookieParser(`secret-string`));

// How the fuck does this work?
response.cookie("hello", "world", {
  signed: true,
  httpOnly: true,
  maxAge: 6000,
  sameSite: "lax",
});