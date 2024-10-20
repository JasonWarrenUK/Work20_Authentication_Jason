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
	const output = await userOutput(user);
	console.group(`=== ${output.userName} ===`);
	console.log(`Pass Text: ${output.passText}`);
	console.log(`Pass Hash: ${output.passHash}`);
	console.groupEnd();
}

async function logUserAll() {
	console.group("=== User Log ===");
	for (const user in users) {
		await logUser(user);
	}
	console.groupEnd();
}

logUserAll()
	.catch(console.error);
