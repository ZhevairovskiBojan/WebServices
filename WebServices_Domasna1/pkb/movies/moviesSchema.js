const mongoose = require("mongoose");

//? ZA DOMASNA DA SE ZAVRSHI WEB SERVSIOT
//? SHEMATA DA SE SOSTOI OD: NASLOV, Godina, imdbRating, metascore
//? Da se krera CRUD - CREATE- READ - UPDATE - DELETE
//? baza na rutata da e /api/movies
//? Da se stavat 10 filma preku postman so koristenje na raw jason format

//* Kreirame blueprint za nasata databaza
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a title"],
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 3,
    },
    metascore: {
        type: Number,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;