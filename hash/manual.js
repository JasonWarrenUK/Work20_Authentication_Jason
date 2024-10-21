const crypto = require("node:crypto");
import { plain, userInput, users } from "./inputs.js";

function hash(text) {
	return crypto.createHash("sha256").update(text).digest("hex")
}

function userOutput(user) {
	return {
		userName: users[user].userName,
		passText: users[user].password,
		saltText: users[user].salt,
		mixText: users[user].password + users[user].salt,
		passHash: hash(users[user].password),
		saltHash: hash(users[user].salt),
		mixHash: hash(users[user].password + users[user].salt),
	}
}

function userLog(user) {
	console.group(`=== ${userOutput(user).userName} ===`);
		console.log(`Pass Text: ${userOutput(user).passText}`);
		console.log(`Pass Hash: ${userOutput(user).passHash}`);
		console.log(`Salt Text: ${userOutput(user).saltText}`);
		console.log(`Mix Hash: ${userOutput(user).mixHash}`);
	console.groupEnd();
	return;
}

console.group("=== Salt Hash ===");
	userLog("user1");
	userLog("user2");
console.groupEnd();
