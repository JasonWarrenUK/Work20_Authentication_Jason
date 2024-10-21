import bcrypt from "bcryptjs";
import { plain, userInput, users } from "./inputs.js";

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
	console.log();
	await testHashAll();
}

runAll().catch(console.error);

export { runAll };