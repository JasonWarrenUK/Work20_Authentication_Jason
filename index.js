import express from "express";
// import {} from "./src/session.js";
import { runAll } from "./src/auth.js";

const app = express();

app.listen(3000, () => { /* confirm online */
	console.log("Server is running on port 3000");
});

app.get("/", (req, res) => { /* runAll() */
	runAll().catch(console.error);
})