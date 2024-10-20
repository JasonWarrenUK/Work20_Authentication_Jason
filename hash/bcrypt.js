const bcrypt = require("bcryptjs");

const plain = {
	pass: {
		user1: "password1",
		user2: "password2",
	},
	salt: {
		user1: "salt1",
		user2: "salt2",
	}
}

function userInput(user) {
	return {
		userName: user,
		password: plain.pass[user],
		salt: plain.salt[user],
	};
}

const users = {
	user1: userInput("user1"),
	user2: userInput("user2"),
}

async function hash(text) {
	return await bcrypt.hash(text, 12);
}

async function userOutput(user) {
	return {
		userName: users[user].userName,
		passText: users[user].password,
		passHash: await hash(users[user].password),
	}
}

async function logUser(user) {
	const details = await userOutput(user);
	console.group(`=== ${details.userName} ===`);
	console.log(`Pass Text: ${details.passText}`);
	console.log(`Pass Hash: ${details.passHash}`);
	console.groupEnd();
}

async function logUserAll() {
	console.group("=== User Log ===");
	for (const user in users) {
		await logUser(user);
	}
	console.groupEnd();
}

async function testHash(user) {
	const details = await userOutput(user);
	console.group(`=== ${details.userName} ===`);
	const hash = await bcrypt.hash(details.passText, 12);
	const correctResult = await bcrypt.compare(details.passText, hash);
	const incorrectResult = await bcrypt.compare("incorrect", hash);
	console.log(`${details.passText}: ${correctResult}`);
	console.log(`derp: ${incorrectResult}`);
	console.groupEnd();
}

async function testHashAll() {	
	console.group("=== Test Hash ===");
	for (const user in users) {
		await testHash(user);
	}
	console.groupEnd();
}

async function runAll() {
	await logUserAll();
	console.log(); // Add a blank line for separation
	await testHashAll();
}

runAll().catch(console.error);
