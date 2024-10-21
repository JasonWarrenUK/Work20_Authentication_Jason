import express from "express";
import cookieParser from "cookie-parser";
import { runAll } from "./hash/bcrypt.js";

const app = express();

app.listen(3000, () => { /* confirm online */
	console.log("Server is running on port 3000");
});

app.use(cookieParser());

app.get("/", (req, res) => { /* runAll() */
	runAll().catch(console.error);
})