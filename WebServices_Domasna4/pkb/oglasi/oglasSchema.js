const mongoose = require("mongoose");

// Blueprint
const oglasSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["avtomobili", "velosipedi", "nedviznini", "telefoni"],
        required: [true, "Vnesete kategorija."],
    },
    title: {
        type: String,
        required: [true, "Vnesete naslov."],
    },
    description: {
        type: String,
        required: [true, "Vnesete opis"],
    },
    price: {
        type: Number,
        required: [true, "Vnesete cena."]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
});


const Oglas = mongoose.model("Oglas", oglasSchema);
module.exports = Oglas;