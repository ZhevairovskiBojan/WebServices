const express = require("express");
const db = require("./pkb/db/index");

const moviesHandler = require("./handlers/moviesHandler");

const app = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.init();

app.get("/api/movies", moviesHandler.getAllMovies);
app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies/:id", moviesHandler.getMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie)

app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log("Fail to start the service.");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});