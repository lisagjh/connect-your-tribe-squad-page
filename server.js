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

//! 2. Routes die HTTP Requests and Responses afhandelen
// Maak een GET route voor de index
app.get("/", function (request, response) {
  // Haal alle personen uit de WHOIS API op
  fetchJson(apiUrl + "/person").then((apiData) => {
    // ?filter[squad_id][_eq]=3 = squad D filter
    // ?filter[squad_id][_eq]=4 = squad E filter
    // ?filter[squad_id][_eq]=5 = squad F filter
    // ?sort=name = az sorteer
    // apiData bevat gegevens van alle personen uit alle squads
    // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

    // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
    response.render("index", { persons: apiData.data, squads: squadData.data });
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

// Maak een GET route voor de find/filter dingen
app.get("/filter/:q", function (request, response) {
  /*
  filter voorbeeld
  https://fdnd.directus.app/items/person/?filter={"name":"Koop"}
  https://fdnd.directus.app/items/person/?filter={"name":{"_contains":"oo"}}
  https://fdnd.directus.app/items/person/?filter={"name":{"_eq":"oo"}}
  https://fdnd.directus.app/items/person/?filter={"bio":{"_icontains":"frontend"}}
  ?filter[squad_id][_eq]=3 = squad D filter
  ?filter[squad_id][_eq]=4 = squad E filter
  ?filter[squad_id][_eq]=5 = squad F filter
  ?sort=name = az sorteer
  */

  fetchJson(
    "https://fdnd.directus.app/items/person/?filter=" + request.params.q
  ).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render("filter", {
      persons: apiData.data,
      squads: squadData.data,
    });
  });
});

// Maak een POST route voor de index
app.post("/", function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, "/");
});

//! 3. Start de webserver
// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
