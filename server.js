//! 1. opzetten van de webserver

// Importeer het npm pakket express uit de node_modules map
import express from "express";
// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Stel het basis endpoint in
const apiUrl = "https://fdnd.directus.app/items";

// Haal alle squads uit de WHOIS API op
const squadData = await fetchJson(apiUrl + "/squad");

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");
// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources (stylehseets css, assets, etc)
app.use(express.static("public"));

//zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

//! 2. Routes die HTTP Requests and Responses afhandelen
// Maak een GET route voor de index
app.get("/", function (request, response) {
  // Haal alle personen uit de WHOIS API op
  fetchJson(apiUrl + "/person").then((apiData) => {
    response.render("index", {
      persons: apiData.data,
      squads: squadData.data,
    });
  });
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/person/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(apiUrl + "/person/" + request.params.id).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render("person", { person: apiData.data, squads: squadData.data });
  });
});

// message board functionaliteit
//array messages
const messages = [];
const names = [];

app.post("/", function (request, response) {
  messages.push(request.body.message);
  names.push(request.body.name);
  response.redirect(303, "/");
});

// Maak een GET route voor een detailpagina met een request parameter id
app.get("/squad/:id", function (request, response) {
  let squadId = request.params.id;
  let fetchUrl;
  if (squadId == 3) {
    fetchUrl = 'https://fdnd.directus.app/items/person/?filter={"squad_id":3}';
  } else if (squadId == 4) {
    fetchUrl = 'https://fdnd.directus.app/items/person/?filter={"squad_id":4}';
  } else if (squadId == 5) {
    fetchUrl = 'https://fdnd.directus.app/items/person/?filter={"squad_id":5}';
  }

  fetchJson(fetchUrl).then((apiData) => {
    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    response.render("index", {
      persons: apiData.data,
      squads: squadData.data,
      messages: messages,
      names: names,
    });
  });
});

//! 3. Start de webserver
// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
