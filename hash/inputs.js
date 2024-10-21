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

export { plain, userInput, users };