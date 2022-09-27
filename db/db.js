const Sequelize = require("sequelize");
const DB_URL =
	process.env.DB_URL || "postgres://localhost:5432/acme_people_places_things";
const db = new Sequelize(DB_URL);

const data = {
	people: ["moe", "larry", "lucy", "ethyl"],
	places: ["paris", "nyc", "chicago", "london"],
	things: ["hat", "bag", "shirt", "cup"],
};

//const seedDB = async () => {};

const People = db.define("people", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		notEmpty: true,
		// validate: {
		// 	notNull: {
		// 		msg: "Please enter a valid name.",
		// 	},
		// 	if (unique: false) {

		// 			msg: "That name is taken; please try another."
		// 	}
		// },
	},
});
const Places = db.define("places", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		notEmpty: true,
		// validate: {
		// 	notNull: {
		// 		msg: "Please enter a valid name.",
		// 	},
		// 	unique: false {
		// 		msg: "That name is taken; please try another.",
		// 	},
		// },
	},
});
const Things = db.define("things", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		notEmpty: true,
		// validate: {
		// 	notNull: {
		// 		msg: "Please enter a valid name.",
		// 	},
		// 	unique: false{
		// 		msg: "That name is taken; please try another.",
		// 	},
		// },
	},
});

const Souvenir = db.define("souvenir", {});

People.hasMany(Things);
People.hasMany(Places);
Places.hasMany(Things);
Things.belongsTo(Places);
Things.belongsTo(People);
Souvenir.belongsTo(Things);
Souvenir.belongsTo(People);
Souvenir.belongsTo(Places);

async function createPerson(...newName) {
	await People.create({
		name: newName,
	});
}
async function createPlace(...newPlace) {
	await Place.create({
		name: newPlace,
	});
}
async function createThing(...newthing) {
	await Thing.create({
		name: newthing,
	});
}

async function syncAndSeed() {
	await People.sync({ force: true });
	await Place.sync({ force: true });
	await Thing.sync({ force: true });

	const data = {
		people: ["moe", "larry", "lucy", "ethyl"],
		places: ["paris", "nyc", "chicago", "london"],
		things: ["hat", "bag", "shirt", "cup"],
	};

	await createPerson(data.people);
	await createPlace(data.places);
	await createThing(data.things);
}

// async function createPerson(...newName) {
// 	await People.create({
// 		name: newName,
// 	});
// }

// const syncAndSeed = async () => {
// 	await db.sync({ force: true, logging: false });

//   "moe", "larry", "lucy", "ethyl"
// 	createPerson(...People);
// 	await People.create({});
// };

module.exports = {
	db,
	syncAndSeed,
	People,
	Things,
	Places,
};
