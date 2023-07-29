//DOMASNA BROJ 4, WEB SERVICES:

//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS KAKO REKLAMA 5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logiranje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMAAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKEKCIITE

//? ZA DOMASNA DA SE IMMPLEMENTIRA OGLASI, da moze sekoj korisnik da si kreira sopstveni oglasi
//? isto taka sekoj korisnik da moze da gi vidi samo sopstvenite oglasi
//? bonus: se sto imame uceno implementirajte


// povikuvanje na moduli, potrebni za nasata aplikacija
const express = require("express");
const db = require("./pkb/db/index");
const jwt = require("express-jwt"); // jwt zastita za nenajaveni korisnici
const cookieParser = require("cookie-parser");

// gi povikuvame hendlerite
const oglasiHandler = require("./handlers/oglasiHandler");
const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

// vrsime inicijalizacija na aplikacjata
const app = express();

//povikuvame middlewares
app.set("view engine", "ejs"); //applikacijata da koristi ejs
app.use(express.json()); //persiranje na podatoci
app.use(express.urlencoded({extended: true})); //parsiranje na baranje
app.use(express.static("public"));// go oznacuvame direktoriumot
app.use(cookieParser());// gi obrabotuva i parsira kolacinjata koi se prakaat od klientot do serverot

// fukcija db.init so koja se povrzuvame so data bazata
db.init();

app.use(jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      if (req.cookies.jwt) {
        return req.cookies.jwt;
      }
      return null; // vo slucaj ako nemame isprateno token
    },
    })
    .unless({
        path: ["/api/v1/signup", "/api/v1/login", "/api/oglasi", "/login"]
    })
);

app.post("/api/v1/signup", authHandler.signUp);
app.post("/api/v1/login", authHandler.logIn);

app.get("/api/oglasi", oglasiHandler.siteOglasi);
app.post("/api/oglasi", oglasiHandler.kreirajOglas);
app.get("/api/oglasi/:id", oglasiHandler.edenOglas);
app.patch("/api/oglasi/:id", oglasiHandler.promeniOglas);
app.delete("/api/oglasi/:id", oglasiHandler.izbrisiOglas);

//Licni oglasi
app.get("/moioglasi", oglasiHandler.siteMoiOglasi);
app.post("/moioglasi", oglasiHandler.kreirajMojOglas);

// View ruti
app.get("/login", viewHandler.getLoginForm);
app.get("/siteoglasi", viewHandler.pregledOglasi);
app.post("/kreirajoglas", viewHandler.kreiranjeOglas);

// Slusame app
app.listen(process.env.PORT, (err) => {
    if(err){
        return console.log("Couldn't start the service.");
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
})