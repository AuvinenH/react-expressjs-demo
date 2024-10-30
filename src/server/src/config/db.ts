//tuodaan mongoose-kirjasto MongoDB:n käsittelyä varten
import mongoose from "mongoose";

//tuodaan dotenv-kirjasto ympäristömuuttujien lataamista varten
import dotenv from "dotenv";

//ladataan ympäristömuuttujat .env-tiedostosta
dotenv.config();

//määritellään MongoDB-yhteyden asetukset
const options = {
  autoIndex: false,
  maxPoolSize: 10,
};

//asetetaan MongoDB URI ympäristömuuttujasta
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/WhatToDoDB";

//alustetaan laskuri joka seuraa yhteysyritysten määrää
let retryCount = 0;

//määritellään funktio, joka yrittää muodostaa yhteyden MongoDB:hen ja yrittää uudelleen epäonnistuessa
const connectWithRetry = () => {
  mongoose
    .connect(uri, options) //yritetään muodostaa yhteys MongoDB:hen annetuilla asetuksilla
    .then(() => {
      console.log("MongoDB on yhdistetty");
      retryCount = 0;                       //nollataan yrityslaskuri onnistuneen yhteyden jälkeen
    })
    .catch((err) => {                       //käsitellään yhteysvirheet
      retryCount += 1;                      
      console.log(
        `MongoDB-yhteys epäonnistui, yritetään uudelleen ${2 * retryCount} sekunnin päästä.`,
        err                                  
      );
      //asetetaan viive jonka jälkeen yhteyttä yritetään uudelleen ja viive kasvaa jokaisella yrityksellä
      setTimeout(connectWithRetry, 2000 * retryCount);
    });
};

//tapahtumankuuntelija joka aktivoituu kun MongoDB-yhteys menetetään
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB-yhteys katkaistu. Yritetään uudelleen...");
  connectWithRetry();  //yritetään muodostaa yhteys uudelleen jos se katkeaa
});

//viedään connectWithRetry-funktio
export default connectWithRetry;
