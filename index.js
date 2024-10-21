import express from "express";
import cookieParser from "cookie-parser";
import { runAll } from "./src/auth.js";

const app = express();

app.listen(3000, () => { /* confirm online */
	console.log("Server is running on port 3000");
});

// Pass a secret string to the cookie parser
app.use(cookieParser(`secret-string`));

app.get("/", (req, res) => { /* runAll() */
	runAll().catch(console.error);
})

// How the fuck does this work?
response.cookie("hello", "world", {
  signed: true,
  httpOnly: true,
  maxAge: 6000,
  sameSite: "lax",
});