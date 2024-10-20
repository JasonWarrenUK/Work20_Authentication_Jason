const crypto = require("node:crypto");

const password = {
	user1: "hunter1",
	user2: "hunter2",
}

const hashed = {
	user1: crypto.createHash("sha256").update(password.user1).digest("hex"),
	user2: crypto.createHash("sha256").update(password.user2).digest("hex")
}

console.log(`${password.user1}: ${hashed.user1}`);
console.log(`${password.user2}: ${hashed.user2}`);
