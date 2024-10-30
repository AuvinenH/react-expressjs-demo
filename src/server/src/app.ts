import express from 'express';
import cors from 'cors';
import helloRoute from './routes/taskRoute'; // Reittitiedosto tuodaan käyttöön

const app = express();

// Määritetään CORS-asetukset
app.use(cors({
  origin: 'http://localhost:5173', // Frontendin osoite
  methods: ['GET', 'POST'], // Sallitut HTTP-metodit
}));

// Lisätään reitit
app.use('/api', helloRoute);

// Exportataan app, jotta sitä voidaan käyttää muissa tiedostoissa
export default app;